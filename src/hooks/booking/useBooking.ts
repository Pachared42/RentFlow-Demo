"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CARS } from "@/src/constants/cars";
import {
  BRANCH_POINTS,
  CHAT_CHANNEL_URL,
  CHAT_THRESHOLD_THB,
  OTHER_OPTION,
  merchantBranchesEnabled,
} from "@/src/constants/booking.constants";
import { DEFAULT_ADDONS, type AddonKey } from "@/src/constants/booking.addons";
import { parseDateTime, diffDaysCeil } from "@/src/utils/booking/booking.date";
import { buildChatHref, buildChatMessage } from "@/src/utils/booking/booking.format";
import useBookingPricing from "./useBookingPricing";
import useBookingValidation from "./useBookingValidation";

export default function useBooking() {
  const params = useSearchParams();
  const router = useRouter();

  const carId = params.get("carId") || "";
  const car = React.useMemo(() => CARS.find((c) => c.id === carId), [carId]);

  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const [pickupBranch, setPickupBranch] = React.useState<string>(BRANCH_POINTS[0]);
  const [returnBranch, setReturnBranch] = React.useState<string>(BRANCH_POINTS[0]);
  const [pickupOther, setPickupOther] = React.useState("");
  const [returnOther, setReturnOther] = React.useState("");

  const [pickupFreeText, setPickupFreeText] = React.useState("");
  const [returnFreeText, setReturnFreeText] = React.useState("");

  const [pickupDate, setPickupDate] = React.useState("");
  const [pickupTime, setPickupTime] = React.useState("10:00");
  const [returnDate, setReturnDate] = React.useState("");
  const [returnTime, setReturnTime] = React.useState("10:00");

  const [addons, setAddons] = React.useState<Record<AddonKey, boolean>>(DEFAULT_ADDONS);

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  const fieldSX = React.useMemo(
    () => ({
      "& .MuiOutlinedInput-root": { borderRadius: "14px" },
    }),
    []
  );

  React.useEffect(() => {
    if (pickupDate && !returnDate) setReturnDate(pickupDate);
  }, [pickupDate, returnDate]);

  React.useEffect(() => {
    if (pickupTime && !returnTime) setReturnTime(pickupTime);
  }, [pickupTime, returnTime]);

  const startDT = React.useMemo(
    () => parseDateTime(pickupDate, pickupTime),
    [pickupDate, pickupTime]
  );

  const endDT = React.useMemo(
    () => parseDateTime(returnDate, returnTime),
    [returnDate, returnTime]
  );

  const timeInvalid = React.useMemo(() => {
    if (!startDT || !endDT) return false;
    return endDT.getTime() < startDT.getTime();
  }, [startDT, endDT]);

  const days = React.useMemo(() => {
    if (!startDT || !endDT) return 0;
    if (endDT.getTime() < startDT.getTime()) return 0;
    return diffDaysCeil(startDT, endDT);
  }, [startDT, endDT]);

  const finalPickupPoint = React.useMemo(() => {
    if (!merchantBranchesEnabled) return pickupFreeText.trim();
    if (pickupBranch === OTHER_OPTION) return pickupOther.trim();
    return pickupBranch;
  }, [pickupBranch, pickupOther, pickupFreeText]);

  const finalReturnPoint = React.useMemo(() => {
    if (!merchantBranchesEnabled) return returnFreeText.trim();
    if (returnBranch === OTHER_OPTION) return returnOther.trim();
    return returnBranch;
  }, [returnBranch, returnOther, returnFreeText]);

  const { pricing, addonsTotal, amount } = useBookingPricing({
    car,
    days,
    addons,
  });

  const { locationOk, canSubmit } = useBookingValidation({
    carExists: !!car,
    fullName,
    phone,
    pickupDate,
    returnDate,
    pickupTime,
    returnTime,
    pickupBranch,
    pickupOther,
    returnBranch,
    returnOther,
    pickupFreeText,
    returnFreeText,
    timeInvalid,
  });

  const showChatBooking = amount >= CHAT_THRESHOLD_THB;

  const chatMessage = React.useMemo(() => {
    return buildChatMessage({
      carName: car?.name,
      carId,
      finalPickupPoint,
      pickupDate,
      pickupTime,
      finalReturnPoint,
      returnDate,
      returnTime,
      days,
      addons,
      amount,
      fullName,
      phone,
    });
  }, [
    car?.name,
    carId,
    finalPickupPoint,
    pickupDate,
    pickupTime,
    finalReturnPoint,
    returnDate,
    returnTime,
    days,
    addons,
    amount,
    fullName,
    phone,
  ]);

  const chatHref = React.useMemo(() => {
    return buildChatHref(CHAT_CHANNEL_URL, chatMessage);
  }, [chatMessage]);

  const handleAddonChange = React.useCallback((key: AddonKey, checked: boolean) => {
    setAddons((prev) => ({
      ...prev,
      [key]: checked,
    }));
  }, []);

  const onSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if (!car) {
        setError("ไม่พบรถที่เลือก กรุณากลับไปเลือกใหม่");
        return;
      }

      if (!startDT || !endDT) {
        setError("กรุณาเลือกวันและเวลาให้ครบ");
        return;
      }

      if (endDT.getTime() < startDT.getTime()) {
        setError("วัน/เวลาคืนรถต้องไม่ก่อนวัน/เวลารับรถ");
        return;
      }

      if (!locationOk) {
        setError("กรุณากรอกสถานที่ให้ถูกต้อง (กรณีเลือก “อื่นๆ” ต้องระบุสถานที่)");
        return;
      }

      if (!canSubmit) return;

      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setLoading(false);

      const mockBookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;

      router.push(
        `/payment?bookingId=${encodeURIComponent(mockBookingId)}` +
          `&amount=${encodeURIComponent(String(amount))}` +
          `&carId=${encodeURIComponent(car.id)}` +
          `&days=${encodeURIComponent(String(days))}` +
          `&pickupDate=${encodeURIComponent(pickupDate)}` +
          `&returnDate=${encodeURIComponent(returnDate)}` +
          `&pickupTime=${encodeURIComponent(pickupTime)}` +
          `&returnTime=${encodeURIComponent(returnTime)}` +
          `&pickupPoint=${encodeURIComponent(finalPickupPoint)}` +
          `&returnPoint=${encodeURIComponent(finalReturnPoint)}` +
          `&addons=${encodeURIComponent(
            JSON.stringify(
              Object.entries(addons)
                .filter(([, v]) => v)
                .map(([k]) => k)
            )
          )}`
      );
    },
    [
      car,
      startDT,
      endDT,
      locationOk,
      canSubmit,
      amount,
      days,
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      finalPickupPoint,
      finalReturnPoint,
      addons,
      router,
    ]
  );

  React.useEffect(() => {
    const start = Date.now();

    const timer = setTimeout(() => {
      const elapsed = Date.now() - start;
      const delay = Math.max(2000 - elapsed, 0);

      setTimeout(() => {
        setReady(true);
      }, delay);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return {
    merchantBranchesEnabled,
    carId,
    car,
    fullName,
    setFullName,
    phone,
    setPhone,
    pickupBranch,
    setPickupBranch,
    returnBranch,
    setReturnBranch,
    pickupOther,
    setPickupOther,
    returnOther,
    setReturnOther,
    pickupFreeText,
    setPickupFreeText,
    returnFreeText,
    setReturnFreeText,
    pickupDate,
    setPickupDate,
    pickupTime,
    setPickupTime,
    returnDate,
    setReturnDate,
    returnTime,
    setReturnTime,
    addons,
    setAddons,
    handleAddonChange,
    error,
    setError,
    loading,
    ready,
    fieldSX,
    startDT,
    endDT,
    timeInvalid,
    days,
    pricing,
    addonsTotal,
    amount,
    finalPickupPoint,
    finalReturnPoint,
    locationOk,
    canSubmit,
    showChatBooking,
    chatHref,
    onSubmit,
  };
}