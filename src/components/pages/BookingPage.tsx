"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Alert,
  Chip,
  Divider,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { CARS, type Car } from "@/src/constants/cars";
import { formatTHB } from "@/src/constants/money";

/* -------------------- Merchant Settings (mock) -------------------- */
/**
 * ✅ สำคัญ: ตัวนี้ "ควรดึงจากหลังบ้าน" (Merchant Settings)
 * - false = SME (ไม่มีสาขา) => ให้ลูกค้าพิมพ์สถานที่เอง (optional)
 * - true  = Enterprise (มีสาขา) => เลือกจาก dropdown + มี "อื่นๆ"
 */
const merchantBranchesEnabled = true;

/* -------------------- Chat Booking Settings -------------------- */
const CHAT_THRESHOLD_THB = 10000; // ✅ ยอดเกินเท่านี้ให้แนะนำ "จองผ่านแชท"
const CHAT_CHANNEL_URL = "https://line.me/R/oaMessage/@yourlineoa"; // ✅ เปลี่ยนเป็นของจริง (LINE OA / FB / WhatsApp)

/* -------------------- Location -------------------- */
type BranchPoint =
  | "สาขาสุพรรณบุรี (ในเมือง)"
  | "สาขากรุงเทพฯ (รัชดา)"
  | "สนามบินดอนเมือง (DMK)"
  | "สนามบินสุวรรณภูมิ (BKK)";

const BRANCH_POINTS: BranchPoint[] = [
  "สาขาสุพรรณบุรี (ในเมือง)",
  "สาขากรุงเทพฯ (รัชดา)",
  "สนามบินดอนเมือง (DMK)",
  "สนามบินสุวรรณภูมิ (BKK)",
];

const OTHER_OPTION = "__other__" as const;

function badgeStyle(b: NonNullable<Car["badge"]>) {
  if (b === "Popular") return "!bg-amber-50 !text-amber-700 !border-amber-200";
  if (b === "New") return "!bg-emerald-50 !text-emerald-700 !border-emerald-200";
  return "!bg-slate-50 !text-slate-700 !border-slate-200";
}

/* -------------------- Date utils -------------------- */
function parseDateTime(date: string, time: string) {
  if (!date || !time) return null;
  const dt = new Date(`${date}T${time}:00`);
  return Number.isFinite(dt.getTime()) ? dt : null;
}

function diffDaysCeil(start: Date, end: Date) {
  const ms = end.getTime() - start.getTime();
  if (ms <= 0) return 0;
  const days = Math.ceil(ms / 86400000);
  return Math.max(1, days);
}

/* -------------------- Discount -------------------- */
type DiscountTier = { minDays: number; percent: number };

const DISCOUNT_TIERS: DiscountTier[] = [
  { minDays: 1, percent: 0 },
  { minDays: 3, percent: 5 },
  { minDays: 7, percent: 10 },
  { minDays: 14, percent: 15 },
  { minDays: 30, percent: 20 },
];

function getDiscountPercent(days: number) {
  if (days <= 0) return 0;
  let pct = 0;
  for (const t of DISCOUNT_TIERS) {
    if (days >= t.minDays) pct = t.percent;
  }
  return pct;
}

function calcDiscountedAmount(pricePerDay: number, days: number) {
  const discountPct = getDiscountPercent(days);
  const subTotal = pricePerDay * days;
  const discount = Math.round((subTotal * discountPct) / 100);
  const total = Math.max(0, subTotal - discount);
  return { discountPct, subTotal, discount, total };
}

/* -------------------- Add-ons -------------------- */
type AddonKey = "carSeat" | "mountainDrive" | "returnOtherBranch";

type Addon = {
  key: AddonKey;
  title: string;
  desc: string;
  pricing: "perDay" | "perTrip";
  price: number;
};

