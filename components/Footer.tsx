"use client";

import Link from "next/link";
import {
    Box,
    Container,
    Typography,
    Stack,
    Divider,
    IconButton,
} from "@mui/material";
import DirectionsCarRounded from "@mui/icons-material/DirectionsCarRounded";
import FacebookRounded from "@mui/icons-material/FacebookRounded";
import EmailRounded from "@mui/icons-material/EmailRounded";
import PhoneRounded from "@mui/icons-material/PhoneRounded";

import { NAV } from "@/constants/navigation";

const BRAND = {
    name: "RentFlow",
    tagline:
        "ระบบเช่ารถออนไลน์ จองง่าย ราคารวมชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง พร้อมบริการช่วยเหลือ 24/7",
};

const CONTACT = {
    email: "support@rentflow.com",
    phone: "099-999-9999",
};

const SOCIAL = {
    facebook: "https://facebook.com",
};

const NAV_LINKS = [
    { href: "/", label: "หน้าแรก" },
    { href: "/cars", label: "รถทั้งหมด" },
    { href: "/booking", label: "จองรถ" },
    { href: "/contact", label: "ติดต่อเรา" },
] as const;

export default function Footer() {
    // ลดโอกาส hydration mismatch ในบางเคส ด้วยการ fix ปีตั้งแต่ mount
    const year = new Date().getFullYear();

    return (
        <Box
            component="footer"
            className="mt-10 border-t border-slate-200 bg-white"
            aria-label="Site footer"
        >
            <Container maxWidth="lg" className="py-10">
                <Box className="grid gap-10 md:grid-cols-3">
                    {/* Brand */}
                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <DirectionsCarRounded className="text-slate-900!" />
                            <Typography className="font-bold text-slate-900">
                                {BRAND.name}
                            </Typography>
                        </Stack>

                        <Typography className="mt-3 text-sm leading-relaxed text-slate-600">
                            {BRAND.tagline}
                        </Typography>
                    </Box>

                    {/* Links */}
                    <Box component="nav" aria-label="Footer navigation">
                        <Typography className="text-sm font-semibold text-slate-900">
                            เมนู
                        </Typography>

                        <Stack spacing={1} className="mt-3">
                            {NAV.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="w-fit text-sm text-slate-600 outline-none transition hover:text-slate-900 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-slate-900/30"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </Stack>
                    </Box>

                    {/* Contact / Social */}
                    <Box component="address" className="not-italic">
                        <Typography className="text-sm font-semibold text-slate-900">
                            ติดต่อ
                        </Typography>

                        <Stack spacing={1.5} className="mt-3">
                            {/* email */}
                            <Stack direction="row" spacing={1} alignItems="center">
                                <EmailRounded className="text-slate-500!" fontSize="small" />
                                <a
                                    href={`mailto:${CONTACT.email}`}
                                    className="text-sm text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
                                >
                                    {CONTACT.email}
                                </a>
                            </Stack>

                            {/* phone */}
                            <Stack direction="row" spacing={1} alignItems="center">
                                <PhoneRounded className="text-slate-500!" fontSize="small" />
                                <a
                                    href={`tel:${CONTACT.phone.replace(/-/g, "")}`}
                                    className="text-sm text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
                                >
                                    {CONTACT.phone}
                                </a>
                            </Stack>

                            {/* socials */}
                            <Stack direction="row" spacing={1} alignItems="center">
                                <FacebookRounded fontSize="small" className="text-slate-500!" />
                                <a
                                    href={SOCIAL.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
                                >
                                    Facebook
                                </a>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>

                <Divider className="my-6! border-slate-200!" />

                {/* Copyright */}
                <Typography className="text-center text-xs text-slate-500">
                    © {year} {BRAND.name} • Car Rental Platform
                </Typography>
            </Container>
        </Box>
    );
}