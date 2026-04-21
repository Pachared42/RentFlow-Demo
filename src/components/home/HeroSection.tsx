"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import DirectionsCarFilledRoundedIcon from "@mui/icons-material/DirectionsCarFilledRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

import { Herotextfield } from "@/src/components/hero/Herotextfield";
import type { LocationOption } from "@/src/lib/rentflow-catalog";
import type { CarType } from "@/src/services/cars/cars.types";

type Props = {
  siteMode: "marketplace" | "storefront";
  heroImages: readonly string[];
  totalCars: number;
  totalLocations: number;
  location: string;
  setLocation: (v: string) => void;
  type: CarType | "All";
  setType: (v: CarType | "All") => void;
  pickupDate: string;
  setPickupDate: (v: string) => void;
  returnDate: string;
  setReturnDate: (v: string) => void;
  q: string;
  setQ: (v: string) => void;
  carTypes: readonly CarType[];
  locations: readonly LocationOption[];
};

const STOREFRONT_STATS = [
  {
    label: "พร้อมใช้งาน",
    accent: "รถที่อัปเดตจากฐานข้อมูล",
    Icon: DirectionsCarFilledRoundedIcon,
  },
  {
    label: "รับรถได้หลายจุด",
    accent: "เลือกสาขาได้ตามแผนเดินทาง",
    Icon: PinDropRoundedIcon,
  },
  {
    label: "คัดเฉพาะคันพร้อมจอง",
    accent: "โฟกัสรถที่เปิดให้เช่าจริง",
    Icon: VerifiedRoundedIcon,
  },
] as const;