const ADDONS: Addon[] = [
  {
    key: "carSeat",
    title: "เพิ่มคาร์ซีท",
    desc: "สำหรับเด็กเล็ก/เด็กโต (ขึ้นกับสต็อก)",
    pricing: "perDay",
    price: 150,
  },
  {
    key: "mountainDrive",
    title: "อนุญาตขับขึ้นเขา/ขึ้นดอย",
    desc: "คุ้มครองเงื่อนไขเส้นทางพิเศษ",
    pricing: "perTrip",
    price: 300,
  },
  {
    key: "returnOtherBranch",
    title: "คืนรถต่างสาขา",
    desc: "เลือกสาขาคืนรถคนละสาขารับรถ",
    pricing: "perTrip",
    price: 500,
  },
];

function calcAddonsTotal(selected: Record<AddonKey, boolean>, days: number) {
  let total = 0;
  for (const a of ADDONS) {
    if (!selected[a.key]) continue;
    total += a.pricing === "perDay" ? a.price * Math.max(1, days) : a.price;
  }
  return total;
}

function getSelectedAddonTitles(selected: Record<AddonKey, boolean>) {
  return ADDONS.filter((a) => selected[a.key]).map((a) => a.title);
}

/* -------------------- Page -------------------- */
export default function BookingPage() {
  const params = useSearchParams();
  const router = useRouter();

  const carId = params.get("carId") || "";
  const car = React.useMemo(() => CARS.find((c) => c.id === carId), [carId]);

  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  // ===== Location state (Hybrid) =====
  // Enterprise: branch dropdown + other text
  const [pickupBranch, setPickupBranch] = React.useState<string>(BRANCH_POINTS[0]);
  const [returnBranch, setReturnBranch] = React.useState<string>(BRANCH_POINTS[0]);
  const [pickupOther, setPickupOther] = React.useState("");
  const [returnOther, setReturnOther] = React.useState("");

  // SME: free text optional
  const [pickupFreeText, setPickupFreeText] = React.useState("");
  const [returnFreeText, setReturnFreeText] = React.useState("");

  const [pickupDate, setPickupDate] = React.useState("");
  const [pickupTime, setPickupTime] = React.useState("10:00");

  const [returnDate, setReturnDate] = React.useState("");
  const [returnTime, setReturnTime] = React.useState("10:00");

  const [addons, setAddons] = React.useState<Record<AddonKey, boolean>>({
    carSeat: false,
    mountainDrive: false,
    returnOtherBranch: false,
  });

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fieldSX = React.useMemo(
    () => ({
      "& .MuiOutlinedInput-root": { borderRadius: "14px" },
    }),
    []
  );

  React.useEffect(() => {
    if (pickupDate && !returnDate) setReturnDate(pickupDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickupDate]);

  React.useEffect(() => {
    if (pickupTime && !returnTime) setReturnTime(pickupTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickupTime]);

  const startDT = React.useMemo(() => parseDateTime(pickupDate, pickupTime), [pickupDate, pickupTime]);
  const endDT = React.useMemo(() => parseDateTime(returnDate, returnTime), [returnDate, returnTime]);

  const timeInvalid = React.useMemo(() => {
    if (!startDT || !endDT) return false;
    return endDT.getTime() < startDT.getTime();
  }, [startDT, endDT]);

  const days = React.useMemo(() => {
    if (!startDT || !endDT) return 0;
    if (endDT.getTime() < startDT.getTime()) return 0;
    return diffDaysCeil(startDT, endDT);
  }, [startDT, endDT]);

  const pricing = React.useMemo(() => {
    if (!car || days <= 0) return null;
    return calcDiscountedAmount(car.pricePerDay, days);
  }, [car, days]);

  const addonsTotal = React.useMemo(() => calcAddonsTotal(addons, days), [addons, days]);

  // ✅ เลือก “ข้อความสถานที่จริง” ตามโหมด
  const finalPickupPoint = React.useMemo(() => {
    if (!merchantBranchesEnabled) return pickupFreeText.trim(); // SME (optional)
    if (pickupBranch === OTHER_OPTION) return pickupOther.trim();
    return pickupBranch;
  }, [pickupBranch, pickupOther, pickupFreeText]);

  const finalReturnPoint = React.useMemo(() => {
    if (!merchantBranchesEnabled) return returnFreeText.trim(); // SME (optional)
    if (returnBranch === OTHER_OPTION) return returnOther.trim();
    return returnBranch;
  }, [returnBranch, returnOther, returnFreeText]);

  // ✅ Validation: Enterprise ถ้าเลือก “อื่นๆ” ต้องกรอก
  const locationOk = React.useMemo(() => {
    if (!merchantBranchesEnabled) {
      // SME: optional ทั้งคู่ (แต่ถ้ากรอกแล้วต้อง >= 2 ตัวอักษร)
      const pOk = !pickupFreeText.trim() || pickupFreeText.trim().length >= 2;
      const rOk = !returnFreeText.trim() || returnFreeText.trim().length >= 2;
      return pOk && rOk;
    }
    const pOk = pickupBranch !== OTHER_OPTION || pickupOther.trim().length >= 2;
    const rOk = returnBranch !== OTHER_OPTION || returnOther.trim().length >= 2;
    return pOk && rOk;
  }, [pickupBranch, pickupOther, returnBranch, returnOther, pickupFreeText, returnFreeText]);

  const baseTotal = pricing?.total ?? 0;    // ยอดรถหลังส่วนลด
  const amount = baseTotal + addonsTotal;   // ✅ ยอดรวม (รวมบริการเสริม)

  // ✅ เงื่อนไข “ยอดเยอะ” → โชว์ปุ่มจองผ่านแชท
  const showChatBooking = amount >= CHAT_THRESHOLD_THB;

  const canSubmit =
    !!car &&
    fullName.trim().length >= 2 &&
    phone.trim().length >= 9 &&
    !!pickupDate &&
    !!returnDate &&
    !!pickupTime &&
    !!returnTime &&
    !timeInvalid &&
    locationOk;

  const buildChatMessage = React.useCallback(() => {
    const carName = car?.name || "-";
    const addonTitles = getSelectedAddonTitles(addons);
    const addonsText = addonTitles.length ? addonTitles.join(", ") : "-";

    return [
      "สวัสดีครับ ต้องการจองรถ (จองผ่านแชท)",
      `รถ: ${carName} (${carId || "-"})`,
      `รับรถ: ${finalPickupPoint || "-"} ${pickupDate || "-"} ${pickupTime || ""}`.trim(),
      `คืนรถ: ${finalReturnPoint || "-"} ${returnDate || "-"} ${returnTime || ""}`.trim(),
      `จำนวนวัน: ${days || 0} วัน`,
      `บริการเสริม: ${addonsText}`,
      `ยอดรวมประมาณ: ${formatTHB(amount)}`,
      `ชื่อผู้จอง: ${fullName || "-"}`,
      `เบอร์: ${phone || "-"}`,
    ].join("\n");
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
    const msg = buildChatMessage();
    // LINE OA: https://line.me/R/oaMessage/@xxxx/?<message>
    // บาง OA ต้องเป็น /oaMessage/@xxxx/?text=<...> (แล้วแต่รูปแบบ) → ถ้าไม่ขึ้น ให้เปลี่ยนรูปแบบ URL ตามของคุณ
    const encoded = encodeURIComponent(msg);
    if (CHAT_CHANNEL_URL.includes("?")) return `${CHAT_CHANNEL_URL}${encoded}`;
    return `${CHAT_CHANNEL_URL}?${encoded}`;
  }, [buildChatMessage]);

  const onSubmit = async (e: React.FormEvent) => {
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
    await new Promise((r) => setTimeout(r, 600));
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
        JSON.stringify(Object.entries(addons).filter(([, v]) => v).map(([k]) => k))
      )}`
    );
  };

  return (
    <Container maxWidth="lg" className="py-12">
      <Box className="flex flex-col gap-2">
        <Typography variant="h5" className="text-2xl font-bold text-slate-900">
          จองรถ
        </Typography>
        <Typography className="text-sm text-slate-600">
          เลือกจุดรับ-คืนรถ + วันเวลา แล้วไปชำระเงิน
        </Typography>

        <Typography className="text-xs text-slate-500">
          โหมดจุดรับ-คืนรถ:{" "}
          <span className="font-semibold text-slate-900">
            {merchantBranchesEnabled ? "มีสาขา (Enterprise)" : "ไม่มีสาขา (SME)"}
          </span>
        </Typography>
      </Box>

      <Box className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Summary */}
        <Card
          elevation={0}
          sx={{ boxShadow: "none" }}
          className="lg:col-span-5 rounded-2xl! border border-slate-200 bg-white"
        >
          <CardContent className="p-4!">
            <Typography className="text-sm font-semibold text-slate-900">
              สรุปการจอง
            </Typography>
            <Typography className="mt-1 text-xs text-slate-500">
              ตรวจสอบรถ จุดรับ-คืน และยอดรวมก่อนชำระเงิน
            </Typography>

            <Divider className="my-5! border-slate-200!" />

            {!car ? (
              <Box className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <Typography className="text-sm text-slate-700">
                  ไม่พบข้อมูลรถ (รหัสรถ:{" "}
                  <span className="font-semibold">{carId || "-"}</span>)
                </Typography>
                <Typography className="mt-2 text-xs text-slate-500">
                  กรุณากลับไปเลือกจากหน้า “รถทั้งหมด”
                </Typography>

                <Link href="/cars" className="mt-4 inline-block">
                  <Button variant="outlined" className="rounded-xl!" sx={{ textTransform: "none" }}>
                    กลับไปเลือกรถ
                  </Button>
                </Link>
              </Box>
            ) : (
              <Box className="rounded-xl! border border-slate-200 bg-white p-4!">
                <Box className="relative aspect-4/3 overflow-hidden rounded-xl bg-slate-50">
                  <Image src={car.image || "/cars/placeholder.jpg"} alt={car.name} fill className="object-cover" />
                </Box>

                <Box className="mt-3 flex items-start justify-between gap-3">
                  <Box className="min-w-0">
                    <Typography className="truncate text-base font-semibold text-slate-900">
                      {car.name}
                    </Typography>
                    <Typography className="mt-1 text-xs text-slate-600">
                      {car.type} • {car.seats} ที่นั่ง • {car.transmission} • {car.fuel}
                    </Typography>
                  </Box>

                  {car.badge ? (
                    <Chip size="small" label={car.badge} variant="outlined" className={`border! ${badgeStyle(car.badge)}`} />
                  ) : null}
                </Box>

                <Box className="mb-6! space-y-2 text-sm">
                  <Box className="flex items-center justify-between">
                    <Typography className="text-slate-600">ราคา/วัน</Typography>
                    <Typography className="font-semibold text-slate-900">
                      {formatTHB(car.pricePerDay)} / วัน
                    </Typography>
                  </Box>

                  <Box className="flex items-start justify-between gap-3">
                    <Typography className="text-slate-600">รับรถ</Typography>
                    <Box className="text-right">
                      <Typography component="div" className="font-semibold text-slate-900">
                        {finalPickupPoint || "-"}
                      </Typography>
                      <Typography component="div" className="text-xs font-normal text-slate-500">
                        {pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : "-"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="flex items-start justify-between gap-3">
                    <Typography className="text-slate-600">คืนรถ</Typography>
                    <Box className="text-right">
                      <Typography component="div" className="font-semibold text-slate-900">
                        {finalReturnPoint || "-"}
                      </Typography>
                      <Typography component="div" className="text-xs font-normal text-slate-500">
                        {returnDate && returnTime ? `${returnDate} ${returnTime}` : "-"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="flex items-center justify-between">
                    <Typography className="text-slate-600">จำนวนวัน</Typography>
                    <Typography className="font-semibold text-slate-900">
                      {days > 0 ? `${days} วัน` : "-"}
                    </Typography>
                  </Box>

                  <Box className="flex items-center justify-between">
                    <Typography className="text-slate-600">ค่าบริการเสริม</Typography>
                    <Typography className="font-semibold text-slate-900">
                      {addonsTotal > 0 ? formatTHB(addonsTotal) : "-"}
                    </Typography>
                  </Box>

                  {pricing ? (
                    <>
                      <Box className="flex items-center justify-between">
                        <Typography className="text-slate-600">ยอดก่อนส่วนลด</Typography>
                        <Typography className="font-semibold text-slate-900">
                          {formatTHB(pricing.subTotal)}
                        </Typography>
                      </Box>

                      {pricing.discountPct > 0 ? (
                        <Box className="flex items-center justify-between">
                          <Typography className="text-slate-600">
                            ส่วนลด ({pricing.discountPct}%)
                          </Typography>
                          <Typography className="font-semibold text-emerald-700">
                            -{formatTHB(pricing.discount)}
                          </Typography>
                        </Box>
                      ) : null}
                    </>
                  ) : null}

                  <Box className="flex items-center justify-between">
                    <Typography className="text-slate-600">ยอดรวม</Typography>
                    <Typography className="text-lg font-bold text-slate-900">
                      {amount > 0 ? formatTHB(amount) : "-"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Form */}
        <Card
          elevation={0}
          sx={{ boxShadow: "none" }}
          className="lg:col-span-7 rounded-2xl! border border-slate-200 bg-white"
        >
          <CardContent className="p-4!">
            <Typography className="text-sm font-semibold text-slate-900">
              ข้อมูลการจอง
            </Typography>
            <Typography className="mt-1 text-xs text-slate-500">
              เลือกจุดรับ-คืนรถ วันเวลา และกรอกข้อมูลผู้จอง
            </Typography>

            {error ? (
              <Alert severity="error" className="mt-4" onClose={() => setError(null)}>
                {error}
              </Alert>
            ) : null}

            <Divider className="my-5! border-slate-200!" />

            <Box component="form" onSubmit={onSubmit} className="grid gap-4">
              <Box className="grid gap-4 sm:grid-cols-2">
                <TextField label="ชื่อ-นามสกุล" value={fullName} onChange={(e) => setFullName(e.target.value)} fullWidth size="small" sx={fieldSX} />
                <TextField label="เบอร์โทร" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth size="small" sx={fieldSX} />
              </Box>

              {/* -------------------- Hybrid Location UI -------------------- */}
              <Box>
                <Typography className="text-sm font-semibold text-slate-900">
                  จุดรับ-คืนรถ
                </Typography>

                {!merchantBranchesEnabled ? (
                  <>
                    <Typography className="mt-1 text-xs text-slate-500">
                      ค่าบริการส่งรถคิดตามระยะทางจริง สามารถประเมินและต่อรองได้ในแชท
                    </Typography>

                    <Box className="mt-4 grid gap-4 sm:grid-cols-2">
                      <TextField
                        label="สถานที่รับรถ (Optional)"
                        value={pickupFreeText}
                        onChange={(e) => setPickupFreeText(e.target.value)}
                        fullWidth
                        size="small"
                        sx={fieldSX}
                        helperText={pickupFreeText.trim() && pickupFreeText.trim().length < 2 ? "อย่างน้อย 2 ตัวอักษร" : " "}
                        error={!!pickupFreeText.trim() && pickupFreeText.trim().length < 2}
                      />
                      <TextField
                        label="สถานที่คืนรถ (Optional)"
                        value={returnFreeText}
                        onChange={(e) => setReturnFreeText(e.target.value)}
                        fullWidth
                        size="small"
                        sx={fieldSX}
                        helperText={returnFreeText.trim() && returnFreeText.trim().length < 2 ? "อย่างน้อย 2 ตัวอักษร" : " "}
                        error={!!returnFreeText.trim() && returnFreeText.trim().length < 2}
                      />
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography className="mt-1 text-xs text-slate-500">
                      เลือกสาขารับรถ/คืนรถ หรือเลือก “อื่นๆ” เพื่อระบุสถานที่สำหรับประเมินค่าส่ง
                    </Typography>

                    <Box className="mt-4 grid gap-4 sm:grid-cols-2">
                      <Box className="grid gap-3">
                        <TextField
                          select
                          label="สาขารับรถ"
                          value={pickupBranch}
                          onChange={(e) => setPickupBranch(e.target.value)}
                          fullWidth
                          size="small"
                          sx={fieldSX}
                        >
                          {BRANCH_POINTS.map((p) => (
                            <MenuItem key={p} value={p}>
                              {p}
                            </MenuItem>
                          ))}
                          <MenuItem value={OTHER_OPTION}>
                            อื่นๆ (ระบุสถานที่เพื่อประเมินค่าส่ง)
                          </MenuItem>
                        </TextField>

                        {pickupBranch === OTHER_OPTION ? (
                          <TextField
                            label="ระบุสถานที่รับรถ"
                            value={pickupOther}
                            onChange={(e) => setPickupOther(e.target.value)}
                            fullWidth
                            size="small"
                            sx={fieldSX}
                            error={pickupOther.trim().length > 0 && pickupOther.trim().length < 2}
                            helperText={pickupOther.trim().length > 0 && pickupOther.trim().length < 2 ? "อย่างน้อย 2 ตัวอักษร" : " "}
                          />
                        ) : null}
                      </Box>

                      <Box className="grid gap-3">
                        <TextField
                          select
                          label="สาขาคืนรถ"
                          value={returnBranch}
                          onChange={(e) => setReturnBranch(e.target.value)}
                          fullWidth
                          size="small"
                          sx={fieldSX}
                        >
                          {BRANCH_POINTS.map((p) => (
                            <MenuItem key={p} value={p}>
                              {p}
                            </MenuItem>
                          ))}
                          <MenuItem value={OTHER_OPTION}>
                            อื่นๆ (ระบุสถานที่เพื่อประเมินค่าส่ง)
                          </MenuItem>
                        </TextField>

                        {returnBranch === OTHER_OPTION ? (
                          <TextField
                            label="ระบุสถานที่คืนรถ"
                            value={returnOther}
                            onChange={(e) => setReturnOther(e.target.value)}
                            fullWidth
                            size="small"
                            sx={fieldSX}
                            error={returnOther.trim().length > 0 && returnOther.trim().length < 2}
                            helperText={returnOther.trim().length > 0 && returnOther.trim().length < 2 ? "อย่างน้อย 2 ตัวอักษร" : " "}
                          />
                        ) : null}
                      </Box>
                    </Box>
                  </>
                )}
              </Box>

              {/* -------------------- Date/Time -------------------- */}
              <Box className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="วันรับรถ"
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  fullWidth
                  size="small"
                  sx={fieldSX}
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  label="เวลารับรถ"
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  fullWidth
                  size="small"
                  sx={fieldSX}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                />

                <TextField
                  label="วันคืนรถ"
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  fullWidth
                  size="small"
                  sx={fieldSX}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: pickupDate || undefined }}
                  error={!!pickupDate && !!returnDate && timeInvalid}
                  helperText={pickupDate && returnDate && timeInvalid ? "วัน/เวลาคืนรถต้องไม่ก่อนวัน/เวลารับรถ" : " "}
                />

                <TextField
                  label="เวลาคืนรถ"
                  type="time"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  fullWidth
                  size="small"
                  sx={fieldSX}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                  error={!!pickupDate && !!returnDate && timeInvalid}
                />
              </Box>

              <Divider className="border-slate-200!" />

              {/* Add-ons */}
              <Box>
                <Typography className="text-sm font-semibold text-slate-900">
                  บริการเสริม
                </Typography>
                <Typography className="mt-1 text-xs text-slate-500">
                  เลือกได้ตามต้องการ (คิดราคา {days > 0 ? `อิง ${days} วัน` : "ตามจำนวนวัน"})
                </Typography>

                <Box className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <FormGroup>
                    {ADDONS.map((a) => {
                      const priceText =
                        a.pricing === "perDay"
                          ? `${formatTHB(a.price)} / วัน`
                          : `${formatTHB(a.price)} / ครั้ง`;

                      return (
                        <FormControlLabel
                          key={a.key}
                          control={
                            <Checkbox
                              checked={addons[a.key]}
                              onChange={(e) =>
                                setAddons((prev) => ({
                                  ...prev,
                                  [a.key]: e.target.checked,
                                }))
                              }
                            />
                          }
                          label={
                            <Box className="flex w-full items-start justify-between">
                              <Box>
                                <Typography className="text-sm font-semibold text-slate-900">
                                  {a.title}
                                </Typography>
                                <Typography className="text-xs text-slate-500">
                                  {a.desc}
                                </Typography>
                              </Box>

                              <Typography className="text-sm font-bold text-slate-900 whitespace-nowrap ml-auto">
                                {priceText}
                              </Typography>
                            </Box>
                          }
                          sx={{
                            alignItems: "flex-start",
                            m: 0,
                            py: 0.75,
                            "& .MuiFormControlLabel-label": { width: "100%" },
                          }}
                        />
                      );
                    })}
                  </FormGroup>

                  <Divider className="my-4! border-slate-200!" />

                  <Box className="flex items-center justify-between">
                    <Typography className="text-sm text-slate-600">
                      รวมค่าบริการเสริม
                    </Typography>
                    <Typography className="text-sm font-bold text-slate-900">
                      {addonsTotal > 0 ? formatTHB(addonsTotal) : "-"}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {startDT && endDT && endDT.getTime() < startDT.getTime() ? (
                <Alert severity="warning">วัน/เวลาคืนรถต้องไม่ก่อนวัน/เวลารับรถ</Alert>
              ) : null}

              {/* Actions */}
              <Box className="mt-6 space-y-4">
                {/* ===== ทางเลือก: จองผ่านแชท (อยู่ด้านบน) ===== */}
                {showChatBooking ? (
                  <Box
                    className="rounded-2xl border border-amber-200 bg-amber-50 p-4"
                    sx={{
                      backgroundImage:
                        "radial-gradient(520px 160px at 18% 0%, rgba(251,191,36,0.22), transparent 60%)",
                    }}
                  >
                    <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <Box className="min-w-0">
                        <Typography className="text-sm font-bold text-amber-900">
                          ยอดรวมค่อนข้างสูง — แนะนำจองผ่านแชท
                        </Typography>
                        <Typography className="mt-1 text-xs text-amber-800">
                          ต่อรองราคา/ขอเงื่อนไขพิเศษ หรือประเมินค่าส่งเพิ่มเติมได้
                        </Typography>
                        <Typography className="mt-2 text-[11px] text-amber-700">
                          * ระบบจะส่งรายละเอียดการจองแบบย่อให้แอดมินอัตโนมัติ
                        </Typography>
                      </Box>

                      <Button
                        component="a"
                        href={chatHref}
                        target="_blank"
                        rel="noreferrer"
                        variant="contained"
                        className="rounded-xl! font-semibold!"
                        sx={{
                          textTransform: "none",
                          backgroundColor: "#f59e0b", // amber-500
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: "#d97706", // amber-600
                            boxShadow: "none",
                          },
                          minWidth: { sm: 220 },
                          py: 1.25,
                        }}
                      >
                        จองผ่านแชท (แนะนำ)
                      </Button>
                    </Box>
                  </Box>
                ) : null}

                {/* ===== ปุ่มหลัก (Primary) ===== */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.5}
                  className="items-stretch sm:items-center"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!canSubmit || loading}
                    className="rounded-xl! px-6! py-3! font-semibold!"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#059669",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#047857",
                        boxShadow: "none",
                      },
                      "&:disabled": {
                        backgroundColor: "#e5e7eb",
                        color: "#9ca3af",
                        boxShadow: "none",
                      },
                    }}
                  >
                    {loading ? "กำลังไปหน้าชำระเงิน..." : "จองและไปชำระเงินทันที"}
                  </Button>

                  <Typography className="text-xs text-slate-500 sm:pl-1">
                    * เลือกข้อมูลให้ถูกต้องก่อนดำเนินการต่อ
                  </Typography>
                </Stack>
              </Box>

              {!car ? (
                <Alert severity="info">
                  ยังไม่ได้เลือกรถ — ไปที่หน้า “รถทั้งหมด” เพื่อเลือกคันที่ต้องการ
                </Alert>
              ) : null}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}