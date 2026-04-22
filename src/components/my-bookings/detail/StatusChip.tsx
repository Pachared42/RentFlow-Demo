"use client";

import { Chip } from "@mui/material";
import type { BookingStatus } from "@/src/services/booking/booking.types";
import { BOOKING_STATUS_CHIP_MAP } from "@/src/components/my-bookings/status-chip.config";

export default function StatusChip({ s }: { s: BookingStatus }) {
  const v = BOOKING_STATUS_CHIP_MAP[s];

  return (
    <Chip
      size="medium"
      label={v.label}
      className={v.className}
    />
  );
}
