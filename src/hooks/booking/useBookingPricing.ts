"use client";

import * as React from "react";
import type { Car } from "@/src/constants/cars";
import type { AddonKey } from "@/src/constants/booking.addons";
import { calcAddonsTotal, calcDiscountedAmount } from "@/src/utils/booking/booking.pricing";

type Params = {
  car?: Car;
  days: number;
  addons: Record<AddonKey, boolean>;
};

export default function useBookingPricing({ car, days, addons }: Params) {
  const pricing = React.useMemo(() => {
    if (!car || days <= 0) return null;
    return calcDiscountedAmount(car.pricePerDay, days);
  }, [car, days]);

  const addonsTotal = React.useMemo(() => {
    return calcAddonsTotal(addons, days);
  }, [addons, days]);

  const baseTotal = pricing?.total ?? 0;
  const amount = baseTotal + addonsTotal;

  return {
    pricing,
    addonsTotal,
    baseTotal,
    amount,
  };
}