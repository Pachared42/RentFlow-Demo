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
} from "@mui/material";
import type { Car } from "@/src/constants/cars";
import type { CarClass } from "@/src/constants/classesCar";
import { formatTHB } from "@/src/constants/money";

function badgeStyle(badge: string) {
  const b = badge.toLowerCase();

  if (b.includes("ใหม่") || b.includes("new")) {
    return "border-emerald-300! text-emerald-700! bg-emerald-50!";
  }
  if (b.includes("นิยม") || b.includes("hot") || b.includes("ขายดี")) {
    return "border-orange-300! text-orange-700! bg-orange-50!";
  }
  if (b.includes("โปร") || b.includes("deal") || b.includes("ลด")) {
    return "border-blue-300! text-blue-700! bg-blue-50!";
  }

  return "border-slate-300! text-slate-700! bg-white!";
}

export default function ClassClient({
  meta,
  cars,
}: {
  meta: CarClass;
  cars: Car[];
}) {
  return (
    <Box className="min-h-screen bg-white text-slate-900">
      <Container maxWidth="lg" className="py-10">
        <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Box className="flex flex-col gap-2">
            <Box>
              <Box className="flex items-center gap-2">
                <Typography
                  variant="h5"
                  className="text-2xl font-bold text-slate-900"
                >
                  รถ{meta.title}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((c) => (
            <Card
              key={c.id}
              elevation={0}
              sx={{ boxShadow: "none" }}
              className="group bg-white border border-slate-200 rounded-2xl! transition hover:border-slate-400!"
            >
              {/* IMAGE */}
              <Box className="relative h-52 w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={c.image || "/cars/placeholder.jpg"}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Box>

              <CardContent className="p-6">
                <Box className="flex items-start justify-between gap-3">
                  <Box className="min-w-0">
                    <Typography className="truncate text-lg font-semibold text-slate-900">
                      {c.name}
                    </Typography>
                    <Typography className="text-sm text-slate-600">
                      {c.type} • {c.seats} ที่นั่ง • {c.transmission} • {c.fuel}
                    </Typography>
                  </Box>

                  {c.badge ? (
                    <Chip
                      label={c.badge}
                      size="small"
                      variant="outlined"
                      className={`border! ${badgeStyle(c.badge)}`}
                    />
                  ) : null}
                </Box>

                <Box className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <Box className="flex items-end gap-2">
                    <Typography className="text-sm text-slate-600">
                      ราคาเริ่มต้น
                    </Typography>

                    <Typography className="text-2xl font-extrabold text-slate-900">
                      {formatTHB(c.pricePerDay)}
                    </Typography>

                    <Typography className="text-sm text-slate-600">
                      /วัน
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

              <CardActions sx={{ p: "0px 16px 16px" }} className="gap-2">
                <Button
                  component={Link}
                  href={`/cars/${encodeURIComponent(String(c.id))}`}
                  variant="outlined"
                  fullWidth
                  className="rounded-xl! border-slate-300! text-slate-900!"
                  sx={{ textTransform: "none" }}
                >
                  ดูรายละเอียด
                </Button>

                <Button
                  component={Link}
                  href={`/booking?carId=${encodeURIComponent(String(c.id))}`}
                  variant="contained"
                  fullWidth
                  className="rounded-xl! font-semibold!"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "rgb(15 23 42)",
                  }}
                >
                  จองเลย
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
