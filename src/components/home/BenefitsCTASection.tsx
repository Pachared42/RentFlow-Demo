"use client";

import * as React from "react";
import Link from "next/link";
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
} from "@mui/material";

import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

type Benefit = {
    title: string;
    desc: string;
    Icon: typeof PaidOutlinedIcon;
};

const BENEFITS: Benefit[] = [
    {
        title: "ราคาชัดเจน",
        desc: "แสดงราคารวมก่อนจอง ลดปัญหาค่าใช้จ่ายแอบแฝง",
        Icon: PaidOutlinedIcon,
    },
    {
        title: "รถสภาพดี",
        desc: "ตรวจเช็คและทำความสะอาดก่อนส่งมอบทุกครั้ง",
        Icon: VerifiedOutlinedIcon,
    },
    {
        title: "ซัพพอร์ต 24/7",
        desc: "มีทีมช่วยเหลือกรณีฉุกเฉินตลอดการเช่า",
        Icon: SupportAgentOutlinedIcon,
    },
];

export default function BenefitsCTASection() {
    const scrollToSearch = () => {
        document.getElementById("search")?.scrollIntoView({ behavior: "smooth", block: "start" })
    };

    return (
        <Container maxWidth="lg" className="py-2">
            {/* Benefits */}
            <Box className="grid gap-4 md:grid-cols-3">
                {BENEFITS.map((b) => (
                    <Card
                        key={b.title}
                        elevation={0}
                        sx={{ boxShadow: "none" }}
                        className="group rounded-2xl! border border-slate-200 bg-white transition hover:border-slate-400!"
                    >
                        <CardContent className="p-4!">
                            <Box className="flex items-start gap-4">
                                <Box className="grid h-10 w-10 place-items-center rounded-lg! border border-slate-200 bg-white">
                                    <b.Icon className="text-slate-900" fontSize="small" />
                                </Box>

                                <Box className="min-w-0">
                                    <Typography variant="h6" className="text-base font-semibold text-slate-900">
                                        {b.title}
                                    </Typography>
                                    <Typography className="mt-1 text-sm text-slate-600">
                                        {b.desc}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* CTA */}
            <Box className="mt-8 overflow-hidden! rounded-2xl! border border-slate-200! hover:border-slate-400!">
                <Box className="p-4">
                    <Box className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <Box className="max-w-2xl">
                            <Typography className="text-xl font-bold text-slate-900">
                                พร้อมจองรถสำหรับทริปถัดไปแล้วใช่ไหม?
                            </Typography>
                            <Typography className="mt-1 text-sm text-slate-600">
                                เลือกช่วงวันและรุ่นรถที่ต้องการ แล้วเริ่มจองได้ทันที
                            </Typography>

                            <Box className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">
                                    ยกเลิกฟรี (ตามเงื่อนไข)
                                </span>
                                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">
                                    บริการ 24/7
                                </span>
                                <span className="rounded-full border border-slate-200 bg-white px-3 py-2">
                                    รถพร้อมใช้งาน
                                </span>
                            </Box>
                        </Box>

                        <Box className="flex flex-col gap-2 sm:flex-row">
                            <Button
                                size="large"
                                variant="contained"
                                className="rounded-xl! px-6 py-3 font-semibold"
                                sx={{
                                    textTransform: "none",
                                    backgroundColor: "rgb(15 23 42)",
                                }}
                                component={Link}
                                href="/cars"
                            >
                                ดูรถทั้งหมด
                            </Button>

                            <Button
                                size="large"
                                variant="outlined"
                                className="rounded-xl! border-slate-300! text-slate-900! hover:border-slate-400!"
                                sx={{ textTransform: "none" }}
                                onClick={scrollToSearch}
                                endIcon={<ArrowUpwardRoundedIcon />}
                            >
                                ไปที่ค้นหา
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}