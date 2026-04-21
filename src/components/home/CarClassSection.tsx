"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";

import SectionHeading from "@/src/components/common/SectionHeading";
import type { CatalogCarClass } from "@/src/lib/rentflow-catalog";

export default function CarClassSection({
  classes,
  loading = false,
}: {
  classes: CatalogCarClass[];
  loading?: boolean;
}) {
  return (
    <Box className="mb-8">
      <Container maxWidth="lg" className="py-4">
        <SectionHeading
          eyebrow="จัดกลุ่มตามคลาส"
          title="เริ่มต้นจากคลาสรถที่ตรงกับงบและสไตล์ทริป"
          description="ถ้ายังไม่รู้จะเลือกคันไหน ลองเริ่มจากคลาสรถก่อน แล้วค่อยดูรายการในหมวดนั้นต่อ"
        />

        <Box className="mt-8 grid gap-4 rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.04)] sm:grid-cols-2 lg:grid-cols-4">
          {loading && !classes.length ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Box
                key={`class-skeleton-${index}`}
                className="h-56 rounded-[24px] border border-slate-200 bg-slate-50"
              />
            ))
          ) : classes.length ? (
            classes.map((x) => (
              <Card
                key={x.slug}
                component={Link}
                href={`/classes/${x.slug}`}
                elevation={0}
                sx={{ boxShadow: "none" }}
                className="group cursor-pointer overflow-hidden rounded-[24px]! border border-slate-200! bg-white! hover:border-slate-300!"
              >
                <Box className="relative h-36 w-full overflow-hidden">
                  <Image
                    src={x.image}
                    alt={x.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Box className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />
                </Box>

                <CardContent className="p-5">
                  <Box className="flex items-start justify-between gap-2">
                    <Box>
                      <Typography className="text-sm font-semibold text-slate-900">
                        {x.title}
                      </Typography>
                      <Typography className="mt-1 text-xs text-slate-500">
                        รถในคลาสนี้ {x.count} คัน
                      </Typography>
                    </Box>

                    <Chip
                      size="small"
                      label={x.tag}
                      className="bg-indigo-500/10! text-indigo-700! border border-indigo-200!"
                    />
                  </Box>

                  <Typography className="mt-1 text-xs text-slate-600">
                    {x.desc}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Box className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600 sm:col-span-2 lg:col-span-4">
              ยังไม่มีการจัดกลุ่มคลาสจากข้อมูลรถในฐานข้อมูล
            </Box>
          )}
        </Box>
        <Divider className="my-6! border-slate-200!" />
      </Container>
    </Box>
  );
}
