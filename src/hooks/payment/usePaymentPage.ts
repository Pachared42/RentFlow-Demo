"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import usePageReady from "@/src/hooks/usePageReady";
import { getErrorMessage } from "@/src/lib/api-error";
import { getCarById } from "@/src/services/cars/cars.service";
import type { Car } from "@/src/services/cars/cars.types";
import { paymentsApi } from "@/src/services/payments/payments.service";
import { usersApi } from "@/src/services/users/users.service";
import {
  type Method,
  safeParseAddons,
  calcAddonsTotal,
  getCarSubTotal,
} from "@/src/utils/payment/payment.helpers";

export default function usePaymentPage() {
  const params = useSearchParams();
  const router = useRouter();
  const ready = usePageReady();

  const bookingId = params.get("bookingId") || "BK-XXXX";
  const bookingRef = params.get("bookingRef") || "";
  const carId = params.get("carId") || "";
  const tenantSlug = params.get("tenant") || undefined;
  const days = Number(params.get("days") || "0") || 0;

  const pickupDate = params.get("pickupDate") || "";
  const returnDate = params.get("returnDate") || "";
  const pickupPoint = params.get("pickupPoint") || "";
  const returnPoint = params.get("returnPoint") || "";
  const pickupTime = params.get("pickupTime") || "";
  const returnTime = params.get("returnTime") || "";
  const customerName = params.get("customerName") || "";
  const customerEmail = params.get("customerEmail") || "";
  const customerPhone = params.get("customerPhone") || "";
  const subtotal = Number(params.get("subtotal") || "0") || 0;
  const discount = Number(params.get("discount") || "0") || 0;
  const extraCharge = Number(params.get("extraCharge") || "0") || 0;
  const amount = Number(params.get("amount") || "0") || 0;

  const addonsRaw = params.get("addons");

  const addonKeys = React.useMemo(
    () => safeParseAddons(addonsRaw),
    [addonsRaw]
  );
  const addonsTotal = React.useMemo(
    () => calcAddonsTotal(addonKeys, days),
    [addonKeys, days]
  );

  const [car, setCar] = React.useState<Car | undefined>(undefined);

  const carSubTotal = React.useMemo(
    () => subtotal || getCarSubTotal(car, days),
    [car, days, subtotal]
  );

  const carNet = React.useMemo(
    () => Math.max(0, carSubTotal - discount),
    [carSubTotal, discount]
  );

  const carDiscount = React.useMemo(() => {
    if (carSubTotal <= 0) return 0;
    return discount;
  }, [carSubTotal, discount]);

  const discountPct = React.useMemo(() => {
    if (carSubTotal <= 0) return 0;
    return Math.round((carDiscount / carSubTotal) * 100);
  }, [carSubTotal, carDiscount]);

  const [method, setMethod] = React.useState<Method>("promptpay");
  const [fullName, setFullName] = React.useState(customerName);
  const [email, setEmail] = React.useState(customerEmail);
  const [phone, setPhone] = React.useState(customerPhone);
  const [slipFile, setSlipFile] = React.useState<File | null>(null);
  const [done, setDone] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const needSlip = method === "transfer";

  const canPay =
    fullName.trim().length >= 2 &&
    email.trim().includes("@") &&
    phone.trim().length >= 9 &&
    (!needSlip || !!slipFile) &&
    !loading;

  React.useEffect(() => {
    let cancelled = false;

    async function loadData() {
      const tasks = await Promise.allSettled([
        carId ? getCarById(carId, { tenantSlug }) : Promise.resolve(null),
        usersApi.getMe(),
      ]);

      if (cancelled) return;

      const [carResult, profileResult] = tasks;

      if (carResult.status === "fulfilled" && carResult.value) {
        setCar(carResult.value);
      }

      if (profileResult.status === "fulfilled") {
        const user = profileResult.value.data;
        setFullName((prev) => prev || user.name || "");
        setEmail((prev) => prev || user.email || "");
        setPhone((prev) => prev || user.phone || "");
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [carId, tenantSlug]);

  const handleConfirm = React.useCallback(async () => {
    if (!canPay) return;

    setLoading(true);
    setError(null);
    try {
      await paymentsApi.createPayment({
        bookingId: bookingRef || bookingId,
        method: method === "transfer" ? "bank_transfer" : method,
      }, {
        tenantSlug,
      });
      setDone(true);
      setTimeout(() => {
        router.push(
          tenantSlug
            ? `/my-bookings?tenant=${encodeURIComponent(tenantSlug)}`
            : "/my-bookings"
        );
      }, 800);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "ไม่สามารถยืนยันการชำระเงินได้"));
    } finally {
      setLoading(false);
    }
  }, [bookingId, bookingRef, canPay, method, router, tenantSlug]);

  const roundedFieldSX = React.useMemo(
    () => ({
      "& .MuiOutlinedInput-root": { borderRadius: "12px" },
    }),
    []
  );

  return {
    ready,
    bookingId,
    bookingRef,
    carId,
    tenantSlug,
    days,
    pickupDate,
    returnDate,
    pickupPoint,
    returnPoint,
    pickupTime,
    returnTime,
    amount,
    addonKeys,
    addonsTotal,
    car,
    carSubTotal,
    carNet,
    carDiscount,
    discountPct,
    extraCharge,
    method,
    setMethod,
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    slipFile,
    setSlipFile,
    done,
    loading,
    error,
    canPay,
    handleConfirm,
    roundedFieldSX,
  };
}
