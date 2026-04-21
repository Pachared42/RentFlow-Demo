"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";

import { formatTHB } from "@/src/constants/money";
import type { ShopSummary } from "@/src/lib/shop-directory";

type Props = {
  shops: ShopSummary[];
  title?: string;
  subtitle?: string;
  limit?: number;
  showDivider?: boolean;
  layout?: "section" | "page";
};

function getShopHref(shop: ShopSummary) {
  if (shop.firstCarId) {
    const tenantQuery = shop.domainSlug
      ? `?tenant=${encodeURIComponent(shop.domainSlug)}`
      : "";

    return `/cars/${encodeURIComponent(shop.firstCarId)}${tenantQuery}`;
  }

  return "/cars";
}

export default function ShopRecommendationsSection({
  shops,
  title = "ร้านแนะนำ",
  subtitle = "เลือกร้านที่ถูกใจ แล้วดูรถพร้อมจองได้เลย",
  limit,
  showDivider = true,
  layout = "section",
}: Props) {
  const visibleShops = React.useMemo(
    () => (limit ? shops.slice(0, limit) : shops),
    [limit, shops]
  );
  const isPageLayout = layout === "page";

  return (
    <Container maxWidth="lg" className={isPageLayout ? "py-12" : "py-2"}>
      <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Box className="flex flex-col gap-2">
          <Typography
            variant={isPageLayout ? "h5" : "h4"}
            className={isPageLayout ? "text-2xl font-bold text-slate-900" : "font-bold text-slate-900"}
          >
            {title}
          </Typography>
          <Typography className={isPageLayout ? "text-sm text-slate-600" : "text-slate-600"}>
            {subtitle}
          </Typography>
        </Box>

        <Chip
          size="small"
          label={`${visibleShops.length} ${isPageLayout ? "รายการ" : "ร้าน"}`}
          variant={isPageLayout ? "outlined" : "filled"}
          className={`${isPageLayout ? "w-min" : ""} border! border-slate-200! bg-slate-900/5! text-slate-700!`}
        />
      </Box>

      <Box className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleShops.length ? (
          visibleShops.map((shop) => (
            <Card
              key={shop.key}
              elevation={0}
              sx={{ boxShadow: "none" }}
              className="group rounded-2xl! border border-slate-200 bg-white transition hover:border-slate-400!"
            >
              <Box className="relative h-52 w-full overflow-hidden rounded-t-2xl bg-slate-100">
                {shop.heroImage ? (
                  <Image
                    src={shop.heroImage}
                    alt={shop.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <Box className="grid h-full place-items-center text-slate-400">
                    <StorefrontRoundedIcon sx={{ fontSize: 48 }} />
                  </Box>
                )}
                <Box className="absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-transparent" />
                <Box className="absolute bottom-4 left-4 right-4">
                  <Typography className="truncate text-xl font-extrabold text-white">
                    {shop.name}
                  </Typography>
                  {shop.domainSlug ? (
                    <Typography className="truncate text-sm text-white/80">
                      {shop.domainSlug}.rentflow.com
                    </Typography>
                  ) : null}
                </Box>
              </Box>

              <CardContent className="p-4!">
                <Box className="flex flex-wrap gap-2">
                  {shop.carTypes.slice(0, 3).map((type) => (
                    <Chip
                      key={`${shop.key}-${type}`}
                      size="small"
                      label={type}
                      className="h-6! rounded-full! bg-slate-900/5! text-slate-700!"
                    />
                  ))}
                </Box>

                <Box className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <Box className="flex items-end justify-between gap-3">
                    <Box className="grid gap-1">
                      <Typography className="text-xs text-slate-500">
                        รถพร้อมให้เลือก
                      </Typography>
                      <Typography className="text-lg font-bold text-slate-900">
                        {shop.carCount} คัน
                      </Typography>
                    </Box>
                    <Box className="grid gap-1 text-right">
                      <Typography className="text-xs text-slate-500">
                        เริ่มต้น
                      </Typography>
                      <Typography className="text-lg font-bold text-slate-900">
                        {formatTHB(shop.startingPrice)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="mt-5">
                  <Button
                    component={Link}
                    href={getShopHref(shop)}
                    variant="contained"
                    fullWidth
                    className="rounded-xl! bg-slate-950! font-semibold!"
                    sx={{ minHeight: 36.5, textTransform: "none" }}
                  >
                    ดูร้านนี้
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Box className="flex min-h-48 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-8 py-12 text-center sm:col-span-2 lg:col-span-3">
            <Typography className="text-base font-medium text-slate-600 md:text-lg">
              {isPageLayout
                ? "ยังไม่มีร้านที่พร้อมแสดงในตอนนี้"
                : "ยังไม่มีร้านแนะนำในตอนนี้"}
            </Typography>
          </Box>
        )}
      </Box>

      {showDivider ? <Divider className="my-6! border-slate-200!" /> : null}
    </Container>
  );
}
