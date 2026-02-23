"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Divider,
  Rating,
  Card,
  CardContent,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocalGasStationRoundedIcon from "@mui/icons-material/LocalGasStationRounded";
import AirlineSeatReclineNormalRoundedIcon from "@mui/icons-material/AirlineSeatReclineNormalRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import DoNotDisturbAltRoundedIcon from "@mui/icons-material/DoNotDisturbAltRounded";
import { type Car, type Badge } from "@/src/constants/cars";
import { getCarDetail } from "@/src/constants/carDetails";

function badgeStyle(b: Badge) {
  if (b === "Popular") return "!bg-amber-50 !text-amber-700 !border-amber-200";
  if (b === "New")
    return "!bg-emerald-50 !text-emerald-700 !border-emerald-200";
  return "!bg-slate-50 !text-slate-700 !border-slate-200";
}

function toTHBText(n: number) {
  return `${Math.max(0, Math.round(n)).toLocaleString("th-TH")} บาท`;
}

function normCarId(v: string) {
  try {
    return decodeURIComponent(String(v ?? "")).trim();
  } catch {
    return String(v ?? "").trim();
  }
}

function SpecChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Chip
      icon={icon as any}
      label={label}
      variant="outlined"
      size="small"
      className="border! border-slate-200! bg-white!"
      sx={{
        "& .MuiChip-icon": { marginLeft: "10px" },
      }}
    />
  );
}

