"use client";

import * as React from "react";
import Link from "next/link";
import { Box, Container, Typography, Stack, Divider } from "@mui/material";

import { NAV } from "@/src/constants/navigation";
import { useRentFlowSiteMode } from "@/src/hooks/useRentFlowSiteMode";
import { tenantApi } from "@/src/services/tenant/tenant.service";
import type { TenantProfile } from "@/src/services/tenant/tenant.types";

const BRAND = {
  name: "RentFlow",
  tagline:
    "ระบบเช่ารถออนไลน์ จองง่าย ราคารวมชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง พร้อมบริการช่วยเหลือ 24/7",
};

const CONTACT = {
  phone: "099-999-9999",
};

const SOCIAL = {
  facebook: "https://facebook.com",
};

type FooterProps = {
  initialHost?: string;
  initialTenantProfile?: TenantProfile | null;
};

export default function Footer({
  initialHost,
  initialTenantProfile = null,
}: FooterProps) {
  const year = new Date().getFullYear();
  const siteMode = useRentFlowSiteMode(initialHost);
  const [tenantProfile, setTenantProfile] =
    React.useState<TenantProfile | null>(initialTenantProfile);

  React.useEffect(() => {
    let cancelled = false;

    if (siteMode === "marketplace") {
      setTenantProfile(null);
      return;
    }

    tenantApi
      .resolveTenant()
      .then((res) => {
        if (!cancelled) setTenantProfile(res.data);
      })
      .catch(() => {
        if (!cancelled) setTenantProfile(initialTenantProfile);
      });

    return () => {
      cancelled = true;
    };
  }, [initialTenantProfile, siteMode]);

  const brandName =
    siteMode === "storefront" && tenantProfile?.shopName
      ? tenantProfile.shopName
      : BRAND.name;
  const brandLogoSrc =
    siteMode === "storefront" && tenantProfile?.logoUrl
      ? tenantProfile.logoUrl
      : "/RentFlow.png";
  const brandTagline =
    siteMode === "storefront" && tenantProfile?.shopName
      ? `จองรถกับ ${tenantProfile.shopName} ได้ง่าย พร้อมดูข้อมูลรถและสาขาของร้านในที่เดียว`
      : BRAND.tagline;

  const contactTitle =
    siteMode === "marketplace"
      ? "สนใจเช่าแพลตฟอร์ม"
      : tenantProfile?.shopName
        ? `ติดต่อ ${tenantProfile.shopName}`
        : "ติดต่อ";
  const contactText =
    siteMode === "marketplace"
      ? "ถ้าสนใจเช่าแพลตฟอร์มให้บริการเช่ารถยนต์ออนไลน์ สามารถติดต่อทีม RentFlow ได้ที่นี่"
      : "ติดต่อร้านเพื่อสอบถามข้อมูลรถ สาขา และเงื่อนไขการเช่าเพิ่มเติม";

  return (
    <Box
      component="footer"
      className="border-t border-black/10 bg-[var(--rf-apple-surface-soft)]"
      aria-label="Site footer"
    >
      <Container maxWidth="lg" className="py-10 md:py-12">
        <Box className="grid gap-8 md:grid-cols-3 md:gap-10">
          {/* Brand */}
          <Box className="space-y-3">
            <Stack direction="row" spacing={1} alignItems="center">
              <Box className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md">
                <Box
                  component="img"
                  src={brandLogoSrc}
                  alt={brandName}
                  className="h-full w-full object-contain"
                />
              </Box>

              <Typography className="apple-card-title font-bold tracking-[-0.03em] text-[var(--rf-apple-ink)]">
                {brandName}
              </Typography>
            </Stack>

            <Typography className="apple-body-sm max-w-sm text-[var(--rf-apple-muted)] md:hidden">
              {brandTagline}
            </Typography>
          </Box>

          {/* Links */}
          <Box component="nav" aria-label="Footer navigation">
            <Typography className="font-semibold! text-[var(--rf-apple-ink)]">
              เมนู
            </Typography>

            <Stack spacing={1} className="mt-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="apple-body-sm w-fit text-[var(--rf-apple-muted)] outline-none transition hover:text-[var(--rf-apple-ink)] focus-visible:rounded focus-visible:ring-2 focus-visible:ring-black/20"
                >
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Box>

          {/* Contact / Social */}
          <Box component="address" className="not-italic">
            <Typography className="font-semibold! text-[var(--rf-apple-ink)]">
              {contactTitle}
            </Typography>

            <Stack spacing={1.5} className="mt-3">
              <Typography className="apple-body-sm text-[var(--rf-apple-muted)]">
                {contactText}
              </Typography>

              <a
                href={`tel:${CONTACT.phone.replace(/-/g, "")}`}
                className="apple-body-sm text-[var(--rf-apple-muted)] hover:text-[var(--rf-apple-ink)] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
              >
                โทร: {CONTACT.phone}
              </a>

              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-body-sm text-[var(--rf-apple-muted)] hover:text-[var(--rf-apple-ink)] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
              >
                Facebook
              </a>
            </Stack>
          </Box>
        </Box>

        <Divider className="my-6! border-black/10!" />

        <Box className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Typography className="apple-label-text text-[var(--rf-apple-muted)]">
            © {year} {brandName} • แพลตฟอร์มให้บริการเช่ารถยนต์ออนไลน์
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2 }}
            className="text-sm"
          >
            <Link
              href="/terms"
              className="text-[var(--rf-apple-muted)] hover:text-[var(--rf-apple-ink)]"
            >
              เงื่อนไขการใช้งาน
            </Link>
            <Link
              href="/privacy"
              className="text-[var(--rf-apple-muted)] hover:text-[var(--rf-apple-ink)]"
            >
              นโยบายความเป็นส่วนตัว
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
