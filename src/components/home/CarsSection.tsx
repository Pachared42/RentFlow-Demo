"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Button,
  Chip,
  Divider,
} from "@mui/material";

import SectionHeading from "@/src/components/common/SectionHeading";
import CarCard from "@/src/components/cars/CarCard";
import type { Car } from "@/src/services/cars/cars.types";

type Props = {
  cars: Car[];
  siteMode?: "marketplace" | "storefront";
};

export default function CarsSection({
  cars,
  siteMode = "storefront",
}: Props) {
  return (
    <Container maxWidth="lg" className="py-4">
      <SectionHeading
        eyebrow={siteMode === "marketplace" ? "รายการเด่นจากหลายร้าน" : "รถแนะนำของร้าน"}
        title={siteMode === "marketplace" ? "เริ่มดูรถยอดนิยมจากหน้า marketplace" : "เลือกรถที่เหมาะกับทริปของคุณ"}
        description={
          siteMode === "marketplace"
            ? "การ์ดทุกใบจะแสดงชื่อร้านชัดเจน เพื่อให้เปรียบเทียบแล้วกดจองต่อได้ทันที"
            : "หน้า storefront จะเน้นรถของร้านเดียว เพื่อให้ตัดสินใจและเริ่มจองได้เร็วขึ้น"
        }
        tone={siteMode === "marketplace" ? "marketplace" : "default"}
        action={
          <Box className="flex items-center gap-2">
            <Chip
              label={`${cars.length} คัน`}
              className="bg-slate-900/5! text-slate-700! border border-slate-200!"
            />
            <Button
              component={Link}
              href="/cars"
              variant="outlined"
              className="rounded-full! border-slate-300! text-slate-900!"
              sx={{ textTransform: "none" }}
            >
              ดูทั้งหมด
            </Button>
          </Box>
        }
      />

      <Box className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cars.length ? (
          cars.map((car) => <CarCard key={car.id} car={car} />)
        ) : (
          <Box className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600 md:col-span-2 xl:col-span-3">
            ยังไม่มีรถแนะนำจากฐานข้อมูลในตอนนี้
          </Box>
        )}
      </Box>
      <Divider className="my-6! border-slate-200!" />
    </Container>
  );
}
