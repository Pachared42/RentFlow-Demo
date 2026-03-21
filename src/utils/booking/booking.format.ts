import type { AddonKey } from "@/src/constants/booking.addons";
import { getSelectedAddonTitles } from "./booking.pricing";
import { formatTHB } from "@/src/constants/money";

type BuildChatMessageParams = {
  carName?: string;
  carId: string;
  finalPickupPoint: string;
  pickupDate: string;
  pickupTime: string;
  finalReturnPoint: string;
  returnDate: string;
  returnTime: string;
  days: number;
  addons: Record<AddonKey, boolean>;
  amount: number;
  fullName: string;
  phone: string;
};

export function buildChatMessage(params: BuildChatMessageParams) {
  const addonTitles = getSelectedAddonTitles(params.addons);
  const addonsText = addonTitles.length ? addonTitles.join(", ") : "-";

  return [
    "สวัสดีครับ ต้องการจองรถ (จองผ่านแชท)",
    `รถ: ${params.carName || "-"} (${params.carId || "-"})`,
    `รับรถ: ${params.finalPickupPoint || "-"} ${params.pickupDate || "-"} ${
      params.pickupTime || ""
    }`.trim(),
    `คืนรถ: ${params.finalReturnPoint || "-"} ${params.returnDate || "-"} ${
      params.returnTime || ""
    }`.trim(),
    `จำนวนวัน: ${params.days || 0} วัน`,
    `บริการเสริม: ${addonsText}`,
    `ยอดรวมประมาณ: ${formatTHB(params.amount)}`,
    `ชื่อผู้จอง: ${params.fullName || "-"}`,
    `เบอร์: ${params.phone || "-"}`,
  ].join("\n");
}

export function buildChatHref(baseUrl: string, message: string) {
  const encoded = encodeURIComponent(message);
  if (baseUrl.includes("?")) return `${baseUrl}${encoded}`;
  return `${baseUrl}?${encoded}`;
}