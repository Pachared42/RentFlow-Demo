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

import type { CatalogCarClass } from "@/src/lib/rentflow-catalog";

export default function CarClassSection({
  classes,
  loading = false,
}: {
  classes: CatalogCarClass[];
  loading?: boolean;
}) {
  return (
    <Box>
      <Container maxWidth="lg" className="apple-section pt-0!">
        <Box className="mx-auto max-w-3xl text-center">
          <Box>
            <Typography
              className="apple-heading"
              sx={{ fontSize: { xs: 38, md: 56 } }}
            >
              เลือกตามคลาสรถ
            </Typography>
            <Typography className="apple-subtitle mt-2 text-lg">
              กดการ์ดเพื่อไปหน้ารถตามคลาส
            </Typography>
          </Box>
        </Box>

        <Box className="apple-card mt-10 grid gap-5 p-5 sm:grid-cols-2 md:p-7 lg:grid-cols-4">
          {loading && !classes.length ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Box
                key={`class-skeleton-${index}`}
                className="h-56 rounded-[26px] bg-[var(--rf-apple-surface-soft)]"
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
                className="group cursor-pointer overflow-hidden rounded-[var(--rf-apple-card-radius-sm)]! border-0! bg-[var(--rf-apple-surface-soft)]! transition-transform duration-1000 ease-[cubic-bezier(0.18,0.9,0.22,1)] hover:scale-[1.006]"
              >
                <Box className="relative h-36 w-full overflow-hidden">
                  <Image
                    src={x.image}
                    alt={x.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.18,0.9,0.22,1)] group-hover:scale-[1.012]"
                  />
                  <Box className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />
                </Box>

                <CardContent className="p-5">
                  <Box className="flex items-start justify-between gap-2">
                    <Box>
                      <Typography className="text-base font-bold tracking-[-0.03em] text-[var(--rf-apple-ink)]">
                        {x.title}
                      </Typography>
                      <Typography className="mt-1 text-xs text-[var(--rf-apple-muted)]">
                        รถในคลาสนี้ {x.count} คัน
                      </Typography>
                    </Box>

                    <Chip
                      size="small"
                      label={x.tag}
                      className="bg-white! text-[var(--rf-apple-blue)]!"
                    />
                  </Box>

                  <Typography className="mt-2 text-xs leading-5 text-[var(--rf-apple-muted)]">
                    {x.desc}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Box className="flex min-h-40 items-center justify-center rounded-[26px] border border-dashed border-black/10 bg-[var(--rf-apple-surface-soft)] px-8 py-12 text-center sm:col-span-2 md:min-h-48 md:px-12 lg:col-span-4">
              <Typography className="text-base font-semibold text-[var(--rf-apple-muted)] md:text-lg">
                ยังไม่มีการจัดกลุ่มคลาสรถในตอนนี้
              </Typography>
            </Box>
          )}
        </Box>
        <Divider className="mt-14! border-black/10!" />
      </Container>
    </Box>
  );
}
