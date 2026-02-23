"use client";

import * as React from "react";
import Link from "next/link";
import {
    Box,
    Container,
    Typography,
    Chip,
    Divider,
    Button,
} from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { HERO_BADGES, FEATURES, HOW_IT_WORKS, TRUST_POINTS } from "@/src/constants/features";

export default function FeaturesPage() {
    return (
        <Container maxWidth="lg" className="py-12">
            <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Box className="flex flex-col gap-2">
                    <Typography variant="h5" className="text-2xl font-bold text-slate-900">ทำไมต้อง RentFlow</Typography>
                    <Typography className="text-sm text-slate-600">
                        แพลตฟอร์มเช่ารถที่เน้นความชัดเจน โปร่งใส และประสบการณ์ใช้งานที่ลื่นไหล
                    </Typography>
                </Box>
            </Box>
            <Box className="mt-3 flex flex-wrap gap-2">
                {HERO_BADGES.map((b) => (
                    <Chip
                        key={b}
                        icon={<CheckCircleRoundedIcon fontSize="small" className="text-emerald-500! ml-2!" />}
                        label={b}
                        className="bg-slate-900/5! text-slate-700!"
                        variant="outlined"
                    />
                ))}
            </Box>

            {/* Features */}
            <Box className="mt-8">
                <Box className="flex items-end justify-between gap-3">
                    <Box>
                        <Typography className="text-lg font-bold text-slate-900">จุดเด่นของระบบ</Typography>
                        <Typography className="mt-1 text-sm text-slate-600">
                            ออกแบบให้ผู้ใช้เข้าใจง่าย เห็นข้อมูลสำคัญก่อนตัดสินใจ
                        </Typography>
                    </Box>
                </Box>

                <Box className="mt-4 grid gap-4 md:grid-cols-2">
                    {FEATURES.map((f) => (
                        <Box key={f.title} className="rounded-2xl! border border-slate-200 bg-white p-4">
                            <Box className="flex items-start gap-3">
                                <Box className="mt-0.5 grid h-10 w-10 place-items-center rounded-lg! border border-slate-200 bg-slate-50 text-slate-900">
                                    {f.icon}
                                </Box>
                                <Box className="min-w-0">
                                    <Typography className="text-base font-semibold text-slate-900">{f.title}</Typography>
                                    <Typography className="mt-1 text-sm leading-relaxed text-slate-600">{f.desc}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* How it works */}
            <Box className="mt-10 rounded-2xl border border-slate-200 bg-white p-4">
                <Typography className="text-lg font-bold text-slate-900">ขั้นตอนการจอง</Typography>
                <Typography className="mt-1 text-sm text-slate-600">
                    ตั้งแต่ค้นหารถจนถึงชำระเงิน — เราทำให้ทุกขั้นตอนชัดเจนและง่ายดาย
                </Typography>

                <Box className="mt-4 grid gap-4 md:grid-cols-2">
                    {HOW_IT_WORKS.map((s) => (
                        <Box key={s.step} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <Box className="flex items-start gap-3">
                                <Box className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white">
                                    <Typography className="text-sm font-bold">{s.step}</Typography>
                                </Box>
                                <Box>
                                    <Typography className="text-sm font-semibold text-slate-900">{s.title}</Typography>
                                    <Typography className="mt-1 text-sm text-slate-600">{s.desc}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Trust / Safety */}
            <Box className="mt-10">
                <Typography className="text-lg font-bold text-slate-900">ความน่าเชื่อถือ & ความปลอดภัย</Typography>
                <Typography className="mt-1 text-sm text-slate-600">
                    สิ่งที่ผู้ใช้มักอยากรู้ก่อนจอง — เราใส่ไว้ให้ครบ
                </Typography>

                <Box className="mt-4 grid gap-4 md:grid-cols-2">
                    {TRUST_POINTS.map((t) => (
                        <Box key={t.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                            <Typography className="text-base font-semibold text-slate-900">{t.title}</Typography>
                            <Typography className="mt-1 text-sm text-slate-600">{t.desc}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* CTA */}
            <Box className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <Typography className="text-sm font-semibold text-slate-900">พร้อมเริ่มจอง?</Typography>
                <Typography className="mt-1 text-sm text-slate-600">
                    ไปที่หน้า “รถทั้งหมด” เพื่อเลือกคันที่ใช่ แล้วกด “จองเลย”
                </Typography>

                <Box className="mt-4 flex flex-wrap gap-2">
                    <Button
                        component={Link}
                        href="/cars"
                        variant="contained"
                        className="rounded-xl! font-semibold!"
                        sx={{ textTransform: "none", backgroundColor: "rgb(15 23 42)" }}
                    >
                        เลือกรถตอนนี้
                    </Button>
                    <Button
                        component={Link}
                        href="/support"
                        variant="outlined"
                        className="rounded-xl!"
                        sx={{ textTransform: "none" }}
                    >
                        ติดต่อทีมงาน
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}