"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  TextField,
  MenuItem,
  Button,
  Stack,
  Chip,
  Alert,
} from "@mui/material";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

import { CARS, type Car, type Badge } from "@/src/constants/cars";
import { formatTHB } from "@/src/constants/money";

type Method = "promptpay" | "card" | "transfer";

/* -------------------- Add-ons (ต้องให้ตรงกับ BookingPage) -------------------- */
type AddonKey = "carSeat" | "mountainDrive" | "returnOtherBranch";
type Addon = {
  key: AddonKey;
  title: string;
  pricing: "perDay" | "perTrip";
  price: number;
};

const ADDONS: Addon[] = [
  { key: "carSeat", title: "เพิ่มคาร์ซีท", pricing: "perDay", price: 150 },
  {
    key: "mountainDrive",
    title: "อนุญาตขับขึ้นเขา/ขึ้นดอย",
    pricing: "perTrip",
    price: 300,
  },
  { key: "returnOtherBranch", title: "คืนรถต่างสาขา", pricing: "perTrip", price: 500 },
];

function badgeStyle(b: Badge) {
  if (b === "Popular") return "!bg-amber-50 !text-amber-700 !border-amber-200";
  if (b === "New") return "!bg-emerald-50 !text-emerald-700 !border-emerald-200";
  return "!bg-slate-50 !text-slate-700 !border-slate-200";
}

function safeParseAddons(raw: string | null): AddonKey[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const allowed = new Set<AddonKey>(["carSeat", "mountainDrive", "returnOtherBranch"]);
    return parsed.filter((x) => typeof x === "string" && allowed.has(x as AddonKey)) as AddonKey[];
  } catch {
    return [];
  }
}

function calcAddonsTotal(keys: AddonKey[], days: number) {
  let total = 0;
  for (const k of keys) {
    const a = ADDONS.find((x) => x.key === k);
    if (!a) continue;
    total += a.pricing === "perDay" ? a.price * Math.max(1, days) : a.price;
  }
  return total;
}

