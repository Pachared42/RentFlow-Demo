"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, Container, Typography, Stack, Divider } from "@mui/material";
import FacebookRounded from "@mui/icons-material/FacebookRounded";
import EmailRounded from "@mui/icons-material/EmailRounded";
import PhoneRounded from "@mui/icons-material/PhoneRounded";

import { NAV } from "@/src/constants/navigation";

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

export default function Footer() {
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
          <Stack direction="row" spacing={1} alignItems="center">
            <Box className="relative h-4 w-4 shrink-0">
              <Image
                src="/RentFlow.png"
                alt="RentFlow Logo"
                fill
                className="object-contain"
              />
            </Box>

            <Typography className="text-lg font-bold text-slate-900">
              {BRAND.name}
            </Typography>
          </Stack>

          {/* Links */}
          <Box component="nav" aria-label="Footer navigation">
            <Typography className="font-semibold! text-slate-900">
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
            <Typography className="font-semibold! text-slate-900">
              ติดต่อ
            </Typography>

            <Stack spacing={1.5} className="mt-3">
              {/* email */}
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailRounded className="text-slate-600!" fontSize="small" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
                >
                  {CONTACT.email}
                </a>
              </Stack>

              {/* phone */}
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneRounded className="text-slate-600!" fontSize="small" />
                <a
                  href={`tel:${CONTACT.phone.replace(/-/g, "")}`}
                  className="text-sm text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
                >
                  {CONTACT.phone}
                </a>
              </Stack>

              {/* socials */}
              <Stack direction="row" spacing={1} alignItems="center">
                <FacebookRounded fontSize="small" className="text-slate-600!" />
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

        <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Typography className="text-xs text-slate-500">
            © {year} {BRAND.name} • แพลตฟอร์มให้บริการเช่ารถยนต์ออนไลน์
          </Typography>

          <Stack direction="row" spacing={2} className="text-sm">
            <Link
              href="/terms"
              className="text-slate-500 hover:text-slate-900 underline-offset-2 hover:underline"
            >
              เงื่อนไขการใช้งาน
            </Link>
            <Link
              href="/privacy"
              className="text-slate-500 hover:text-slate-900 underline-offset-2 hover:underline"
            >
              นโยบายความเป็นส่วนตัว
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
