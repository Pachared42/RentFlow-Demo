"use client";

import * as React from "react";
import { Box, Container, Typography, Chip, Alert } from "@mui/material";
import CarsFilterBar from "@/src/components/cars/CarsFilterBar";
import CarGrid from "@/src/components/cars/CarGrid";
import CarsPageSkeleton from "@/src/components/cars/CarsPageSkeleton";
import SectionHeading from "@/src/components/common/SectionHeading";
import { useCatalogDirectory } from "@/src/hooks/catalog/useCatalogDirectory";
import { useCarsFilters } from "@/src/hooks/cars/useCarsFilters";
import { useCarsCatalog } from "@/src/hooks/cars/useCarsCatalog";

export default function CarsPage() {
  const {
    q,
    setQ,
    type,
    setType,
    sort,
    setSort,
    location,
    setLocation,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    updateUrl,
    resetFilters,
  } = useCarsFilters();

  const { cars, loading, error } = useCarsCatalog({
    q,
    type,
    sort,
    location,
    pickupDate,
    returnDate,
  });
  const {
    carTypes,
    locations,
    siteMode,
    loading: directoryLoading,
    error: directoryError,
  } = useCatalogDirectory();

  const pageError = [error, directoryError].filter(Boolean).join(" • ");
  const shopCount = React.useMemo(() => {
    return new Set(
      cars
        .map((car) => car.shopName || car.domainSlug || "")
        .filter(Boolean)
    ).size;
  }, [cars]);

  if (loading) {
    return <CarsPageSkeleton />;
  }

  return (
    <Box
      className={siteMode === "marketplace" ? "bg-[#fffdf9]" : ""}
      sx={
        siteMode === "marketplace"
          ? {
              backgroundImage:
                "radial-gradient(circle at top left, rgba(245, 158, 11, 0.12), transparent 26%), radial-gradient(circle at top right, rgba(14, 165, 233, 0.1), transparent 22%)",
            }
          : undefined
      }
    >
      <Container maxWidth="lg" className="py-12">
        {siteMode === "marketplace" ? (
          <Box className="mb-6 overflow-hidden rounded-[32px] border border-amber-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.05)]">
            <Box
              className="p-6 md:p-8"
              sx={{
                background:
                  "linear-gradient(135deg, rgba(255, 247, 237, 0.96), rgba(255, 255, 255, 1) 52%, rgba(240, 249, 255, 0.9) 100%)",
              }}
            >
              <Box className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <Box>
                  <Chip
                    size="small"
                    label="โหมดรวมหลายร้าน"
                    className="border! border-amber-300! bg-amber-50! text-amber-800!"
                  />
                  <Typography
                    variant="h5"
                    className="mt-4 text-3xl font-black text-slate-900 md:text-4xl"
                  >
                    รถเช่าจากหลายร้านในหน้าเดียว
                  </Typography>
                  <Typography className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                    หน้านี้ออกแบบให้เป็น directory สำหรับ marketplace โดยเฉพาะ
                    ลูกค้าจะเห็นชื่อร้าน สาขา และประเภทรถในชุดผลลัพธ์เดียวกัน
                    เพื่อช่วยให้เทียบก่อนจองได้ง่ายขึ้น
                  </Typography>
                </Box>

                <Box className="grid gap-3 sm:grid-cols-3">
                  <Box className="rounded-[24px] border border-white/70 bg-white/90 p-4">
                    <Typography className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      รถทั้งหมด
                    </Typography>
                    <Typography className="mt-2 text-3xl font-black text-slate-900">
                      {cars.length}
                    </Typography>
                  </Box>
                  <Box className="rounded-[24px] border border-white/70 bg-white/90 p-4">
                    <Typography className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      ร้านที่พบ
                    </Typography>
                    <Typography className="mt-2 text-3xl font-black text-slate-900">
                      {shopCount}
                    </Typography>
                  </Box>
                  <Box className="rounded-[24px] border border-white/70 bg-white/90 p-4">
                    <Typography className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      พื้นที่
                    </Typography>
                    <Typography className="mt-2 text-3xl font-black text-slate-900">
                      {locations.length}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <SectionHeading
            eyebrow="รถทั้งหมดของร้าน"
            title="ดูรถทั้งหมดจาก storefront นี้"
            description="ผลลัพธ์ในหน้านี้จะเป็นรถของร้านเดียว เพื่อให้ลูกค้าเลือกคันและจองต่อได้แบบโฟกัส"
            action={
              <Chip
                size="small"
                label={`${cars.length} รายการ`}
                variant="outlined"
                className="w-min border! border-slate-200! bg-slate-900/5! text-slate-700!"
              />
            }
          />
        )}

        <CarsFilterBar
          q={q}
          type={type}
          sort={sort}
          location={location}
          pickupDate={pickupDate}
          returnDate={returnDate}
          carTypes={carTypes}
          locations={locations}
          onQChange={(value) => {
            setQ(value);
            updateUrl({ q: value });
          }}
          onTypeChange={(value) => {
            setType(value);
            updateUrl({ type: value });
          }}
          onSortChange={setSort}
          onLocationChange={(value) => {
            setLocation(value);
            updateUrl({ location: value });
          }}
          onPickupDateChange={(value) => {
            setPickupDate(value);
            updateUrl({ pickupDate: value });
          }}
          onReturnDateChange={(value) => {
            setReturnDate(value);
            updateUrl({ returnDate: value });
          }}
          onReset={resetFilters}
        />

        {pageError ? (
          <Alert severity="error" className="mt-6 rounded-xl!">
            {pageError}
          </Alert>
        ) : null}

        {directoryLoading && !carTypes.length && !locations.length ? (
          <Chip
            size="small"
            label="กำลังโหลดตัวกรองจากฐานข้อมูล"
            variant="outlined"
            className="mt-6 border! border-slate-200! bg-slate-900/5! text-slate-700!"
          />
        ) : null}

        <CarGrid cars={cars} />
      </Container>
    </Box>
  );
}
