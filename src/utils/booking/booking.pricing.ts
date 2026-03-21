import type { AddonKey } from "@/src/constants/booking.addons";
import { ADDONS } from "@/src/constants/booking.addons";
import { DISCOUNT_TIERS } from "@/src/constants/booking.constants";

export function getDiscountPercent(days: number) {
  if (days <= 0) return 0;

  let pct = 0;
  for (const tier of DISCOUNT_TIERS) {
    if (days >= tier.minDays) pct = tier.percent;
  }
  return pct;
}

export function calcDiscountedAmount(pricePerDay: number, days: number) {
  const discountPct = getDiscountPercent(days);
  const subTotal = pricePerDay * days;
  const discount = Math.round((subTotal * discountPct) / 100);
  const total = Math.max(0, subTotal - discount);

  return {
    discountPct,
    subTotal,
    discount,
    total,
  };
}

export function calcAddonsTotal(
  selected: Record<AddonKey, boolean>,
  days: number
) {
  let total = 0;

  for (const addon of ADDONS) {
    if (!selected[addon.key]) continue;
    total += addon.pricing === "perDay" ? addon.price * Math.max(1, days) : addon.price;
  }

  return total;
}

export function getSelectedAddonTitles(selected: Record<AddonKey, boolean>) {
  return ADDONS.filter((addon) => selected[addon.key]).map((addon) => addon.title);
}