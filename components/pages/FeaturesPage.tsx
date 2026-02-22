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
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";

const HERO_BADGES = ["รถใหม่", "โปรแรง", "บริการดี", "รับรถเร็ว", "ปลอดภัย"] as const;

const FEATURES = [
    {
        icon: <DirectionsCarRoundedIcon fontSize="small" />,
        title: "รถหลากหลาย รุ่นยอดนิยม",
        desc: "มีรถหลายประเภทให้เลือก เช่น Eco / Sedan / SUV พร้อมข้อมูลสเปคชัดเจนก่อนตัดสินใจ",
    },
    {
        icon: <PaymentsRoundedIcon fontSize="small" />,
        title: "ราคาชัดเจน โปร่งใส",
        desc: "แสดงราคาเริ่มต้นและยอดรวมตามวันรับ-คืนรถ ลดความสับสน ไม่มีบวกเพิ่มแบบไม่แจ้ง",
    },
    {
        icon: <ScheduleRoundedIcon fontSize="small" />,
        title: "จองง่ายในไม่กี่ขั้นตอน",
        desc: "เลือกวัน-เวลา → เลือกรถ → ยืนยันการจอง → ชำระเงิน ใช้งานได้ลื่นไหลทั้งมือถือและเดสก์ท็อป",
    },
    {
        icon: <VerifiedUserRoundedIcon fontSize="small" />,
        title: "มาตรฐานความปลอดภัย",
        desc: "รถได้รับการตรวจเช็คก่อนส่งมอบ และมีแนวทางการใช้งาน/เงื่อนไขที่อ่านง่าย",
    },
    {
        icon: <SupportAgentRoundedIcon fontSize="small" />,
        title: "ซัพพอร์ตไว",
        desc: "มีช่องทางช่วยเหลือ และคำแนะนำการแก้ปัญหาพื้นฐาน พร้อมรหัสการจองเพื่อให้ตรวจสอบได้เร็ว",
    },
    {
        icon: <LocalOfferRoundedIcon fontSize="small" />,
        title: "โปรโมชัน/แบดจ์บอกรถเด่น",
        desc: "มีป้ายกำกับ เช่น Popular / New ช่วยให้เลือกคันที่เหมาะกับคุณได้เร็วขึ้น",
    },
];

const HOW_IT_WORKS = [
    {
        step: "1",
        title: "ค้นหาและกรองรถ",
        desc: "ใช้ช่องค้นหา + เลือกประเภทรถ + เรียงตามราคา/คะแนน เพื่อเจอรถที่ใช่ไวขึ้น",
    },
    {
        step: "2",
        title: "ดูรายละเอียดรถ",
        desc: "ดูรูป สเปค (ที่นั่ง/เกียร์/เชื้อเพลิง) และราคาเริ่มต้น เพื่อเปรียบเทียบก่อนจอง",
    },
    {
        step: "3",
        title: "จองรถ",
        desc: "เลือกวันรับ-คืนรถ กรอกข้อมูลผู้จอง และตรวจสอบยอดรวมอีกครั้งก่อนยืนยัน",
    },
    {
        step: "4",
        title: "ชำระเงินและติดตามสถานะ",
        desc: "เลือกวิธีชำระเงินและติดตามสถานะในหน้า “การจองของฉัน”",
    },
];

const TRUST_POINTS = [
    { title: "ข้อมูลชัด", desc: "ระบุวันรับ-คืนรถ และยอดรวมก่อนชำระเงินทุกครั้ง" },
    { title: "ตรวจเช็คก่อนส่งมอบ", desc: "รถสะอาด พร้อมใช้งาน ลดปัญหาระหว่างเดินทาง" },
    { title: "มีช่องทางช่วยเหลือ", desc: "ติดต่อทีมงานพร้อมรหัสการจอง เพื่อให้ตรวจสอบได้ไว" },
    { title: "เหมาะกับทุกอุปกรณ์", desc: "ออกแบบ responsive ใช้งานง่ายทั้งมือถือ/แท็บเล็ต/คอม" },
];

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
                        <Box key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                            <Box className="flex items-start gap-3">
                                <Box className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-900">
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
                <Typography className="text-lg font-bold text-slate-900">ขั้นตอนการจอง (How it works)</Typography>
                <Typography className="mt-1 text-sm text-slate-600">
                    ตั้งแต่ค้นหารถจนถึงชำระเงิน — โฟลว์เดียวจบ
                </Typography>

                <Divider className="my-5! border-slate-200!" />

                <Box className="grid gap-4 md:grid-cols-2">
                    {HOW_IT_WORKS.map((s) => (
                        <Box key={s.step} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
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
                        <Box key={t.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                            <Typography className="text-base font-semibold text-slate-900">{t.title}</Typography>
                            <Typography className="mt-1 text-sm text-slate-600">{t.desc}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* CTA */}
            <Box className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
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