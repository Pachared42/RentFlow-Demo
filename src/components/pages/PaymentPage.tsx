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
  Rating,
} from "@mui/material";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

import { CARS, type Car, type Badge } from "@/src/constants/cars";

type Method = "promptpay" | "card" | "transfer";

function toMoney(v: number) {
  return `฿${v.toLocaleString()}`;
}

function badgeStyle(b: Badge) {
  if (b === "Popular") return "!bg-amber-50 !text-amber-700 !border-amber-200";
  if (b === "New")
    return "!bg-emerald-50 !text-emerald-700 !border-emerald-200";
  return "!bg-slate-50 !text-slate-700 !border-slate-200";
}

export default function PaymentPage() {
  const params = useSearchParams();
  const router = useRouter();

  const bookingId = params.get("bookingId") || "BK-XXXX";
  const carId = params.get("carId") || "";
  const days = Number(params.get("days") || "0") || 0;
  const pickupDate = params.get("pickupDate") || "";
  const returnDate = params.get("returnDate") || "";

  const amount = Number(params.get("amount") || "0") || 0;

  const car: Car | undefined = React.useMemo(
    () => CARS.find((c) => c.id === carId),
    [carId]
  );

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
      // TODO: ต่อ API จริง
      // POST /payments { bookingId, method, ... } (+ แนบไฟล์ slip ถ้ามี)
      // PATCH booking status -> paid/confirmed
      await new Promise((r) => setTimeout(r, 500)); // mock

      setDone(true);
      setTimeout(() => router.push("/my-bookings"), 800);
    } finally {
      setLoading(false);
    }
  };

  const methodMeta: Record<
    Method,
    { label: string; icon: React.ReactNode; hint: string }
  > = {
    promptpay: {
      label: "PromptPay QR",
      icon: <QrCode2RoundedIcon fontSize="small" />,
      hint: "สแกน QR เพื่อชำระเงิน (ตัวอย่าง UI)",
    },
    card: {
      label: "บัตรเครดิต/เดบิต",
      icon: <CreditCardRoundedIcon fontSize="small" />,
      hint: "รองรับ Visa / MasterCard (ตัวอย่าง UI)",
    },
    transfer: {
      label: "โอนผ่านธนาคาร",
      icon: <AccountBalanceRoundedIcon fontSize="small" />,
      hint: "แนบสลิปหลังโอนเพื่อยืนยัน",
    },
  };

  return (
    <Container maxWidth="lg" className="py-12">
      <Box className="flex flex-col gap-2">
        <Typography className="text-2xl font-bold text-slate-900">
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
                <Typography className="text-sm text-slate-600">
                  รหัสการจอง
                </Typography>
                <Typography className="text-sm font-semibold text-slate-900">
                  {bookingId}
                </Typography>
              </Box>

              <Box className="mt-2 flex items-center justify-between">
                <Typography className="text-sm text-slate-600">
                  ยอดชำระ
                </Typography>
                <Typography className="text-lg font-bold text-slate-900">
                  {toMoney(amount)}
                </Typography>
              </Box>

              {pickupDate || returnDate ? (
                <Box className="mt-3 text-sm text-slate-600">
                  <div>
                    รับรถ:{" "}
                    <span className="font-semibold text-slate-900">
                      {pickupDate || "-"}
                    </span>
                  </div>
                  <div>
                    คืนรถ:{" "}
                    <span className="font-semibold text-slate-900">
                      {returnDate || "-"}
                    </span>
                  </div>
                  <div>
                    จำนวนวัน:{" "}
                    <span className="font-semibold text-slate-900">
                      {days ? `${days} วัน` : "-"}
                    </span>
                  </div>
                </Box>
              ) : null}
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
                      {car.type} • {car.seats} ที่นั่ง • {car.transmission} •{" "}
                      {car.fuel}
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

                <Box className="mt-2 flex items-center gap-2">
                  <Rating value={car.grade} readOnly size="small" />
                  <Typography className="text-xs text-slate-500">
                    {car.grade}/4
                  </Typography>
                </Box>

                <Divider className="my-4! border-slate-200!" />

                <Box className="flex items-center justify-between">
                  <Typography className="text-sm text-slate-600">
                    ราคา/วัน
                  </Typography>
                  <Typography className="text-sm font-semibold text-slate-900">
                    ฿{car.pricePerDay.toLocaleString()}
                  </Typography>
                </Box>

                <Link
                  href={`/cars/${encodeURIComponent(car.id)}`}
                  className="mt-4 block"
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    className="rounded-xl!"
                    sx={{ textTransform: "none" }}
                  >
                    ดูรายละเอียดรถ
                  </Button>
                </Link>
              </Box>
            ) : (
              <Box className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <Typography className="text-sm text-slate-600">
                  ไม่พบข้อมูลรถ (carId:{" "}
                  <span className="font-semibold">{carId || "-"}</span>)
                </Typography>
                <Link href="/cars" className="mt-3 inline-block">
                  <Button
                    variant="outlined"
                    className="rounded-xl!"
                    sx={{ textTransform: "none" }}
                  >
                    กลับไปเลือกรถ
                  </Button>
                </Link>
              </Box>
            )}

            <Divider className="my-5! border-slate-200!" />

            <Box className="space-y-2">
              <Typography className="text-xs text-slate-500">
                แนะนำ: หากชำระแล้วไม่ขึ้นสถานะ ให้ติดต่อทีมงานพร้อมรหัสการจอง
              </Typography>
              {/* <Typography className="text-xs text-slate-500">
          Production จริง: ควรมีสถานะ payment (pending/paid/failed) และ webhook
        </Typography> */}
            </Box>
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
              <Alert
                icon={<VerifiedRoundedIcon />}
                severity="success"
                className="mb-4"
              >
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
              />
              <TextField
                label="เบอร์โทร"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
              />
            </Box>

            <Box className="mt-4">
              <TextField
                label="อีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Box>

            <Divider className="my-6! border-slate-200!" />

            <Typography className="text-sm font-semibold text-slate-900">
              วิธีชำระเงิน
            </Typography>

            <Box className="mt-4 grid gap-4 sm:grid-cols-2">
              <TextField
                select
                label="เลือกวิธี"
                value={method}
                onChange={(e) => setMethod(e.target.value as Method)}
                fullWidth
              >
                <MenuItem value="promptpay">PromptPay QR</MenuItem>
                <MenuItem value="card">บัตรเครดิต/เดบิต</MenuItem>
                <MenuItem value="transfer">โอนผ่านธนาคาร</MenuItem>
              </TextField>

              <Box className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Typography className="text-xs text-slate-600">
                  สถานะ
                </Typography>
                <Box className="mt-1 flex items-center gap-2">
                  <Chip
                    size="small"
                    label={methodMeta[method].label}
                    icon={methodMeta[method].icon as any}
                    variant="outlined"
                    className="border! border-slate-200! bg-white!"
                  />
                  <Typography className="text-xs text-slate-500">
                    {methodMeta[method].hint}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Method panel */}
            <Box className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              {method === "promptpay" ? (
                <Box className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Box>
                    <Typography className="text-sm font-semibold text-slate-900">
                      สแกนเพื่อชำระเงิน
                    </Typography>
                    <Typography className="mt-1 text-sm text-slate-600">
                      จำนวนเงิน:{" "}
                      <span className="font-semibold text-slate-900">
                        {toMoney(amount)}
                      </span>
                    </Typography>
                    <Typography className="mt-1 text-xs text-slate-500">
                      * QR ตัวอย่าง — ต่อจริงให้ generate จาก
                      backend/ผู้ให้บริการ
                    </Typography>
                  </Box>

                  <Box className="relative h-36 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <Image
                      src="/qr-placeholder.png"
                      alt="PromptPay QR"
                      fill
                      className="object-contain p-4"
                    />
                  </Box>
                </Box>
              ) : null}

              {method === "card" ? (
                <Box className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label="หมายเลขบัตร"
                    placeholder="1234 5678 9012 3456"
                    fullWidth
                  />
                  <TextField
                    label="ชื่อบนบัตร"
                    placeholder="NAME SURNAME"
                    fullWidth
                  />
                  <TextField
                    label="หมดอายุ (MM/YY)"
                    placeholder="12/30"
                    fullWidth
                  />
                  <TextField label="CVV" placeholder="123" fullWidth />
                  <Typography className="text-xs text-slate-500 sm:col-span-2">
                    * Production จริงควรใช้ Stripe/Omise และไม่เก็บข้อมูลบัตรเอง
                  </Typography>
                </Box>
              ) : null}

              {method === "transfer" ? (
                <Box className="grid gap-4">
                  <Box className="rounded-xl border border-slate-200 bg-white p-4">
                    <Typography className="text-sm font-semibold text-slate-900">
                      โอนเข้าบัญชี (ตัวอย่าง)
                    </Typography>
                    <Typography className="mt-1 text-sm text-slate-600">
                      ธนาคาร: กสิกรไทย • เลขบัญชี: 123-4-56789-0 • ชื่อบัญชี:
                      RentFlow Co.,Ltd.
                    </Typography>
                    <Typography className="mt-2 text-sm text-slate-600">
                      จำนวนเงิน:{" "}
                      <span className="font-semibold text-slate-900">
                        {toMoney(amount)}
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
                      ไฟล์:{" "}
                      <span className="font-semibold text-slate-900">
                        {slipFile.name}
                      </span>
                    </Typography>
                  ) : (
                    <Typography className="text-xs text-slate-500">
                      * จำเป็นต้องแนบสลิปเพื่อยืนยัน
                    </Typography>
                  )}
                </Box>
              ) : null}
            </Box>

            <Stack
              direction="row"
              spacing={1.5}
              className="mt-6 flex-wrap items-center"
            >
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
