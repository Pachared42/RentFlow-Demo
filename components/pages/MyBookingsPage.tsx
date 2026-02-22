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
        carName: "Toyota Yaris",
        pickupDate: "2026-03-01",
        returnDate: "2026-03-03",
        totalPrice: 3600,
        status: "confirmed",
    },
    {
        id: "BK-1002",
        carName: "Honda City",
        pickupDate: "2026-03-10",
        returnDate: "2026-03-11",
        totalPrice: 1500,
        status: "pending",
    },
];

function toTHBText(n: number) {
    return `${Math.max(0, Math.round(n)).toLocaleString("th-TH")} บาท`;
}

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
    return <Chip size="small" label={v.label} variant="outlined" className={v.className} />;
}

export default function MyBookingsPage() {
    const [q, setQ] = React.useState("");
    const [status, setStatus] = React.useState<BookingStatus | "all">("all");

    const inputSX = React.useMemo(
        () => ({
            "& .MuiOutlinedInput-root": { borderRadius: "14px" },
        }),
        []
    );

    const data = React.useMemo(() => {
        return SEED.filter((b) => {
            const s = q.trim().toLowerCase();
            const matchQ =
                !s || b.id.toLowerCase().includes(s) || b.carName.toLowerCase().includes(s);
            const matchS = status === "all" ? true : b.status === status;
            return matchQ && matchS;
        });
    }, [q, status]);

    return (
        <Container maxWidth="lg" className="py-12">
            {/* Top bar */}
            <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Box className="flex flex-col gap-2">
                    <Typography variant="h5" className="text-2xl font-bold text-slate-900">การจองของฉัน</Typography>
                    <Typography className="text-sm text-slate-600">
                        ดูสถานะการจอง ยอดรวม และรายละเอียดการรับ-คืนรถ
                    </Typography>
                </Box>

                <Button
                    component={Link}
                    href="/"
                    variant="outlined"
                    className="rounded-xl! border-slate-300! text-slate-900!"
                    sx={{ textTransform: "none" }}
                >
                    กลับหน้าแรก
                </Button>
            </Box>

            {/* Filters */}
            <Box className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                <Box className="grid gap-3 md:grid-cols-12 md:items-center">
                    <Box className="md:col-span-8">
                        <TextField
                            label="ค้นหา (รหัส/ชื่อรถ)"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            size="small"
                            fullWidth
                            sx={inputSX}
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
                            sx={inputSX}
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
                    <Box className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
                        <Typography className="text-sm font-semibold text-slate-900">ไม่พบรายการจอง</Typography>
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
                    <Box className="space-y-3">
                        {data.map((b) => (
                            <Box
                                key={b.id}
                                className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-400 hover:shadow-sm"
                            >
                                <Box className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    {/* Left */}
                                    <Box className="min-w-0">
                                        <Typography className="truncate text-sm font-semibold text-slate-900">
                                            {b.carName} <span className="text-slate-400">•</span>{" "}
                                            <span className="text-slate-600">{b.id}</span>
                                        </Typography>
                                        <Typography className="mt-1 text-xs text-slate-600">
                                            รับรถ: <span className="font-semibold text-slate-900">{b.pickupDate}</span>{" "}
                                            • คืนรถ: <span className="font-semibold text-slate-900">{b.returnDate}</span>
                                        </Typography>
                                    </Box>

                                    {/* Right */}
                                    <Box className="flex flex-wrap items-center gap-2 md:gap-3">
                                        <Box className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5">
                                            <Typography className="text-xs text-slate-500">ยอดรวม</Typography>
                                            <Typography className="text-sm font-semibold text-slate-900">
                                                {toTHBText(b.totalPrice)}
                                            </Typography>
                                        </Box>

                                        <StatusChip s={b.status} />

                                        <Button
                                            component={Link}
                                            href={`/my-bookings/${encodeURIComponent(b.id)}`}
                                            size="small"
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