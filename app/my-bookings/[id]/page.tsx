"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
    Box,
    Container,
    Typography,
    Chip,
    Divider,
    Button,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

type BookingStatus = "pending" | "confirmed" | "cancelled";

type Booking = {
    id: string;
    carName: string;
    pickupDate: string;
    returnDate: string;
    totalPrice: number;
    status: BookingStatus;

    // optional detail fields
    pickupLocation?: string;
    returnLocation?: string;
    customerName?: string;
    phone?: string;
    notes?: string;
};

const SEED: Booking[] = [
    {
        id: "BK-1001",
        carName: "Toyota Yaris",
        pickupDate: "2026-03-01",
        returnDate: "2026-03-03",
        totalPrice: 3600,
        status: "confirmed",
        pickupLocation: "สนามบินสุวรรณภูมิ",
        returnLocation: "สนามบินสุวรรณภูมิ",
        customerName: "Pachara",
        phone: "09x-xxx-xxxx",
        notes: "รับรถช่วงเช้า",
    },
    {
        id: "BK-1002",
        carName: "Honda City",
        pickupDate: "2026-03-10",
        returnDate: "2026-03-11",
        totalPrice: 1500,
        status: "pending",
        pickupLocation: "เซ็นทรัลลาดพร้าว",
        returnLocation: "เซ็นทรัลลาดพร้าว",
        customerName: "Pachara",
        phone: "09x-xxx-xxxx",
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
    return <Chip size="small" label={v.label} variant="outlined" className={v.className} />;
}

function StepDot({ active }: { active: boolean }) {
    return (
        <Box
            className={[
                "h-3 w-3 rounded-full border",
                active ? "bg-slate-900 border-slate-900" : "bg-white border-slate-300",
            ].join(" ")}
        />
    );
}

function StatusTimeline({ status }: { status: BookingStatus }) {
    const steps = [
        { key: "pending" as const, label: "สร้างรายการ" },
        { key: "confirmed" as const, label: "ยืนยันการจอง" },
        { key: "cancelled" as const, label: "ยกเลิก" },
    ];

    const activeIndex =
        status === "pending" ? 0 : status === "confirmed" ? 1 : status === "cancelled" ? 2 : 0;

    return (
        <Box className="flex items-center gap-3">
            {steps.map((s, i) => {
                const active = i <= activeIndex;
                return (
                    <React.Fragment key={s.key}>
                        <Box className="flex items-center gap-2">
                            <StepDot active={active} />
                            <Typography className={["text-xs", active ? "text-slate-900" : "text-slate-500"].join(" ")}>
                                {s.label}
                            </Typography>
                        </Box>
                        {i !== steps.length - 1 && (
                            <Box className={["h-px w-10", i < activeIndex ? "bg-slate-900" : "bg-slate-200"].join(" ")} />
                        )}
                    </React.Fragment>
                );
            })}
        </Box>
    );
}

// แยกราคา (mock)
function priceBreakdown(total: number) {
    const base = Math.round(total * 0.85);
    const insurance = Math.max(0, Math.round(total * 0.1));
    const service = Math.max(0, total - base - insurance);
    return { base, insurance, service, total };
}

export default function BookingDetailPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const id = params?.id;

    const [openCancel, setOpenCancel] = React.useState(false);
    const [local, setLocal] = React.useState<Booking | null>(null);

    React.useEffect(() => {
        const found = SEED.find((x) => x.id === id) ?? null;
        setLocal(found);
    }, [id]);

    if (!id) return null;

    if (!local) {
        return (
            <Container maxWidth="lg" className="py-12">
                <Box className="rounded-2xl border border-slate-200 bg-white p-6">
                    <Typography className="text-lg font-semibold text-slate-900">ไม่พบรายการจอง</Typography>
                    <Typography className="mt-1 text-sm text-slate-600">
                        ไม่พบรหัสการจอง <span className="font-medium text-slate-900">{id}</span>
                    </Typography>

                    <Box className="mt-5">
                        <Button
                            component={Link}
                            href="/my-bookings"
                            variant="outlined"
                            className="rounded-xl!"
                        >
                            กลับไปหน้ารายการจอง
                        </Button>
                    </Box>
                </Box>
            </Container>
        );
    }

    const canCancel = local.status === "pending" || local.status === "confirmed";
    const p = priceBreakdown(local.totalPrice);

    const doCancelMock = () => {
        setLocal((prev) => (prev ? { ...prev, status: "cancelled" } : prev));
        setOpenCancel(false);
    };

    return (
        <Container maxWidth="lg" className="py-12">
            {/* Header */}
            <Box className="flex flex-col gap-2">
                <Typography className="text-2xl font-bold text-slate-900">รายละเอียดการจอง</Typography>
                <Typography className="text-sm text-slate-600">
                    ตรวจสอบข้อมูลการจอง สถานะ และสรุปราคา
                </Typography>
            </Box>

            {/* Top Card */}
            <Box className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                <Box className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <Box className="space-y-1">
                        <Typography className="text-sm font-semibold text-slate-900">
                            {local.carName} <span className="text-slate-400">•</span>{" "}
                            <span className="text-slate-600">{local.id}</span>
                        </Typography>

                        <Box className="mt-2 flex flex-wrap items-center gap-2">
                            <StatusChip s={local.status} />
                            <Typography className="text-xs text-slate-600">
                                รับรถ: {local.pickupDate} • คืนรถ: {local.returnDate}
                            </Typography>
                        </Box>

                        <Box className="mt-3">
                            <StatusTimeline status={local.status} />
                        </Box>
                    </Box>

                    <Box className="flex flex-wrap items-center gap-2">
                        <Button
                            variant="outlined"
                            className="rounded-xl!"
                            onClick={() => router.back()}
                        >
                            ย้อนกลับ
                        </Button>

                        <Button
                            variant="outlined"
                            className="rounded-xl! border-rose-200! text-rose-700! hover:border-rose-300!"
                            disabled={!canCancel}
                            onClick={() => setOpenCancel(true)}
                        >
                            ยกเลิกการจอง
                        </Button>

                        <Button
                            component={Link}
                            href="/support"
                            variant="contained"
                            className="rounded-xl! bg-slate-900! hover:bg-slate-800!"
                        >
                            ติดต่อแอดมิน
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Grid */}
            <Box className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Left: Details */}
                <Box className="md:col-span-2 space-y-4">
                    <Paper elevation={0} className="rounded-2xl border border-slate-200 p-5">
                        <Typography className="text-sm font-semibold text-slate-900">ข้อมูลรับ-คืนรถ</Typography>
                        <Divider className="my-4! border-slate-200!" />

                        <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Box>
                                <Typography className="text-xs text-slate-500">สถานที่รับรถ</Typography>
                                <Typography className="mt-1 text-sm text-slate-900">
                                    {local.pickupLocation ?? "-"}
                                </Typography>
                                <Typography className="mt-1 text-xs text-slate-600">
                                    วันที่รับรถ: {local.pickupDate}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography className="text-xs text-slate-500">สถานที่คืนรถ</Typography>
                                <Typography className="mt-1 text-sm text-slate-900">
                                    {local.returnLocation ?? "-"}
                                </Typography>
                                <Typography className="mt-1 text-xs text-slate-600">
                                    วันที่คืนรถ: {local.returnDate}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper elevation={0} className="rounded-2xl border border-slate-200 p-5">
                        <Typography className="text-sm font-semibold text-slate-900">ข้อมูลผู้จอง</Typography>
                        <Divider className="my-4! border-slate-200!" />

                        <Box className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <Box>
                                <Typography className="text-xs text-slate-500">ชื่อ</Typography>
                                <Typography className="mt-1 text-sm text-slate-900">
                                    {local.customerName ?? "-"}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography className="text-xs text-slate-500">เบอร์โทร</Typography>
                                <Typography className="mt-1 text-sm text-slate-900">{local.phone ?? "-"}</Typography>
                            </Box>
                            <Box>
                                <Typography className="text-xs text-slate-500">หมายเหตุ</Typography>
                                <Typography className="mt-1 text-sm text-slate-900">{local.notes ?? "-"}</Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper elevation={0} className="rounded-2xl border border-slate-200 p-5">
                        <Typography className="text-sm font-semibold text-slate-900">เงื่อนไขสำคัญ</Typography>
                        <Divider className="my-4! border-slate-200!" />
                        <Box className="space-y-2">
                            <Typography className="text-sm text-slate-600">
                                • โปรดนำใบขับขี่และบัตรประชาชนมาแสดงตอนรับรถ
                            </Typography>
                            <Typography className="text-sm text-slate-600">
                                • การยกเลิกอาจมีค่าธรรมเนียมตามเงื่อนไขบริษัท
                            </Typography>
                            <Typography className="text-sm text-slate-600">
                                • หากต้องการเปลี่ยนวันรับ-คืนรถ ให้ติดต่อแอดมิน
                            </Typography>
                        </Box>
                    </Paper>
                </Box>

                {/* Right: Price */}
                <Box className="space-y-4">
                    <Paper elevation={0} className="rounded-2xl border border-slate-200 p-5">
                        <Typography className="text-sm font-semibold text-slate-900">สรุปราคา</Typography>
                        <Divider className="my-4! border-slate-200!" />

                        <Box className="space-y-2">
                            <Box className="flex items-center justify-between">
                                <Typography className="text-sm text-slate-600">ค่าเช่ารถ</Typography>
                                <Typography className="text-sm text-slate-900">฿{p.base.toLocaleString()}</Typography>
                            </Box>
                            <Box className="flex items-center justify-between">
                                <Typography className="text-sm text-slate-600">ประกัน</Typography>
                                <Typography className="text-sm text-slate-900">฿{p.insurance.toLocaleString()}</Typography>
                            </Box>
                            <Box className="flex items-center justify-between">
                                <Typography className="text-sm text-slate-600">ค่าบริการ</Typography>
                                <Typography className="text-sm text-slate-900">฿{p.service.toLocaleString()}</Typography>
                            </Box>

                            <Divider className="my-3! border-slate-200!" />

                            <Box className="flex items-center justify-between">
                                <Typography className="text-sm font-semibold text-slate-900">ยอดรวม</Typography>
                                <Typography className="text-base font-bold text-slate-900">
                                    ฿{p.total.toLocaleString()}
                                </Typography>
                            </Box>
                        </Box>

                        <Box className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                            <Typography className="text-xs text-slate-600">
                                ใบเสร็จ/เอกสารยืนยันจะพร้อมหลังสถานะ “ยืนยันแล้ว”
                            </Typography>
                        </Box>

                        <Box className="mt-4 flex gap-2">
                            <Button
                                fullWidth
                                variant="outlined"
                                className="rounded-xl!"
                                disabled={local.status !== "confirmed"}
                            >
                                ดาวน์โหลดใบยืนยัน
                            </Button>
                        </Box>
                    </Paper>

                    <Paper elevation={0} className="rounded-2xl border border-slate-200 p-5">
                        <Typography className="text-sm font-semibold text-slate-900">การช่วยเหลือ</Typography>
                        <Divider className="my-4! border-slate-200!" />
                        <Typography className="text-sm text-slate-600">
                            หากพบปัญหาเรื่องการรับรถ/คืนรถ หรืออยากเปลี่ยนข้อมูล กรุณาติดต่อแอดมิน
                        </Typography>
                        <Box className="mt-3">
                            <Button
                                component={Link}
                                href="/support"
                                variant="contained"
                                className="rounded-xl! bg-slate-900! hover:bg-slate-800!"
                                fullWidth
                            >
                                ไปที่ศูนย์ช่วยเหลือ
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>

            {/* Cancel Dialog */}
            <Dialog open={openCancel} onClose={() => setOpenCancel(false)} maxWidth="xs" fullWidth>
                <DialogTitle className="text-base font-semibold">ยืนยันการยกเลิกการจอง</DialogTitle>
                <DialogContent>
                    <Typography className="text-sm text-slate-600">
                        ต้องการยกเลิกรายการ <span className="font-semibold text-slate-900">{local.id}</span>{" "}
                        ใช่หรือไม่?
                    </Typography>
                    <Box className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3">
                        <Typography className="text-xs text-rose-700">
                            เมื่อยกเลิกแล้ว จะไม่สามารถกู้คืนสถานะเดิมได้ (mock)
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions className="p-4">
                    <Button variant="outlined" className="rounded-xl!" onClick={() => setOpenCancel(false)}>
                        ย้อนกลับ
                    </Button>
                    <Button
                        variant="contained"
                        className="rounded-xl! bg-rose-600! hover:bg-rose-700!"
                        onClick={doCancelMock}
                    >
                        ยกเลิกการจอง
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Note */}
            {/* <Box className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <Typography className="text-sm font-semibold text-slate-900">หมายเหตุ (ต่อ API)</Typography>
                <Typography className="mt-1 text-sm text-slate-600">
                    เปลี่ยนจาก SEED เป็นเรียก{" "}
                    <code className="rounded bg-white px-1 py-0.5">GET /bookings/:id</code>{" "}
                    และทำปุ่มยกเลิกเป็น{" "}
                    <code className="rounded bg-white px-1 py-0.5">POST /bookings/:id/cancel</code>
                </Typography>
            </Box> */}
        </Container>
    );
}