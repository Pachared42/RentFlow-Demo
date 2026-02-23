"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Chip,
  Divider,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { formatTHB } from "@/src/constants/money";

type BookingStatus = "pending" | "confirmed" | "cancelled";

type Booking = {
  id: string;
  carName: string;
  pickupDate: string;
  returnDate: string;
  totalPrice: number;
  status: BookingStatus;
};

const SEED: Booking[] = [
  {
    id: "BK-1001",
    carName: "BMW 320d M Sport",
    pickupDate: "2026-03-01",
    returnDate: "2026-03-03",
    totalPrice: 1290 * 2,
    status: "confirmed",
  },
  {
    id: "BK-1002",
    carName: "BMW 330e M Sport",
    pickupDate: "2026-03-02",
    returnDate: "2026-03-04",
    totalPrice: 1490 * 2,
    status: "pending",
  },
  {
    id: "BK-1003",
    carName: "BMW M3 CS",
    pickupDate: "2026-03-03",
    returnDate: "2026-03-05",
    totalPrice: 1990 * 2,
    status: "confirmed",
  },
  {
    id: "BK-1004",
    carName: "BMW i5 eDrive40 M Sport",
    pickupDate: "2026-03-04",
    returnDate: "2026-03-06",
    totalPrice: 1590 * 2,
    status: "pending",
  },
  {
    id: "BK-1005",
    carName: "BMW i5 M60 xDrive",
    pickupDate: "2026-03-05",
    returnDate: "2026-03-07",
    totalPrice: 1790 * 2,
    status: "confirmed",
  },
  {
    id: "BK-1006",
    carName: "BMW i7 xDrive60 M Sport",
    pickupDate: "2026-03-06",
    returnDate: "2026-03-08",
    totalPrice: 1890 * 2,
    status: "pending",
  },
];

function StatusChip({ s }: { s: BookingStatus }) {
  const map: Record<BookingStatus, { label: string; className: string }> = {
    pending: {
      label: "รอดำเนินการ",
      className: "!bg-amber-50 !text-amber-700 !border-amber-200",
    },
    confirmed: {
      label: "ยืนยันแล้ว",
      className: "!bg-emerald-50 !text-emerald-700 !border-emerald-200",
    },
    cancelled: {
      label: "ยกเลิก",
      className: "!bg-rose-50 !text-rose-700 !border-rose-200",
    },
  };
  const v = map[s];
  return (
    <Chip
      size="small"
      label={v.label}
      variant="outlined"
      className={v.className}
    />
  );
}

export default function MyBookingsPage() {
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState<BookingStatus | "all">("all");

  const data = React.useMemo(() => {
    return SEED.filter((b) => {
      const s = q.trim().toLowerCase();
      const matchQ =
        !s ||
        b.id.toLowerCase().includes(s) ||
        b.carName.toLowerCase().includes(s);
      const matchS = status === "all" ? true : b.status === status;
      return matchQ && matchS;
    });
  }, [q, status]);

  return (
    <Container maxWidth="lg" className="py-12">
      {/* Top bar */}
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

      {/* Filters */}
      <Box className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
        <Box className="grid gap-4 md:grid-cols-12 md:items-center">
          <Box className="md:col-span-8">
            <TextField
              label="ค้นหา (รหัส/ชื่อรถ)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              size="small"
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
          </Box>

          <Box className="md:col-span-4">
            <TextField
              select
              label="สถานะ"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              size="small"
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            >
              <MenuItem value="all">ทั้งหมด</MenuItem>
              <MenuItem value="pending">รอดำเนินการ</MenuItem>
              <MenuItem value="confirmed">ยืนยันแล้ว</MenuItem>
              <MenuItem value="cancelled">ยกเลิก</MenuItem>
            </TextField>
          </Box>
        </Box>

        <Divider className="my-5! border-slate-200!" />

        {/* List */}
        {data.length === 0 ? (
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
              onClick={() => {
                setQ("");
                setStatus("all");
              }}
            >
              รีเซ็ตตัวกรอง
            </Button>
          </Box>
        ) : (
          <Box className="space-y-4">
            {data.map((b) => (
              <Box
                key={b.id}
                className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-400"
              >
                <Box className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  {/* Left */}
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

                  {/* Right */}
                  <Box className="flex flex-wrap items-center gap-4! md:gap-2">
                    <StatusChip s={b.status} />
                    <Box className="flex items-center gap-1 justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
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
                      disabled={b.status !== "confirmed"}
                    >
                      ดูรายละเอียด
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}
