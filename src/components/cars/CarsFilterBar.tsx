"use client";

import * as React from "react";
import { Box, TextField, MenuItem, Button } from "@mui/material";
import type { LocationOption } from "@/src/lib/rentflow-catalog";
import type { CarType, SortKey } from "@/src/services/cars/cars.types";

type Props = {
  q: string;
  type: CarType | "all";
  sort: SortKey;
  location: string;
  pickupDate: string;
  returnDate: string;
  carTypes: readonly CarType[];
  locations: readonly LocationOption[];
  onQChange: (value: string) => void;
  onTypeChange: (value: CarType | "all") => void;
  onSortChange: (value: SortKey) => void;
  onLocationChange: (value: string) => void;
  onPickupDateChange: (value: string) => void;
  onReturnDateChange: (value: string) => void;
  onReset: () => void;
};

export default function CarsFilterBar({
  q,
  type,
  sort,
  location,
  pickupDate,
  returnDate,
  carTypes,
  locations,
  onQChange,
  onTypeChange,
  onSortChange,
  onLocationChange,
  onPickupDateChange,
  onReturnDateChange,
  onReset,
}: Props) {
  return (
    <Box className="mt-4 rounded-2xl! border border-slate-200 bg-white p-4">
      <Box className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <TextField
          label="ค้นหารถ"
          value={q}
          onChange={(e) => onQChange(e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />

        <TextField
          select
          label="ประเภทรถ"
          value={type}
          onChange={(e) => onTypeChange(e.target.value as CarType | "all")}
          size="small"
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        >
          <MenuItem value="all">ทั้งหมด</MenuItem>
          {carTypes.map((carType) => (
            <MenuItem key={carType} value={carType}>
              {carType}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="สาขารับรถ"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        >
          <MenuItem value="">ทั้งหมด</MenuItem>
          {locations.map((loc) => (
            <MenuItem key={loc.value} value={loc.value}>
              {loc.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          type="date"
          label="วันรับรถ"
          value={pickupDate}
          onChange={(e) => onPickupDateChange(e.target.value)}
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />

        <TextField
          type="date"
          label="วันคืนรถ"
          value={returnDate}
          onChange={(e) => onReturnDateChange(e.target.value)}
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />
      </Box>

      <Box className="mt-4 grid gap-4 md:grid-cols-2">
        <TextField
          select
          label="เรียงตาม"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        >
          <MenuItem value="price_asc">ราคาต่ำ → สูง</MenuItem>
          <MenuItem value="price_desc">ราคาสูง → ต่ำ</MenuItem>
        </TextField>

        <Button
          variant="outlined"
          className="rounded-xl!"
          sx={{ textTransform: "none" }}
          onClick={onReset}
        >
          รีเซ็ตตัวกรอง
        </Button>
      </Box>
    </Box>
  );
}
