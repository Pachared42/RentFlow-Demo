"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import usePageReady from "@/src/hooks/usePageReady";
import { getErrorMessage } from "@/src/lib/api-error";
import { navigateBookingFlow } from "@/src/lib/booking-flow-navigation";
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

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }
      reject(new Error("ไม่สามารถอ่านไฟล์สลิปได้"));
    };
    reader.onerror = () => reject(new Error("ไม่สามารถอ่านไฟล์สลิปได้"));
    reader.readAsDataURL(file);
  });
}

export default function usePaymentPage() {
  const params = useSearchParams();
  const router = useRouter();
  const ready = usePageReady({ disableDuringFlowTransition: true });

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
  const carName = params.get("carName") || "";
  const shopName = params.get("shopName") || "";
  const customerName = params.get("customerName") || "";
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
  const [phone, setPhone] = React.useState(customerPhone);
  const [cardDetails, setCardDetails] = React.useState({
    cardNumber: "",
    cardHolder: "",
    cardExpiry: "",
    cardCvv: "",
  });
  const [slipFile, setSlipFile] = React.useState<File | null>(null);
  const [done, setDone] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const needSlip = method === "transfer";
  const cardDigits = React.useMemo(
    () => cardDetails.cardNumber.replace(/\D/g, ""),
    [cardDetails.cardNumber]
  );
  const cardReady =
    method !== "card" ||
    (cardDigits.length >= 12 &&
      cardDetails.cardHolder.trim().length >= 2 &&
      cardDetails.cardExpiry.trim().length >= 4 &&
      cardDetails.cardCvv.replace(/\D/g, "").length >= 3);

  const canPay =
    fullName.trim().length >= 2 &&
    phone.trim().length >= 9 &&
    cardReady &&
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
      const slipImage =
        method === "transfer" && slipFile ? await readFileAsDataUrl(slipFile) : undefined;
      await paymentsApi.createPayment({
        bookingId: bookingRef || bookingId,
        method: method === "transfer" ? "bank_transfer" : method,
        ...(slipImage ? { slipImage } : {}),
        ...(method === "card"
          ? {
              cardHolder: cardDetails.cardHolder.trim(),
              cardNumber: cardDetails.cardNumber,
              cardExpiry: cardDetails.cardExpiry.trim(),
            }
          : {}),
      }, {
        tenantSlug,
      });
      setDone(true);
      setTimeout(() => {
        const nextParams = new URLSearchParams();

        nextParams.set("bookingId", bookingRef || bookingId);
        nextParams.set("amount", String(amount || 0));
        nextParams.set("carName", car?.name || carName);
        nextParams.set("customerName", fullName.trim());
        nextParams.set("customerPhone", phone.trim());
        nextParams.set("pickupDate", pickupTime ? `${pickupDate} ${pickupTime}` : pickupDate);
        nextParams.set("returnDate", returnTime ? `${returnDate} ${returnTime}` : returnDate);
        nextParams.set("pickupPoint", pickupPoint);
        nextParams.set("returnPoint", returnPoint);

        if (shopName || car?.shopName) {
          nextParams.set("shopName", shopName || car?.shopName || "");
        }

        if (tenantSlug) {
          nextParams.set("tenant", tenantSlug);
        }

        navigateBookingFlow(
          router,
          `/booking/success?${nextParams.toString()}`,
          "replace"
        );
      }, 260);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "ไม่สามารถยืนยันการชำระเงินได้"));
    } finally {
      setLoading(false);
    }
  }, [
    amount,
    bookingId,
    bookingRef,
    canPay,
    car?.name,
    car?.shopName,
    carName,
    cardDetails.cardExpiry,
    cardDetails.cardHolder,
    cardDetails.cardNumber,
    fullName,
    method,
    phone,
    pickupDate,
    pickupPoint,
    pickupTime,
    returnDate,
    returnPoint,
    returnTime,
    router,
    shopName,
    slipFile,
    tenantSlug,
  ]);

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
    carName,
    shopName,
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
    phone,
    setPhone,
    cardDetails,
    setCardDetails,
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
