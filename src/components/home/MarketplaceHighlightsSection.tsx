"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import DirectionsCarFilledRoundedIcon from "@mui/icons-material/DirectionsCarFilledRounded";

import type { MarketplaceHeroShop } from "@/src/components/home/MarketplaceHeroSection";

type Props = {
  shops: readonly MarketplaceHeroShop[];
  locations: readonly string[];
  carTypes: readonly string[];
};

export default function MarketplaceHighlightsSection({
  shops,
  locations,
  carTypes,
}: Props) {
  const shopChips = shops.slice(0, 6);
  const locationChips = locations.slice(0, 8);

  return (
    <Container maxWidth="lg" className="py-4">
      <Box className="grid gap-4 lg:grid-cols-3">
        <Card
          elevation={0}
          className="rounded-[28px]! border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
        >
          <CardContent className="p-6!">
            <Box className="flex items-center gap-3">
              <Box className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-100 text-amber-700">
                <StorefrontRoundedIcon />
              </Box>
              <Box>
                <Typography className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  ร้านที่กำลังออนไลน์
                </Typography>
                <Typography className="text-xl font-black text-slate-900">
                  เลือกจากแบรนด์ที่ต่างกันได้เลย
                </Typography>
              </Box>
            </Box>

            <Box className="mt-5 flex flex-wrap gap-2">
              {shopChips.length ? (
                shopChips.map((shop, index) => (
                  <Chip
                    key={shop.slug || `${shop.name}-${index}`}
                    label={`${shop.name} • ${shop.carCount} คัน`}
                    className="border border-slate-200! bg-slate-50! text-slate-700!"
                  />
                ))
              ) : (
                <Typography className="text-sm text-slate-500">
                  เมื่อมีข้อมูลหลายร้าน ระบบจะแสดงร้านที่พร้อมให้เช่าตรงนี้
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          className="rounded-[28px]! border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
        >
          <CardContent className="p-6!">
            <Box className="flex items-center gap-3">
              <Box className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
                <PinDropRoundedIcon />
              </Box>
              <Box>
                <Typography className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  โซนที่ค้นหาได้
                </Typography>
                <Typography className="text-xl font-black text-slate-900">
                  ใช้พื้นที่ช่วยตัดสินใจได้เร็วขึ้น
                </Typography>
              </Box>
            </Box>

            <Box className="mt-5 flex flex-wrap gap-2">
              {locationChips.length ? (
                locationChips.map((location) => (
                  <Chip
                    key={location}
                    label={location}
                    className="border border-slate-200! bg-slate-50! text-slate-700!"
                  />
                ))
              ) : (
                <Typography className="text-sm text-slate-500">
                  เมื่อมีการตั้งสาขาจากร้านต่าง ๆ รายการพื้นที่จะขึ้นตรงนี้
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          className="rounded-[28px]! border border-slate-200 bg-slate-900 text-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
        >
          <CardContent className="p-6!">
            <Box className="flex items-center gap-3">
              <Box className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white">
                <DirectionsCarFilledRoundedIcon />
              </Box>
              <Box>
                <Typography className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                  ประเภทรถที่พร้อมให้เลือก
                </Typography>
                <Typography className="text-xl font-black text-white">
                  โหมดรวมเน้นการค้นหาและเทียบก่อนจอง
                </Typography>
              </Box>
            </Box>

            <Box className="mt-5 flex flex-wrap gap-2">
              {carTypes.length ? (
                carTypes.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    className="border border-white/15! bg-white/10! text-white!"
                  />
                ))
              ) : (
                <Typography className="text-sm text-white/70">
                  ประเภทรถจะขึ้นตามข้อมูลที่เพิ่มเข้ามาจากร้านต่าง ๆ
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
