"use client";

import * as React from "react";
import { Box, Container, Typography, Chip, Alert } from "@mui/material";
import CarsFilterBar from "@/src/components/cars/CarsFilterBar";
import CarGrid from "@/src/components/cars/CarGrid";
import CarsPageSkeleton from "@/src/components/cars/CarsPageSkeleton";
import { useCarsFilters } from "@/src/hooks/cars/useCarsFilters";
import { useCarsCatalog } from "@/src/hooks/cars/useCarsCatalog";

type Props = {};

export default function CarsPage(_props: Props) {
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

  if (loading) {
    return <CarsPageSkeleton />;
  }

  return (
    <Container maxWidth="lg" className="py-12">
      <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Box className="flex flex-col gap-2">
          <Typography
            variant="h5"
            className="text-2xl font-bold text-slate-900"
          >
            รถทั้งหมด
          </Typography>
          <Typography className="text-sm text-slate-600">
            เลือกจากรถหลากหลายประเภท ทั้งรถเก๋ง รถ SUV รถกระบะ และอื่น ๆ
            พร้อมรายละเอียดครบถ้วน
          </Typography>
        </Box>

        <Chip
          size="small"
          label={`${cars.length} รายการ`}
          variant="outlined"
          className="w-min border! border-slate-200! bg-slate-900/5! text-slate-700!"
        />
      </Box>

      <CarsFilterBar
        q={q}
        type={type}
        sort={sort}
        location={location}
        pickupDate={pickupDate}
        returnDate={returnDate}
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

      {error ? (
        <Alert severity="error" className="mt-6 rounded-xl!">
          {error}
        </Alert>
      ) : null}

      <CarGrid cars={cars} />
    </Container>
  );
}