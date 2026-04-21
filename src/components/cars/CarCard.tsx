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
} from "@mui/material";
import type { Car } from "@/src/services/cars/cars.types";
import { formatTHB } from "@/src/constants/money";
import { getRentFlowStorefrontHref } from "@/src/lib/tenant";

type Props = {
    car: Car;
    showShop?: boolean;
};

export default function CarCard({ car, showShop = false }: Props) {
    const tenantQuery = car.domainSlug
        ? `?tenant=${encodeURIComponent(car.domainSlug)}`
        : "";
    const carHref = `/cars/${encodeURIComponent(car.id)}${tenantQuery}`;
    const bookingHref = `/booking?carId=${encodeURIComponent(car.id)}${
        car.domainSlug ? `&tenant=${encodeURIComponent(car.domainSlug)}` : ""
    }`;
    const shopHref = car.domainSlug
        ? getRentFlowStorefrontHref(car.domainSlug)
        : "";

    return (
        <Card
            elevation={0}
            sx={{ boxShadow: "none" }}
            className="group rounded-2xl! border border-slate-200 bg-white transition hover:border-slate-400!"
        >
            <Box className="relative h-52 w-full overflow-hidden rounded-t-2xl">
                <Image
                    src={car.image || "/RentFlow.png"}
                    alt={car.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </Box>

            <CardContent className="p-6">
                <Box className="flex items-start justify-between gap-3">
                    <Box className="min-w-0">
                        <Typography className="truncate text-lg font-semibold text-slate-900">
                            {car.name}
                        </Typography>
                        <Typography className="text-sm text-slate-600">
                            {car.type} • {car.seats} ที่นั่ง • {car.transmission} • {car.fuel}
                        </Typography>
                    </Box>
                </Box>

                {showShop && car.shopName ? (
                    <Box
                        component={shopHref ? "a" : "span"}
                        href={shopHref || undefined}
                        className="mt-5 block rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700 no-underline transition hover:border-slate-300 hover:bg-white"
                    >
                        <Box className="flex items-end gap-2">
                            <Typography className="text-base font-black tracking-[-0.02em] text-slate-800">
                                ร้านให้เช่า
                            </Typography>
                            <Typography className="truncate text-2xl font-black tracking-[-0.04em] text-slate-950">
                                {car.shopName}
                            </Typography>
                        </Box>
                    </Box>
                ) : null}

                <Box className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <Box className="flex items-end gap-2">
                        <Typography className="text-sm text-slate-600">
                            ราคาเริ่มต้น
                        </Typography>

                        <Typography className="text-2xl font-extrabold text-slate-900">
                            {formatTHB(car.pricePerDay)}
                        </Typography>

                        <Typography className="text-sm text-slate-600">/วัน</Typography>
                    </Box>
                </Box>
            </CardContent>

            <CardActions sx={{ p: "0px 16px 16px" }} className="gap-2">
                <Button
                    component={Link}
                    href={carHref}
                    variant="outlined"
                    fullWidth
                    className="rounded-xl! border-slate-300! text-slate-900!"
                    sx={{ textTransform: "none" }}
                >
                    ดูรายละเอียด
                </Button>

                <Button
                    component={Link}
                    href={bookingHref}
                    variant="contained"
                    fullWidth
                    className="rounded-xl! font-semibold!"
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
