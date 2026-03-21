"use client";

import * as React from "react";
import { Box, Container, Typography, Divider } from "@mui/material";
import MyBookingsFilters from "@/src/components/my-bookings/MyBookingsFilters";
import MyBookingsList from "@/src/components/my-bookings/MyBookingsList";
import MyBookingsPageSkeleton from "@/src/components/my-bookings/MyBookingsPageSkeleton";
import useMyBookingsPage from "@/src/hooks/my-bookings/useMyBookingsPage";

export default function MyBookingsPage() {
  const bookings = useMyBookingsPage();

  if (!bookings.ready || bookings.isCheckingAuth || !bookings.isAuthenticated) {
    return <MyBookingsPageSkeleton />;
  }

  return (
    <Container maxWidth="lg" className="py-12">
      <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Box className="flex flex-col gap-2">
          <Typography
            variant="h5"
            className="text-2xl font-bold text-slate-900"
          >
            การจองของฉัน
          </Typography>
          <Typography className="text-sm text-slate-600">
            ดูสถานะการจอง ยอดรวม และรายละเอียดการรับ-คืนรถ
          </Typography>
        </Box>
      </Box>

      <Box className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
        <MyBookingsFilters
          q={bookings.q}
          onQChange={bookings.setQ}
          status={bookings.status}
          onStatusChange={bookings.setStatus}
        />

        <Divider className="my-5! border-slate-200!" />

        <MyBookingsList
          data={bookings.data}
          onReset={bookings.handleReset}
        />
      </Box>
    </Container>
  );
}