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
  CardActions,
  Button,
  Chip,
  Divider,
} from "@mui/material";

import type { Car } from "@/src/services/cars/cars.types";

type Props = {
  cars: Car[];
  formatTHB: (n: number) => string;
};

export default function CarsSection({ cars, formatTHB }: Props) {
  return (
    <Container maxWidth="lg" className="apple-section">
      <Box className="flex flex-col gap-4 text-center sm:items-center">
        <Box>
          <Typography
            className="apple-heading"
            sx={{ fontSize: { xs: 38, md: 56 } }}
          >
            รถแนะนำ
          </Typography>
          <Typography className="apple-subtitle mt-2 text-lg">
            เลือกคันที่ใช่ แล้วกดจองได้เลย
          </Typography>
        </Box>

        <Chip
          label={`${cars.length} คัน`}
          className="apple-pill w-min! text-[var(--rf-apple-muted)]!"
        />
      </Box>

      <Box className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cars.length ? (
          cars.map((c) => (
            <Card
              key={c.id}
              elevation={0}
              sx={{ boxShadow: "none" }}
              className="apple-card group"
            >
              <Box className="relative h-56 w-full overflow-hidden bg-[var(--rf-apple-surface-soft)]">
                <Image
                  src={c.image || "/RentFlow.png"}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.18,0.9,0.22,1)] group-hover:scale-[1.012]"
                />
              </Box>

              <CardContent className="p-6">
                <Box className="flex items-start justify-between gap-3">
                  <Box>
                    <Typography className="text-xl font-bold tracking-[-0.03em] text-[var(--rf-apple-ink)]">
                      {c.name}
                    </Typography>
                    <Typography className="mt-1 text-sm text-[var(--rf-apple-muted)]">
                      {c.type} • {c.seats} ที่นั่ง • {c.transmission} • {c.fuel}
                    </Typography>
                  </Box>
                </Box>

                <Box className="mt-5 rounded-[22px] bg-[var(--rf-apple-surface-soft)] p-4">
                  <Box className="flex items-end gap-2">
                    <Typography className="text-sm text-[var(--rf-apple-muted)]">
                      ราคาเริ่มต้น
                    </Typography>

                    <Typography className="text-2xl font-extrabold tracking-[-0.04em] text-[var(--rf-apple-ink)]">
                      {formatTHB(c.pricePerDay)}
                    </Typography>

                    <Typography className="text-sm text-[var(--rf-apple-muted)]">
                      /วัน
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

              <CardActions sx={{ p: "0px 16px 16px" }} className="gap-2">
                <Button
                  component={Link}
                  href={`/cars/${c.id}`}
                  variant="outlined"
                  fullWidth
                  className="rounded-full!"
                >
                  ดูรายละเอียด
                </Button>

                <Button
                  component={Link}
                  href={`/booking?carId=${c.id}`}
                  variant="contained"
                  fullWidth
                  className="rounded-full! font-semibold!"
                >
                  จองเลย
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Box className="flex min-h-48 items-center justify-center rounded-[30px] border border-dashed border-black/10 bg-white px-8 py-12 text-center md:col-span-2 md:px-12 lg:col-span-3">
            <Typography className="text-base font-semibold text-[var(--rf-apple-muted)] md:text-lg">
              ยังไม่มีรถแนะนำในตอนนี้
            </Typography>
          </Box>
        )}
      </Box>
      <Divider className="mt-14! border-black/10!" />
    </Container>
  );
}