export default function HeroSection({
  heroImages,
  totalCars,
  totalLocations,
  location,
  setLocation,
  type,
  setType,
  pickupDate,
  setPickupDate,
  returnDate,
  setReturnDate,
  q,
  setQ,
  carTypes,
  locations,
}: Props) {
  const router = useRouter();
  const primaryImage = heroImages[0] || "/RentFlow.png";
  const secondaryImage = heroImages[1] || primaryImage;

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (pickupDate) params.set("pickupDate", pickupDate);
    if (returnDate) params.set("returnDate", returnDate);
    if (q.trim()) params.set("q", q.trim());
    if (type && type !== "All") params.set("type", type);

    const query = params.toString();
    router.push(query ? `/cars?${query}` : "/cars");
  };

  return (
    <Box
      className="pb-12 pt-8 md:pb-16 md:pt-10"
      sx={{
        background:
          "radial-gradient(circle at top left, rgba(14, 165, 233, 0.12), transparent 26%), radial-gradient(circle at top right, rgba(251, 191, 36, 0.12), transparent 24%), linear-gradient(180deg, #f8fbff 0%, #ffffff 52%, #ffffff 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Box className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <Box>
            <Box className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              storefront ของร้านเดียว
            </Box>

            <Typography
              className="mt-5 max-w-3xl font-black tracking-tight text-slate-900"
              sx={{ fontSize: { xs: "34px", sm: "46px", md: "58px" }, lineHeight: 1.02 }}
            >
              เช่ารถจากร้านนี้
              <Box component="span" className="block text-sky-700">
                แบบเรียบง่ายและชัดเจน
              </Box>
            </Typography>

            <Typography className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              หน้า storefront จะโฟกัสเฉพาะรถของร้านเดียว ทำให้ลูกค้าเลือกคันที่ใช่
              เช็กสาขา และเริ่มจองได้เร็ว โดยไม่ต้องเสียสมาธิกับข้อมูลจากหลายร้าน
            </Typography>

            <Box className="mt-6 grid gap-3 sm:grid-cols-3">
              <Box className="rounded-[24px] border border-white bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.04)]">
                <Typography className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  รถพร้อมจอง
                </Typography>
                <Typography className="mt-2 text-3xl font-black text-slate-900">
                  {totalCars}
                </Typography>
              </Box>
              <Box className="rounded-[24px] border border-white bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.04)]">
                <Typography className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  จุดรับรถ
                </Typography>
                <Typography className="mt-2 text-3xl font-black text-slate-900">
                  {totalLocations}
                </Typography>
              </Box>
              <Box className="rounded-[24px] border border-white bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.04)]">
                <Typography className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  โฟกัส
                </Typography>
                <Typography className="mt-2 text-lg font-black text-slate-900">
                  ร้านเดียว
                </Typography>
              </Box>
            </Box>

            <Box className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                variant="contained"
                className="rounded-2xl! px-6 py-3 font-semibold!"
                sx={{
                  minHeight: 48,
                  textTransform: "none",
                  backgroundColor: "#0f172a",
                  "&:hover": { backgroundColor: "#020617" },
                }}
                endIcon={<ArrowOutwardRoundedIcon />}
                onClick={handleSearch}
              >
                ดูรถทั้งหมดของร้าน
              </Button>

              <Button
                variant="outlined"
                className="rounded-2xl! border-slate-300! px-6 py-3 text-slate-900!"
                sx={{ minHeight: 48, textTransform: "none" }}
                onClick={() =>
                  document
                    .getElementById("search")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              >
                ไปที่แบบฟอร์มค้นหา
              </Button>
            </Box>
          </Box>

          <Box className="grid gap-4">
            <Box className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-900 min-h-[380px]">
              <Image
                src={primaryImage}
                alt="Storefront hero"
                fill
                className="object-cover"
              />
              <Box className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
              <Box className="absolute inset-x-0 bottom-0 p-6">
                <Typography className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
                  storefront experience
                </Typography>
                <Typography className="mt-2 max-w-sm text-3xl font-black text-white">
                  ประสบการณ์แบบร้านเดียว
                  <Box component="span" className="block text-white/80">
                    โฟกัสง่าย ตัดสินใจเร็ว
                  </Box>
                </Typography>
              </Box>
            </Box>

            <Box className="grid gap-3 sm:grid-cols-3">
              {STOREFRONT_STATS.map((item) => (
                <Card
                  key={item.label}
                  elevation={0}
                  className="rounded-[24px]! border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.04)]"
                >
                  <CardContent className="p-4!">
                    <Box className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-900">
                      <item.Icon fontSize="small" />
                    </Box>
                    <Typography className="mt-3 text-sm font-bold text-slate-900">
                      {item.label}
                    </Typography>
                    <Typography className="mt-1 text-sm leading-6 text-slate-500">
                      {item.accent}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          id="search"
          className="mt-8 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.05)] md:p-6"
        >
          <Box className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <Box>
              <Typography className="text-xl font-black text-slate-900">
                ค้นหารถของร้านนี้
              </Typography>
              <Typography className="mt-1 text-sm text-slate-600">
                กรอกช่วงวัน ประเภทรถ และพื้นที่รับรถเพื่อดูคันที่พร้อมใช้งาน
              </Typography>
            </Box>
            <Box className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              ผลลัพธ์จะเป็นของร้านนี้เท่านั้น
            </Box>
          </Box>

          <Box className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <TextField
              select
              label="สาขารับรถ"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              sx={Herotextfield}
            >
              <MenuItem value="">ทุกสาขา</MenuItem>
              {locations.map((loc) => (
                <MenuItem key={loc.value} value={loc.value}>
                  {loc.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              type="date"
              label="วันรับรถ"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={Herotextfield}
            />

            <TextField
              type="date"
              label="วันคืนรถ"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={Herotextfield}
            />

            <TextField
              select
              label="ประเภทรถ"
              value={type}
              onChange={(e) => setType(e.target.value as CarType | "All")}
              fullWidth
              sx={Herotextfield}
            >
              <MenuItem value="All">ทั้งหมด</MenuItem>
              {carTypes.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="ค้นหาชื่อรุ่น"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="เช่น Yaris, Cross..."
              fullWidth
              sx={Herotextfield}
            />
          </Box>

          <Box className="mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <Box className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <Box className="relative h-12 w-16 overflow-hidden rounded-xl">
                <Image
                  src={secondaryImage}
                  alt="Storefront preview"
                  fill
                  className="object-cover"
                />
              </Box>
              ค้นหาแล้วระบบจะแสดงเฉพาะรถของร้านนี้ที่ตรงกับเงื่อนไข
            </Box>

            <Button
              size="large"
              variant="contained"
              className="rounded-2xl! px-6 py-3 font-semibold!"
              sx={{
                minHeight: 48,
                textTransform: "none",
                backgroundColor: "rgb(15 23 42)",
                "&:hover": {
                  backgroundColor: "rgb(2 6 23)",
                },
              }}
              onClick={handleSearch}
            >
              ค้นหารถว่าง
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
