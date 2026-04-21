"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

import { Herotextfield } from "@/src/components/hero/Herotextfield";
import type { LocationOption } from "@/src/lib/rentflow-catalog";
import type { CarType } from "@/src/services/cars/cars.types";

export type MarketplaceHeroShop = {
  name: string;
  slug?: string;
  carCount: number;
  minPrice: number | null;
  leadImage?: string;
};

type Props = {
  heroImages: readonly string[];
  featuredShops: readonly MarketplaceHeroShop[];
  totalCars: number;
  totalShops: number;
  totalLocations: number;
  location: string;
  setLocation: (value: string) => void;
  type: CarType | "All";
  setType: (value: CarType | "All") => void;
  pickupDate: string;
  setPickupDate: (value: string) => void;
  returnDate: string;
  setReturnDate: (value: string) => void;
  q: string;
  setQ: (value: string) => void;
  carTypes: readonly CarType[];
  locations: readonly LocationOption[];
};

function formatCompactPrice(value: number | null) {
  if (!value || Number.isNaN(value)) {
    return "เช็กราคาในหน้ารายการ";
  }

  return `เริ่ม ${new Intl.NumberFormat("th-TH").format(value)} บาท/วัน`;
}

export default function MarketplaceHeroSection({
  heroImages,
  featuredShops,
  totalCars,
  totalShops,
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
  const heroImage = heroImages[0] || "/RentFlow.png";
  const topShops = featuredShops.slice(0, 3);

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
          "radial-gradient(circle at top left, rgba(245, 158, 11, 0.16), transparent 30%), radial-gradient(circle at top right, rgba(14, 165, 233, 0.12), transparent 28%), linear-gradient(180deg, #fff9f1 0%, #ffffff 54%, #ffffff 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Box className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <Box>
            <Box className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
              <TravelExploreRoundedIcon sx={{ fontSize: 16 }} />
              marketplace รวมหลายร้าน
            </Box>

            <Typography
              className="mt-5 max-w-3xl font-black tracking-tight text-slate-900"
              sx={{ fontSize: { xs: "34px", sm: "46px", md: "58px" }, lineHeight: 1.02 }}
            >
              เปรียบเทียบรถจากหลายร้าน
              <Box component="span" className="block text-amber-700">
                แล้วจองใน flow เดียว
              </Box>
            </Typography>

            <Typography className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              หน้า marketplace ถูกจัดให้เป็นเว็บรวมทุกร้านโดยเฉพาะ
              ลูกค้าจะเห็นชื่อร้านบนผลลัพธ์ทุกคัน ทำให้ตัดสินใจจากราคา
              พื้นที่ และสไตล์ของแต่ละร้านได้ง่ายขึ้น
            </Typography>

            <Box className="mt-6 grid gap-3 sm:grid-cols-3">
              <Box className="rounded-[24px] border border-white bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.04)]">
                <Box className="flex items-center gap-3">
                  <Box className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-100 text-amber-700">
                    <StorefrontRoundedIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      ร้านในระบบ
                    </Typography>
                    <Typography className="text-2xl font-black text-slate-900">
                      {totalShops}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box className="rounded-[24px] border border-white bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.04)]">
                <Box className="flex items-center gap-3">
                  <Box className="grid h-10 w-10 place-items-center rounded-2xl bg-sky-100 text-sky-700">
                    <LocalOfferRoundedIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      รถพร้อมจอง
                    </Typography>
                    <Typography className="text-2xl font-black text-slate-900">
                      {totalCars}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box className="rounded-[24px] border border-white bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.04)]">
                <Box className="flex items-center gap-3">
                  <Box className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <PinDropRoundedIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      จุดรับรถ
                    </Typography>
                    <Typography className="text-2xl font-black text-slate-900">
                      {totalLocations}
                    </Typography>
                  </Box>
                </Box>
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
                เริ่มดูรถจากทุกร้าน
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
                ไปที่ตัวกรองหลัก
              </Button>
            </Box>
          </Box>

          <Box className="grid gap-4">
            <Box className="relative min-h-[380px] overflow-hidden rounded-[32px] border border-slate-200 bg-slate-900">
              <Image
                src={heroImage}
                alt="Marketplace hero"
                fill
                className="object-cover"
              />
              <Box className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
              <Box className="absolute inset-x-0 bottom-0 p-6">
                <Typography className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
                  marketplace experience
                </Typography>
                <Typography className="mt-2 max-w-sm text-3xl font-black text-white">
                  รายการรถแบบรวม
                  <Box component="span" className="block text-white/80">
                    แต่ยังรู้ชัดว่าเป็นของร้านไหน
                  </Box>
                </Typography>
              </Box>
            </Box>

            <Box className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
              <Typography className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                ร้านเด่นในระบบ
              </Typography>
              <Typography className="mt-2 text-xl font-black text-slate-900">
                เลือกจากร้านที่มีสไตล์ต่างกัน
              </Typography>

              <Box className="mt-4 grid gap-3">
                {topShops.length ? (
                  topShops.map((shop, index) => (
                    <Box
                      key={shop.slug || `${shop.name}-${index}`}
                      className="grid gap-3 rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 md:grid-cols-[auto_1fr_auto]"
                    >
                      <Box className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-sm font-black text-slate-900 shadow-sm">
                        {index + 1}
                      </Box>
                      <Box>
                        <Typography className="text-sm font-bold text-slate-900">
                          {shop.name}
                        </Typography>
                        <Typography className="mt-1 text-sm text-slate-500">
                          {shop.carCount} คันในระบบ
                          {shop.slug ? ` • ${shop.slug}.rentflow.com` : ""}
                        </Typography>
                      </Box>
                      <Typography className="text-sm font-semibold text-amber-700 md:text-right">
                        {formatCompactPrice(shop.minPrice)}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Box className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                    เมื่อมีหลายร้านในระบบ ส่วนนี้จะแสดงร้านเด่นให้อัตโนมัติ
                  </Box>
                )}
              </Box>
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
                ค้นหารถจากหลายร้าน
              </Typography>
              <Typography className="mt-1 text-sm text-slate-600">
                ระบบจะรวมผลลัพธ์จากหลายร้านและแสดงชื่อร้านบนรายการรถทุกคัน
              </Typography>
            </Box>
            <Box className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
              เหมาะสำหรับเทียบราคาและร้านในหน้าเดียว
            </Box>
          </Box>

          <Box className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <TextField
              label="ค้นหารถหรือร้าน"
              value={q}
              onChange={(event) => setQ(event.target.value)}
              fullWidth
              sx={Herotextfield}
            />

            <TextField
              select
              label="พื้นที่รับรถ"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
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
              select
              label="ประเภทรถ"
              value={type}
              onChange={(event) =>
                setType(event.target.value as CarType | "All")
              }
              fullWidth
              sx={Herotextfield}
            >
              <MenuItem value="All">ทุกประเภท</MenuItem>
              {carTypes.map((carType) => (
                <MenuItem key={carType} value={carType}>
                  {carType}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              type="date"
              label="วันรับรถ"
              value={pickupDate}
              onChange={(event) => setPickupDate(event.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={Herotextfield}
            />

            <TextField
              type="date"
              label="วันคืนรถ"
              value={returnDate}
              onChange={(event) => setReturnDate(event.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={Herotextfield}
            />
          </Box>

          <Box className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Typography className="text-sm text-slate-500">
              หลังค้นหาแล้ว คุณจะเห็นผลลัพธ์รวมที่มีชื่อร้าน ราคา และสาขาอยู่ในหน้าเดียวกัน
            </Typography>

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
              ค้นหารถใน marketplace
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
