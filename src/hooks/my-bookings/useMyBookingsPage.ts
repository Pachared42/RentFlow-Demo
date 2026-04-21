"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import usePageReady from "@/src/hooks/usePageReady";
import { getErrorStatus } from "@/src/lib/api-error";
import { bookingApi } from "@/src/services/booking/booking.service";
import { getCars } from "@/src/services/cars/cars.service";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "paid"
  | "completed"
  | "cancelled";

export type Booking = {
  id: string;
  carId: string;
  carName: string;
  shopName?: string;
  tenantSlug?: string;
  pickupDate: string;
  returnDate: string;
  totalPrice: number;
  status: BookingStatus;
};

export default function useMyBookingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ready = usePageReady();
  const tenantSlug = searchParams.get("tenant") || undefined;

  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState<BookingStatus | "all">("all");
  const [rows, setRows] = React.useState<Booking[]>([]);

  React.useEffect(() => {
    let cancelled = false;

    async function loadBookings() {
      try {
        const [bookingsRes, carsRes] = await Promise.all([
          bookingApi.getMyBookings({ tenantSlug }),
          getCars(undefined, { tenantSlug }),
        ]);

        if (cancelled) return;

        const carMap = new Map(carsRes.items.map((car) => [car.id, car]));

        setRows(
          bookingsRes.data.map((booking) => ({
            id: booking.bookingCode,
            carId: booking.carId,
            carName: carMap.get(booking.carId)?.name || booking.carId,
            shopName: carMap.get(booking.carId)?.shopName || booking.shopName,
            tenantSlug:
              carMap.get(booking.carId)?.domainSlug ||
              booking.domainSlug ||
              tenantSlug,
            pickupDate: booking.pickupDate,
            returnDate: booking.returnDate,
            totalPrice: booking.totalAmount,
            status: booking.status,
          }))
        );
        setIsAuthenticated(true);
      } catch (err: unknown) {
        if (cancelled) return;

        if (getErrorStatus(err) === 401) {
          router.replace(
            `/login?redirect=${encodeURIComponent(
              tenantSlug ? `/my-bookings?tenant=${tenantSlug}` : "/my-bookings"
            )}`
          );
          return;
        }

        setRows([]);
        setIsAuthenticated(true);
      } finally {
        if (!cancelled) {
          setIsCheckingAuth(false);
        }
      }
    }

    loadBookings();

    return () => {
      cancelled = true;
    };
  }, [router, tenantSlug]);

  const data = React.useMemo(() => {
    return rows.filter((b) => {
      const s = q.trim().toLowerCase();

      const matchQ =
        !s ||
        b.id.toLowerCase().includes(s) ||
        b.carName.toLowerCase().includes(s);

      const matchS = status === "all" ? true : b.status === status;

      return matchQ && matchS;
    });
  }, [q, rows, status]);

  const handleReset = React.useCallback(() => {
    setQ("");
    setStatus("all");
  }, []);

  return {
    ready,
    isCheckingAuth,
    isAuthenticated,
    q,
    setQ,
    status,
    setStatus,
    data,
    handleReset,
  };
}
