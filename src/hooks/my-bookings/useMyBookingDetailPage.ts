"use client";

import * as React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import usePageReady from "@/src/hooks/usePageReady";
import { getErrorStatus } from "@/src/lib/api-error";
import { bookingApi } from "@/src/services/booking/booking.service";
import { getCarById } from "@/src/services/cars/cars.service";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "paid"
  | "completed"
  | "cancelled";

export type Booking = {
  id: string;
  bookingRef: string;
  carId: string;
  carName: string;
  pickupDate: string;
  returnDate: string;
  totalPrice: number;
  status: BookingStatus;
  pickupLocation?: string;
  returnLocation?: string;
  customerName?: string;
  phone?: string;
  notes?: string;
  subtotal: number;
  extraCharge: number;
  discount: number;
};

export default function useMyBookingDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const ready = usePageReady();

  const id = typeof params?.id === "string" ? params.id : "";
  const tenantSlug = searchParams.get("tenant") || undefined;
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [openCancel, setOpenCancel] = React.useState(false);
  const [local, setLocal] = React.useState<Booking | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function loadBooking() {
      if (!id) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        const bookingRes = await bookingApi.getBookingById(id, { tenantSlug });
        const booking = bookingRes.data;
        const car = await getCarById(booking.carId, { tenantSlug });

        if (cancelled) return;

        setLocal({
          id: booking.bookingCode,
          bookingRef: booking.id,
          carId: booking.carId,
          carName: car?.name || booking.carId,
          pickupDate: booking.pickupDate,
          returnDate: booking.returnDate,
          totalPrice: booking.totalAmount,
          status: booking.status,
          pickupLocation: booking.pickupLocation,
          returnLocation: booking.returnLocation,
          customerName: booking.customerName,
          phone: booking.customerPhone,
          notes: booking.note,
          subtotal: booking.subtotal,
          extraCharge: booking.extraCharge,
          discount: booking.discount,
        });
        setIsAuthenticated(true);
      } catch (err: unknown) {
        if (cancelled) return;

        if (getErrorStatus(err) === 401) {
          router.replace(
            `/login?redirect=${encodeURIComponent(
              tenantSlug
                ? `/my-bookings/${id}?tenant=${tenantSlug}`
                : `/my-bookings/${id}`
            )}`
          );
          return;
        }

        setLocal(null);
        setIsAuthenticated(true);
      } finally {
        if (!cancelled) {
          setIsCheckingAuth(false);
        }
      }
    }

    loadBooking();

    return () => {
      cancelled = true;
    };
  }, [id, router, tenantSlug]);

  const canCancel =
    local?.status === "pending" ||
    local?.status === "confirmed" ||
    local?.status === "paid";

  const pricing = React.useMemo(
    () => ({
      subtotal: local?.subtotal ?? 0,
      extraCharge: local?.extraCharge ?? 0,
      discount: local?.discount ?? 0,
      total: local?.totalPrice ?? 0,
    }),
    [local?.discount, local?.extraCharge, local?.subtotal, local?.totalPrice]
  );

  const doCancel = React.useCallback(async () => {
    if (!local) return;

    try {
      const res = await bookingApi.cancelBooking(local.bookingRef, {
        tenantSlug,
      });
      setLocal((prev) =>
        prev
          ? {
              ...prev,
              status: res.data.status,
            }
          : prev
      );
      setOpenCancel(false);
    } catch {
      setOpenCancel(false);
    }
  }, [local, tenantSlug]);

  return {
    ready,
    isCheckingAuth,
    isAuthenticated,
    id,
    local,
    openCancel,
    setOpenCancel,
    canCancel,
    pricing,
    doCancel,
    router,
  };
}
