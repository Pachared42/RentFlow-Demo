"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import type { Car } from "@/src/services/cars/cars.types";
import CarCard from "./CarCard";

type Props = {
    cars: Car[];
};

export default function CarGrid({ cars }: Props) {
    if (cars.length === 0) {
        return (
            <Box className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
                <Typography className="text-sm font-semibold text-slate-900">
                    ไม่พบรถที่ตรงกับเงื่อนไข
                </Typography>
                <Typography className="mt-1 text-sm text-slate-600">
                    ลองเปลี่ยนคำค้นหา หรือเลือกประเภทอื่น
                </Typography>
            </Box>
        );
    }

    return (
        <Box className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {cars.map((car) => (
                <CarCard key={car.id} car={car} />
            ))}
        </Box>
    );
}
