"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Box,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Chip,
} from "@mui/material";
import type { Car } from "@/src/services/cars/cars.types";
import { formatTHB } from "@/src/constants/money";

type Props = {
    car: Car;
};

export default function CarCard({ car }: Props) {
    const detailHref = car.domainSlug
        ? `/cars/${encodeURIComponent(car.id)}?tenant=${encodeURIComponent(car.domainSlug)}`
        : `/cars/${encodeURIComponent(car.id)}`;
    const bookingHref = car.domainSlug
        ? `/booking?carId=${encodeURIComponent(car.id)}&tenant=${encodeURIComponent(car.domainSlug)}`
        : `/booking?carId=${encodeURIComponent(car.id)}`;

    return (
        <Card
            elevation={0}
            sx={{ boxShadow: "none" }}
            className="group overflow-hidden rounded-[28px]! border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-slate-300!"
        >
            <Box className="relative h-56 w-full overflow-hidden">
                <Image
                    src={car.image || "/RentFlow.png"}
                    alt={car.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Box className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/5 to-transparent" />
                <Box className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
                    <Chip
                        size="small"
                        label={car.shopName || "RentFlow"}
                        className="border border-white/15! bg-slate-950/55! text-white!"
                    />
                    <Chip
                        size="small"
                        label={car.type}
                        className="border border-white/15! bg-white/85! text-slate-900!"
                    />
                </Box>
                <Box className="absolute inset-x-0 bottom-0 p-4">
                    <Typography className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
                        {car.brand} {car.model}
                    </Typography>
                    <Typography className="mt-1 text-xl font-black text-white">
                        {car.name}
                    </Typography>
                </Box>
            </Box>

            <CardContent className="p-5!">
                <Box className="flex flex-wrap gap-2">
                    <Chip
                        size="small"
                        label={`${car.seats} ที่นั่ง`}
                        className="border border-slate-200! bg-slate-50! text-slate-700!"
                    />
                    <Chip
                        size="small"
                        label={car.transmission}
                        className="border border-slate-200! bg-slate-50! text-slate-700!"
                    />
                    <Chip
                        size="small"
                        label={car.fuel}
                        className="border border-slate-200! bg-slate-50! text-slate-700!"
                    />
                </Box>

                <Box className="mt-4 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                    <Typography className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        ราคาเริ่มต้น
                    </Typography>
                    <Box className="mt-2 flex items-end gap-2">
                        <Typography className="text-3xl font-black text-slate-900">
                            {formatTHB(car.pricePerDay)}
                        </Typography>

                        <Typography className="pb-1 text-sm text-slate-600">/วัน</Typography>
                    </Box>
                    <Typography className="mt-2 text-sm leading-6 text-slate-500">
                        เลือกดูรายละเอียดเพื่อเช็กเงื่อนไขการเช่าและสาขารับรถของคันนี้
                    </Typography>
                </Box>
            </CardContent>

            <CardActions sx={{ p: "0px 20px 20px" }} className="gap-2">
                <Button
                    component={Link}
                    href={detailHref}
                    variant="outlined"
                    fullWidth
                    className="rounded-2xl! border-slate-300! text-slate-900!"
                    sx={{ textTransform: "none" }}
                >
                    ดูรายละเอียด
                </Button>

                <Button
                    component={Link}
                    href={bookingHref}
                    variant="contained"
                    fullWidth
                    className="rounded-2xl! font-semibold!"
                    sx={{
                        textTransform: "none",
                        backgroundColor: "rgb(15 23 42)",
                        "&:hover": {
                            backgroundColor: "rgb(2 6 23)",
                        },
                    }}
                >
                    จองเลย
                </Button>
            </CardActions>
        </Card>
    );
}
