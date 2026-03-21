export const merchantBranchesEnabled = true;

/**
 * ยอดรวมเกินเท่านี้ ให้แนะนำจองผ่านแชท
 */
export const CHAT_THRESHOLD_THB = 10000;

/**
 * เปลี่ยนเป็นลิงก์จริงของ LINE OA / FB / WhatsApp
 */
export const CHAT_CHANNEL_URL = "https://line.me/R/oaMessage/@yourlineoa";

export type BranchPoint =
  | "สาขาสุพรรณบุรี (ในเมือง)"
  | "สาขากรุงเทพฯ (รัชดา)"
  | "สนามบินดอนเมือง (DMK)"
  | "สนามบินสุวรรณภูมิ (BKK)";

export const BRANCH_POINTS: BranchPoint[] = [
  "สาขาสุพรรณบุรี (ในเมือง)",
  "สาขากรุงเทพฯ (รัชดา)",
  "สนามบินดอนเมือง (DMK)",
  "สนามบินสุวรรณภูมิ (BKK)",
];

export const OTHER_OPTION = "__other__" as const;

export type DiscountTier = {
  minDays: number;
  percent: number;
};

export const DISCOUNT_TIERS: DiscountTier[] = [
  { minDays: 1, percent: 0 },
  { minDays: 3, percent: 5 },
  { minDays: 7, percent: 10 },
  { minDays: 14, percent: 15 },
  { minDays: 30, percent: 20 },
];