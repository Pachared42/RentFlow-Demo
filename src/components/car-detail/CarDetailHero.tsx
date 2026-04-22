"use client";

import * as React from "react";
import Image from "next/image";
import { Box, Chip, Typography } from "@mui/material";

type Props = {
  image?: string;
  name: string;
  isAvailable?: boolean;
};

export default function CarDetailHero({ image, name, isAvailable = true }: Props) {
  return (
    <Box className="lg:col-span-7">
      <Box className="apple-card relative overflow-hidden">
        <Box className="relative aspect-16/10">
          <Image
            src={image || "/RentFlow.png"}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        </Box>

        <Box className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
        {!isAvailable ? (
          <>
            <Box className="absolute left-5 top-5 z-[1]">
              <Chip
                label="มีการจองแล้ว"
                className="apple-pill bg-white/94! font-bold! text-[var(--rf-apple-ink)]!"
              />
            </Box>
            <Box className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-5">
              <Typography className="text-base font-semibold text-white">
                รถคันนี้มีการจองแล้ว ยังไม่สามารถกดจองได้ในตอนนี้
              </Typography>
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
}