export default function CarDetailPage({ carId }: { carId: string }) {
  const router = useRouter();

  const id = React.useMemo(() => normCarId(carId), [carId]);
  const detail = React.useMemo(() => getCarDetail(id), [id]);

  if (!detail) {
    return (
      <Container maxWidth="lg" className="py-12">
        <Button
          onClick={() => router.push("/cars")}
          variant="outlined"
          className="rounded-xl! border-slate-300! text-slate-900! mb-4!"
          sx={{ textTransform: "none" }}
        >
          กลับหน้าแรก
        </Button>
        <Box className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
          <Typography className="text-lg font-bold text-slate-900">
            ไม่พบรถที่คุณเลือก
          </Typography>
          <Typography className="mt-1 text-sm text-slate-600">
            รหัส:{" "}
            <span className="font-semibold text-slate-900">{id || "-"}</span>
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-12">
      {/* Top section */}
      <Box className="mt-5 grid gap-6 lg:grid-cols-12">
        {/* Image */}
        <Box className="lg:col-span-7">
          <Box className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <Box className="relative aspect-16/10">
              <Image
                src={detail.image || "/cars/placeholder.jpg"}
                alt={detail.name}
                fill
                className="object-cover"
                priority
              />
            </Box>

            {/* subtle overlay */}
            <Box className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
          </Box>
        </Box>

        {/* Summary card */}
        <Card
          elevation={0}
          sx={{ boxShadow: "none" }}
          className="lg:col-span-5 rounded-2xl! border border-slate-200 bg-white"
        >
          <CardContent className="p-4!">
            <Box className="flex items-start justify-between gap-3">
              <Box className="min-w-0">
                <Typography className="truncate text-xl font-bold text-slate-900">
                  {detail.name}
                </Typography>
                <Typography className="mt-2 text-sm text-slate-600">
                  {detail.type} • {detail.seats} ที่นั่ง • {detail.transmission}{" "}
                  • {detail.fuel}
                </Typography>
              </Box>

              {detail.badge ? (
                <Chip
                  size="small"
                  label={detail.badge}
                  variant="outlined"
                  className={`border! ${badgeStyle(detail.badge)}`}
                />
              ) : null}
            </Box>

            <Box className="mt-3 flex items-center gap-2">
              <Chip
                size="small"
                icon={<VerifiedRoundedIcon fontSize="small" />}
                label="ตรวจเช็คก่อนส่งมอบ"
                variant="outlined"
                className="border! border-slate-200! bg-white! text-slate-700!"
                sx={{ ml: 1 }}
              />
            </Box>

            <Divider className="my-5! border-slate-200!" />

            {/* price */}
            <Box className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <Typography className="text-sm text-slate-600">
                ราคาเริ่มต้น
              </Typography>
              <Box className="mt-1 flex items-end gap-2">
                <Typography className="text-3xl font-extrabold text-slate-900">
                  {toTHBText(detail.pricePerDay)}
                </Typography>
                <Typography className="text-sm font-medium text-slate-600">
                  / วัน
                </Typography>
              </Box>
            </Box>

            {/* CTA */}
            <Box className="mt-5 grid gap-2">
              <Button
                fullWidth
                variant="contained"
                className="rounded-xl! py-2.5! font-semibold!"
                sx={{ textTransform: "none", backgroundColor: "rgb(15 23 42)" }}
                onClick={() =>
                  router.push(`/booking?carId=${encodeURIComponent(detail.id)}`)
                }
              >
                จองคันนี้
              </Button>

              <Button
                fullWidth
                variant="outlined"
                className="rounded-xl! py-2.5!"
                sx={{ textTransform: "none" }}
                onClick={() => router.push("/cars")}
              >
                ดูรถคันอื่น
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Details */}
      <Box className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Left */}
        <Box className="lg:col-span-8 space-y-6">
          <Box className="rounded-2xl border border-slate-200 bg-white p-4!">
            <Typography className="text-sm font-semibold text-slate-900">
              รายละเอียดรถ
            </Typography>
            <Typography className="mt-2 text-sm leading-relaxed text-slate-600">
              รถรุ่น{" "}
              <span className="font-semibold text-slate-900">
                {detail.name}
              </span>{" "}
              เหมาะสำหรับการใช้งานประเภท{" "}
              <span className="font-semibold text-slate-900">
                {detail.type}
              </span>{" "}
              รองรับ{" "}
              <span className="font-semibold text-slate-900">
                {detail.seats} ที่นั่ง
              </span>{" "}
              พร้อมระบบ{" "}
              <span className="font-semibold text-slate-900">
                {detail.transmission}
              </span>{" "}
              และเชื้อเพลิง{" "}
              <span className="font-semibold text-slate-900">
                {detail.fuel}
              </span>
              .
            </Typography>
          </Box>

          <Box className="rounded-2xl border border-slate-200 bg-white p-4!">
            <Typography className="text-sm font-semibold text-slate-900">
              สิ่งที่รวมในราคา
            </Typography>

            <Box className="mt-3 grid gap-3 sm:grid-cols-2">
              <Box className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <Box className="flex items-start gap-2">
                  <TaskAltRoundedIcon
                    fontSize="small"
                    className="mt-0.5 text-emerald-600"
                  />
                  <Box>
                    <Typography
                      className="text-sm font-semibold text-slate-900"
                      component="div"
                    >
                      ตรวจเช็คสภาพรถก่อนส่งมอบ
                    </Typography>
                    <Typography
                      className="mt-1 text-xs text-slate-600"
                      component="div"
                    >
                      เช็คระบบพื้นฐานและทำความสะอาดก่อนรับรถ
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box className="rounded-2xl border border-slate-200 bg-slate-50 p-4!">
                <Box className="flex items-start gap-2">
                  <TaskAltRoundedIcon
                    fontSize="small"
                    className="mt-0.5 text-emerald-600"
                  />
                  <Box>
                    <Typography
                      className="text-sm font-semibold text-slate-900"
                      component="div"
                    >
                      บริการช่วยเหลือเบื้องต้น
                    </Typography>
                    <Typography
                      className="mt-1 text-xs text-slate-600"
                      component="div"
                    >
                      ติดต่อทีมงานได้ในเวลาทำการ (ตัวอย่าง)
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box className="rounded-2xl border border-slate-200 bg-white p-4">
                <Box className="flex items-start gap-2">
                  <DoNotDisturbAltRoundedIcon
                    fontSize="small"
                    className="mt-0.5 text-rose-600"
                  />
                  <Box>
                    <Typography
                      className="text-sm font-semibold text-slate-900"
                      component="div"
                    >
                      ค่าน้ำมัน
                    </Typography>
                    <Typography
                      className="mt-1 text-xs text-slate-600"
                      component="div"
                    >
                      ปกติคิดตามนโยบาย (รับเท่าไรคืนเท่านั้น)
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box className="rounded-2xl border border-slate-200 bg-white p-4">
                <Box className="flex items-start gap-2">
                  <DoNotDisturbAltRoundedIcon
                    fontSize="small"
                    className="mt-0.5 text-rose-600"
                  />
                  <Box>
                    <Typography
                      className="text-sm font-semibold text-slate-900"
                      component="div"
                    >
                      ค่าปรับคืนรถเกินเวลา
                    </Typography>
                    <Typography
                      className="mt-1 text-xs text-slate-600"
                      component="div"
                    >
                      ขึ้นกับเงื่อนไขจริงของผู้ให้บริการ
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className="rounded-2xl border border-slate-200 bg-white p-4!">
            <Typography className="text-sm font-semibold text-slate-900">
              เงื่อนไขการเช่า
            </Typography>
            <Box
              component="ul"
              className="mt-3 space-y-2 pl-5 text-sm text-slate-600"
            >
              <Box component="li">
                เตรียมบัตรประชาชน/พาสปอร์ต และใบขับขี่ตัวจริง
              </Box>
              <Box component="li">
                รับ-คืนรถตามวันและเวลาที่เลือกในหน้า “จองรถ”
              </Box>
              <Box component="li">
                การมัดจำ/ประกันและค่าธรรมเนียมขึ้นกับผู้ให้บริการ (ปรับได้)
              </Box>
              <Box component="li">
                แนะนำถ่ายรูปสภาพรถก่อนออกเดินทางเพื่อความชัดเจน
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right */}
        <Box className="lg:col-span-4 space-y-6">
          <Box className="rounded-2xl border border-slate-200! bg-slate-50! p-4!">
            <Typography className="text-sm font-semibold text-slate-900">
              สรุปสเปค
            </Typography>

            <Box className="mt-3 grid gap-2 text-sm text-slate-700">
              <Box className="flex items-center justify-between">
                <Typography className="text-slate-600">ประเภท</Typography>
                <Typography className="font-semibold text-slate-900">
                  {detail.type}
                </Typography>
              </Box>
              <Box className="flex items-center justify-between">
                <Typography className="text-slate-600">ที่นั่ง</Typography>
                <Typography className="font-semibold text-slate-900">
                  {detail.seats}
                </Typography>
              </Box>
              <Box className="flex items-center justify-between">
                <Typography className="text-slate-600">เกียร์</Typography>
                <Typography className="font-semibold text-slate-900">
                  {detail.transmission}
                </Typography>
              </Box>
              <Box className="flex items-center justify-between">
                <Typography className="text-slate-600">เชื้อเพลิง</Typography>
                <Typography className="font-semibold text-slate-900">
                  {detail.fuel}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
