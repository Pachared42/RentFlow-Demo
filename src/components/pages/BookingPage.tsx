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
  Rating,
  MenuItem,
} from "@mui/material";
import { CARS, type Car } from "@/src/constants/cars";

type LocationPoint =
  | "สาขาสุพรรณบุรี (ในเมือง)"
  | "สาขากรุงเทพฯ (รัชดา)"
  | "สนามบินดอนเมือง (DMK)"
  | "สนามบินสุวรรณภูมิ (BKK)"
  | "ส่งรถถึงที่ (นัดหมาย)";

const PICKUP_POINTS: LocationPoint[] = [
  "สาขาสุพรรณบุรี (ในเมือง)",
  "สาขากรุงเทพฯ (รัชดา)",
  "สนามบินดอนเมือง (DMK)",
  "สนามบินสุวรรณภูมิ (BKK)",
  "ส่งรถถึงที่ (นัดหมาย)",
];

function badgeStyle(b: NonNullable<Car["badge"]>) {
  if (b === "Popular") return "!bg-amber-50 !text-amber-700 !border-amber-200";
  if (b === "New")
    return "!bg-emerald-50 !text-emerald-700 !border-emerald-200";
  return "!bg-slate-50 !text-slate-700 !border-slate-200";
}

function toTHBText(n: number) {
  return `${Math.max(0, Math.round(n)).toLocaleString("th-TH")} บาท`;
}

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

export default function BookingPage() {
  const params = useSearchParams();
  const router = useRouter();

  const carId = params.get("carId") || "";
  const car = React.useMemo(() => CARS.find((c) => c.id === carId), [carId]);

  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const [pickupPoint, setPickupPoint] = React.useState<LocationPoint>(
    PICKUP_POINTS[0]
  );
  const [returnPoint, setReturnPoint] = React.useState<LocationPoint>(
    PICKUP_POINTS[0]
  );

  const [pickupDate, setPickupDate] = React.useState("");
  const [pickupTime, setPickupTime] = React.useState("10:00");

  const [returnDate, setReturnDate] = React.useState("");
  const [returnTime, setReturnTime] = React.useState("10:00");

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

  const amount = React.useMemo(() => {
    if (!car || days <= 0) return 0;
    return car.pricePerDay * days;
  }, [car, days]);

  const canSubmit =
    !!car &&
    fullName.trim().length >= 2 &&
    phone.trim().length >= 9 &&
    !!pickupDate &&
    !!returnDate &&
    !!pickupTime &&
    !!returnTime &&
    !!pickupPoint &&
    !!returnPoint &&
    !timeInvalid;

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
        `&pickupPoint=${encodeURIComponent(pickupPoint)}` +
        `&returnPoint=${encodeURIComponent(returnPoint)}`
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
                  <Button
                    variant="outlined"
                    className="rounded-xl!"
                    sx={{ textTransform: "none" }}
                  >
                    กลับไปเลือกรถ
                  </Button>
                </Link>
              </Box>
            ) : (
              <Box className="rounded-xl! border border-slate-200 bg-white p-4!">
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
                    <Typography className="truncate text-base font-semibold text-slate-900">
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

                <Box className="mb-6! space-y-2 text-sm">
                  <Box className="flex items-center justify-between">
                    <Typography className="text-slate-600">ราคา/วัน</Typography>
                    <Typography className="font-semibold text-slate-900">
                      {toTHBText(car.pricePerDay)} / วัน
                    </Typography>
                  </Box>

                  {/* ✅ FIX: ไม่ใส่ div ใน Typography */}
                  <Box className="flex items-start justify-between gap-3">
                    <Typography className="text-slate-600">รับรถ</Typography>
                    <Box className="text-right">
                      <Typography
                        component="div"
                        className="font-semibold text-slate-900"
                      >
                        {pickupPoint}
                      </Typography>
                      <Typography
                        component="div"
                        className="text-xs font-normal text-slate-500"
                      >
                        {pickupDate && pickupTime
                          ? `${pickupDate} ${pickupTime}`
                          : "-"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="flex items-start justify-between gap-3">
                    <Typography className="text-slate-600">คืนรถ</Typography>
                    <Box className="text-right">
                      <Typography
                        component="div"
                        className="font-semibold text-slate-900"
                      >
                        {returnPoint}
                      </Typography>
                      <Typography
                        component="div"
                        className="text-xs font-normal text-slate-500"
                      >
                        {returnDate && returnTime
                          ? `${returnDate} ${returnTime}`
                          : "-"}
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
                    <Typography className="text-slate-600">ยอดรวม</Typography>
                    <Typography className="text-lg font-bold text-slate-900">
                      {amount > 0 ? toTHBText(amount) : "-"}
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
          <CardContent className="p-6">
            <Typography className="text-sm font-semibold text-slate-900">
              ข้อมูลการจอง
            </Typography>
            <Typography className="mt-1 text-xs text-slate-500">
              เลือกจุดรับ-คืนรถ วันเวลา และกรอกข้อมูลผู้จอง
            </Typography>

            {error ? (
              <Alert severity="error" className="mt-4">
                {error}
              </Alert>
            ) : null}

            <Divider className="my-5! border-slate-200!" />

            <Box component="form" onSubmit={onSubmit} className="grid gap-4">
              <Box className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="ชื่อ-นามสกุล"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  fullWidth
                  size="small"
                  sx={fieldSX}
                />
                <TextField
                  label="เบอร์โทร"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                  size="small"
                  sx={fieldSX}
                />
              </Box>

              <Box className="grid gap-4 sm:grid-cols-2">
                <TextField
                  select
                  label="จุดรับรถ"
                  value={pickupPoint}
                  onChange={(e) =>
                    setPickupPoint(e.target.value as LocationPoint)
                  }
                  fullWidth
                  size="small"
                  sx={fieldSX}
                >
                  {PICKUP_POINTS.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="จุดคืนรถ"
                  value={returnPoint}
                  onChange={(e) =>
                    setReturnPoint(e.target.value as LocationPoint)
                  }
                  fullWidth
                  size="small"
                  sx={fieldSX}
                >
                  {PICKUP_POINTS.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

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
                  helperText={
                    pickupDate && returnDate && timeInvalid
                      ? "วัน/เวลาคืนรถต้องไม่ก่อนวัน/เวลารับรถ"
                      : " "
                  }
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

              {startDT && endDT && endDT.getTime() < startDT.getTime() ? (
                <Alert severity="warning">
                  วัน/เวลาคืนรถต้องไม่ก่อนวัน/เวลารับรถ
                </Alert>
              ) : null}

              <Stack
                direction="row"
                spacing={1.5}
                className="items-center flex-wrap"
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!canSubmit || loading}
                  className="rounded-xl! px-5! py-2.5! font-semibold!"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "rgb(15 23 42)",
                  }}
                >
                  {loading ? "กำลังไปหน้าชำระเงิน..." : "ไปชำระเงิน"}
                </Button>

                <Typography className="text-xs text-slate-500">
                  * เลือกจุดรับ-คืนรถ และวันเวลาให้ถูกต้อง
                </Typography>
              </Stack>

              {!car ? (
                <Alert severity="info">
                  ยังไม่ได้เลือกรถ — ไปที่หน้า “รถทั้งหมด”
                  เพื่อเลือกคันที่ต้องการ
                </Alert>
              ) : null}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
