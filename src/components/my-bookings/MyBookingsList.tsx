"use client";

import * as React from "react";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import { formatTHB } from "@/src/constants/money";
import type { Booking } from "@/src/hooks/my-bookings/useMyBookingsPage";
import StatusChip from "./StatusChip";

type Props = {
  data: Booking[];
  onReset: () => void;
};

export default function MyBookingsList({ data, onReset }: Props) {
  if (data.length === 0) {
    return (
      <Box className="rounded-2xl! border border-slate-200 bg-slate-50 p-8 text-center">
        <Typography className="text-sm font-semibold text-slate-900">
          ไม่พบรายการจอง
        </Typography>
        <Typography className="mt-1 text-sm text-slate-600">
          ลองเปลี่ยนคำค้นหา หรือเลือกสถานะอื่น
        </Typography>

        <Button
          variant="outlined"
          className="mt-4! rounded-xl!"
          sx={{ textTransform: "none" }}
          onClick={onReset}
        >
          รีเซ็ตตัวกรอง
        </Button>
      </Box>
    );
  }

  return (
    <Box className="space-y-4">
      {data.map((b) => (
        <Box
          key={b.id}
          className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-400"
        >
          <Box className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Box className="min-w-0">
              <Typography className="truncate text-sm font-semibold text-slate-900">
                {b.carName} <span className="text-slate-400">•</span>{" "}
                <span className="text-slate-600">{b.id}</span>
              </Typography>

              <Typography className="mt-1 text-xs text-slate-600">
                รับรถ:{" "}
                <span className="font-semibold text-slate-900">
                  {b.pickupDate}
                </span>{" "}
                • คืนรถ:{" "}
                <span className="font-semibold text-slate-900">
                  {b.returnDate}
                </span>
              </Typography>
            </Box>

            <Box className="flex flex-wrap items-center gap-4! md:gap-2">
              <StatusChip s={b.status} />

              <Box className="flex items-center justify-between gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <Typography className="text-sm! text-slate-500">
                  ยอดรวม
                </Typography>
                <Typography className="text-sm! font-bold text-slate-900">
                  {formatTHB(b.totalPrice)}
                </Typography>
              </Box>

              <Button
                component={Link}
                href={`/my-bookings/${encodeURIComponent(b.id)}`}
                variant="outlined"
                className="rounded-xl!"
                sx={{ textTransform: "none" }}
              >
                ดูรายละเอียด
              </Button>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