export default function PaymentPage() {
  const params = useSearchParams();
  const router = useRouter();

  const bookingId = params.get("bookingId") || "BK-XXXX";
  const carId = params.get("carId") || "";
  const days = Number(params.get("days") || "0") || 0;

  const pickupDate = params.get("pickupDate") || "";
  const returnDate = params.get("returnDate") || "";

  // ✅ เพิ่มจุดรับ/คืน (ส่งมาจาก BookingPage)
  const pickupPoint = params.get("pickupPoint") || "";
  const returnPoint = params.get("returnPoint") || "";
  const pickupTime = params.get("pickupTime") || "";
  const returnTime = params.get("returnTime") || "";

  // ✅ amount = ยอดรวมที่ส่งมาจาก BookingPage (รวมรถสุทธิ + บริการเสริม)
  const amount = Number(params.get("amount") || "0") || 0;

  // ✅ addons ที่ส่งมาจาก BookingPage
  const addonsRaw = params.get("addons");
  const addonKeys = React.useMemo(() => safeParseAddons(addonsRaw), [addonsRaw]);
  const addonsTotal = React.useMemo(() => calcAddonsTotal(addonKeys, days), [addonKeys, days]);

  const car: Car | undefined = React.useMemo(() => CARS.find((c) => c.id === carId), [carId]);

  // ✅ ราคาเต็มของรถ (ก่อนส่วนลด) = price/day * days
  const carSubTotal = React.useMemo(() => {
    if (!car || days <= 0) return 0;
    return car.pricePerDay * days;
  }, [car, days]);

  // ✅ เพราะ amount รวม addons แล้ว → ยอดรถสุทธิ = amount - addonsTotal
  const carNet = React.useMemo(() => Math.max(0, amount - addonsTotal), [amount, addonsTotal]);

  const carDiscount = React.useMemo(() => {
    if (!car || carSubTotal <= 0) return 0;
    return Math.max(0, carSubTotal - carNet);
  }, [car, carSubTotal, carNet]);

  const discountPct = React.useMemo(() => {
    if (carSubTotal <= 0) return 0;
    return Math.round((carDiscount / carSubTotal) * 100);
  }, [carSubTotal, carDiscount]);

  const [method, setMethod] = React.useState<Method>("promptpay");
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const [slipFile, setSlipFile] = React.useState<File | null>(null);
  const [done, setDone] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const needSlip = method === "transfer";
  const canPay =
    fullName.trim().length >= 2 &&
    email.trim().includes("@") &&
    phone.trim().length >= 9 &&
    (!needSlip || !!slipFile) &&
    !loading;

  const handleConfirm = async () => {
    if (!canPay) return;

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500)); // mock
      setDone(true);
      setTimeout(() => router.push("/my-bookings"), 800);
    } finally {
      setLoading(false);
    }
  };

  const roundedFieldSX = {
    "& .MuiOutlinedInput-root": { borderRadius: "12px" },
  };

  return (
    <Container maxWidth="lg" className="py-12">
      <Box className="flex flex-col gap-2">
        <Typography variant="h5" className="text-2xl font-bold text-slate-900">
          ชำระเงิน
        </Typography>
        <Typography className="text-sm text-slate-600">
          ยืนยันการชำระเงินสำหรับการจอง{" "}
          <span className="font-semibold text-slate-900">{bookingId}</span>
        </Typography>
      </Box>

      <Box className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Left: Summary */}
        <Card
          elevation={0}
          sx={{ boxShadow: "none" }}
          className="order-2 lg:order-1 lg:col-span-5 rounded-2xl! border border-slate-200 bg-white"
        >
          <CardContent className="p-6">
            <Typography className="text-sm font-semibold text-slate-900">
              สรุปการจอง
            </Typography>

            <Box className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <Box className="flex items-center justify-between">
                <Typography className="text-sm text-slate-600">รหัสการจอง</Typography>
                <Typography className="text-sm font-semibold text-slate-900">
                  {bookingId}
                </Typography>
              </Box>

              {/* ✅ จุดรับ/คืน (สวยๆ) */}
              {(pickupPoint || returnPoint || pickupDate || returnDate) && (
                <Box className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
                  <Box className="grid gap-2">
                    <Box className="flex items-start justify-between gap-3">
                      <Typography className="text-xs font-semibold text-slate-600">
                        จุดรับรถ
                      </Typography>
                      <Box className="text-right">
                        <Typography component="div" className="text-sm font-bold text-slate-900">
                          {pickupPoint || "-"}
                        </Typography>
                        <Typography component="div" className="text-xs text-slate-500">
                          {pickupDate
                            ? `${pickupDate}${pickupTime ? ` ${pickupTime}` : ""}`
                            : "-"}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider className="border-slate-200!" />

                    <Box className="flex items-start justify-between gap-3">
                      <Typography className="text-xs font-semibold text-slate-600">
                        จุดคืนรถ
                      </Typography>
                      <Box className="text-right">
                        <Typography component="div" className="text-sm font-bold text-slate-900">
                          {returnPoint || "-"}
                        </Typography>
                        <Typography component="div" className="text-xs text-slate-500">
                          {returnDate
                            ? `${returnDate}${returnTime ? ` ${returnTime}` : ""}`
                            : "-"}
                        </Typography>
                      </Box>
                    </Box>

                    <Box className="flex items-center justify-between pt-1">
                      <Typography className="text-xs text-slate-600">จำนวนวัน</Typography>
                      <Typography className="text-xs font-bold text-slate-900">
                        {days ? `${days} วัน` : "-"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* ราคาเต็ม / ส่วนลด / บริการเสริม / ยอดชำระ */}
              {carSubTotal > 0 ? (
                <>
                  <Box className="mt-3 flex items-center justify-between">
                    <Typography className="text-sm text-slate-600">ราคาเต็ม (รถ)</Typography>
                    <Typography
                      className="text-sm font-semibold text-slate-500 line-through"
                      component="div"
                    >
                      {formatTHB(carSubTotal)}
                    </Typography>
                  </Box>

                  <Box className="mt-2 flex items-center justify-between">
                    <Typography className="text-sm text-slate-600">ยอดรถสุทธิ</Typography>
                    <Typography className="text-sm font-bold text-slate-900">
                      {formatTHB(carNet)}
                    </Typography>
                  </Box>

                  {carDiscount > 0 ? (
                    <Box className="mt-3 rounded-xl border border-emerald-400 bg-emerald-100 px-4 py-3 shadow-sm">
                      <Box className="flex items-center justify-between">
                        <Typography className="text-sm font-bold text-emerald-900">
                          คุณประหยัดไป
                        </Typography>
                        <Typography className="text-lg font-black text-emerald-800">
                          -{formatTHB(carDiscount)} ({discountPct}%)
                        </Typography>
                      </Box>
                    </Box>
                  ) : null}

                  {addonKeys.length > 0 ? (
                    <Box className="mt-3 space-y-2">
                      <Divider className="border-slate-200! mb-2!" />
                      <Box className="flex items-center justify-between">
                        <Typography className="text-sm font-semibold text-slate-800">
                          บริการเสริม
                        </Typography>
                        <Typography className="text-sm font-bold text-slate-900">
                          {formatTHB(addonsTotal)}
                        </Typography>
                      </Box>

                      <Box className="space-y-1">
                        {addonKeys.map((k) => {
                          const a = ADDONS.find((x) => x.key === k);
                          if (!a) return null;

                          const priceText =
                            a.pricing === "perDay"
                              ? `${formatTHB(a.price)} / วัน`
                              : `${formatTHB(a.price)} / ครั้ง`;

                          return (
                            <Box key={k} className="flex items-start justify-between gap-3">
                              <Typography className="text-xs text-slate-600">• {a.title}</Typography>
                              <Typography className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                                {priceText}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  ) : null}

                  <Box className="mt-3 flex items-center justify-between">
                    <Typography className="text-sm text-slate-600">ยอดชำระ</Typography>
                    <Typography className="text-lg font-bold text-slate-900">
                      {formatTHB(amount)}
                    </Typography>
                  </Box>
                </>
              ) : (
                <Box className="mt-2 flex items-center justify-between">
                  <Typography className="text-sm text-slate-600">ยอดชำระ</Typography>
                  <Typography className="text-lg font-bold text-slate-900">
                    {formatTHB(amount)}
                  </Typography>
                </Box>
              )}
            </Box>

            <Divider className="my-5! border-slate-200!" />

            {car ? (
              <Box className="rounded-xl border border-slate-200 bg-white p-4">
                <Box className="relative aspect-4/3 overflow-hidden rounded-xl bg-slate-50">
                  <Image
                    src={car.image || "/cars/placeholder.jpg"}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                </Box>

                <Box className="mt-3 flex items-start justify-between gap-3">
                  <Box className="min-w-0">
                    <Typography className="truncate text-sm font-semibold text-slate-900">
                      {car.name}
                    </Typography>
                    <Typography className="mt-1 text-xs text-slate-600">
                      {car.type} • {car.seats} ที่นั่ง • {car.transmission} • {car.fuel}
                    </Typography>
                  </Box>

                  {car.badge ? (
                    <Chip
                      size="small"
                      label={car.badge}
                      variant="outlined"
                      className={`border! ${badgeStyle(car.badge)}`}
                    />
                  ) : null}
                </Box>

                <Divider className="my-4! border-slate-200!" />

                <Box className="flex items-center justify-between">
                  <Typography className="text-sm text-slate-600">ราคา/วัน</Typography>
                  <Typography className="text-sm font-semibold text-slate-900">
                    {formatTHB(car.pricePerDay)}
                  </Typography>
                </Box>

                <Link href={`/cars/${encodeURIComponent(car.id)}`} className="mt-4 block">
                  <Button fullWidth variant="outlined" className="rounded-xl!" sx={{ textTransform: "none" }}>
                    ดูรายละเอียดรถ
                  </Button>
                </Link>
              </Box>
            ) : (
              <Box className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <Typography className="text-sm text-slate-600">
                  ไม่พบข้อมูลรถ (carId: <span className="font-semibold">{carId || "-"}</span>)
                </Typography>
                <Link href="/cars" className="mt-3 inline-block">
                  <Button variant="outlined" className="rounded-xl!" sx={{ textTransform: "none" }}>
                    กลับไปเลือกรถ
                  </Button>
                </Link>
              </Box>
            )}

            <Divider className="my-5! border-slate-200!" />

            <Typography className="text-xs text-slate-500">
              แนะนำ: หากชำระแล้วไม่ขึ้นสถานะ ให้ติดต่อทีมงานพร้อมรหัสการจอง
            </Typography>
          </CardContent>
        </Card>

        {/* Right: Payment form */}
        <Card
          elevation={0}
          sx={{ boxShadow: "none" }}
          className="order-1 lg:order-2 lg:col-span-7 rounded-2xl! border border-slate-200 bg-white"
        >
          <CardContent className="p-6">
            {done ? (
              <Alert icon={<VerifiedRoundedIcon />} severity="success" className="mb-4">
                รับข้อมูลการชำระเงินแล้ว (mock) — กำลังพาไปหน้า “การจองของฉัน”
              </Alert>
            ) : null}

            <Typography className="text-sm font-semibold text-slate-900">
              ข้อมูลผู้ชำระเงิน
            </Typography>

            <Box className="mt-4 grid gap-4 sm:grid-cols-2">
              <TextField
                label="ชื่อ-นามสกุล"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                fullWidth
                sx={roundedFieldSX}
              />
              <TextField
                label="เบอร์โทร"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                sx={roundedFieldSX}
              />
            </Box>

            <Box className="mt-4">
              <TextField
                label="อีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={roundedFieldSX}
              />
            </Box>

            <Divider className="my-6! border-slate-200!" />

            <Typography className="text-sm font-semibold text-slate-900">
              วิธีชำระเงิน
            </Typography>

            <Box className="mt-4">
              <TextField
                select
                label="เลือกวิธี"
                value={method}
                onChange={(e) => setMethod(e.target.value as Method)}
                fullWidth
                sx={roundedFieldSX}
              >
                <MenuItem value="promptpay">PromptPay QR</MenuItem>
                <MenuItem value="card">บัตรเครดิต/เดบิต</MenuItem>
                <MenuItem value="transfer">โอนผ่านธนาคาร</MenuItem>
              </TextField>
            </Box>

            <Box className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              {method === "promptpay" ? (
                <Box className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Box>
                    <Typography className="text-sm font-semibold text-slate-900">
                      สแกนเพื่อชำระเงิน
                    </Typography>
                    <Typography className="mt-1 text-sm text-slate-600">
                      จำนวนเงิน:{" "}
                      <span className="font-semibold text-slate-900">
                        {formatTHB(amount)}
                      </span>
                    </Typography>
                  </Box>

                  <Box className="relative h-36 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <Image
                      src="/QR-CODE.jpg"
                      alt="PromptPay QR"
                      fill
                      className="object-contain p-2"
                    />
                  </Box>
                </Box>
              ) : null}

              {method === "card" ? (
                <Box className="grid gap-4 sm:grid-cols-2">
                  <TextField label="หมายเลขบัตร" placeholder="1234 5678 9012 3456" fullWidth sx={roundedFieldSX} />
                  <TextField label="ชื่อบนบัตร" placeholder="NAME SURNAME" fullWidth sx={roundedFieldSX} />
                  <TextField label="หมดอายุ (MM/YY)" placeholder="12/30" fullWidth sx={roundedFieldSX} />
                  <TextField label="CVV" placeholder="123" fullWidth sx={roundedFieldSX} />
                  <Typography className="text-xs text-slate-500 sm:col-span-2">
                    * Production จริงควรใช้ Stripe/Omise และไม่เก็บข้อมูลบัตรเอง
                  </Typography>
                </Box>
              ) : null}

              {method === "transfer" ? (
                <Box className="grid gap-4">
                  <Box className="rounded-xl border border-slate-200 bg-white p-4">
                    <Typography className="text-sm font-semibold text-slate-900">
                      โอนเข้าบัญชี
                    </Typography>
                    <Typography className="mt-1 text-sm text-slate-600">
                      ธนาคาร: กสิกรไทย • เลขบัญชี: 123-4-56789-0 • ชื่อบัญชี: RentFlow Co.,Ltd.
                    </Typography>
                    <Typography className="mt-2 text-sm text-slate-600">
                      จำนวนเงิน:{" "}
                      <span className="font-semibold text-slate-900">
                        {formatTHB(amount)}
                      </span>
                    </Typography>
                  </Box>

                  <Button
                    component="label"
                    variant="outlined"
                    className="rounded-xl!"
                    startIcon={<UploadFileRoundedIcon />}
                  >
                    {slipFile ? "เปลี่ยนไฟล์สลิป" : "แนบสลิปโอนเงิน"}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => setSlipFile(e.target.files?.[0] ?? null)}
                    />
                  </Button>

                  {slipFile ? (
                    <Typography className="text-xs text-slate-600">
                      ไฟล์: <span className="font-semibold text-slate-900">{slipFile.name}</span>
                    </Typography>
                  ) : (
                    <Typography className="text-xs text-slate-500">
                      * จำเป็นต้องแนบสลิปเพื่อยืนยัน
                    </Typography>
                  )}
                </Box>
              ) : null}
            </Box>

            <Stack direction="row" spacing={1.5} className="mt-6 flex-wrap items-center">
              <Button
                variant="contained"
                disabled={!canPay}
                onClick={handleConfirm}
                className="rounded-xl! px-5! py-2.5! font-semibold!"
                sx={{ textTransform: "none", backgroundColor: "rgb(15 23 42)" }}
              >
                {loading ? "กำลังยืนยัน..." : "ยืนยันการชำระเงิน"}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}