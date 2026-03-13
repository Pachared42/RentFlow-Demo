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
import type { Car } from "@/src/constants/cars";
import { formatTHB } from "@/src/constants/money";

type Props = {
    car: Car;
};

export default function CarCard({ car }: Props) {
    return (
        <Card
            elevation={0}
            sx={{ boxShadow: "none" }}
            className="group rounded-2xl! border border-slate-200 bg-white transition hover:border-slate-400!"
        >
            <Box className="relative h-52 w-full overflow-hidden rounded-t-2xl">
                <Image
                    src={car.image || "/cars/placeholder.jpg"}
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

                <Box className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
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
                    href={`/cars/${encodeURIComponent(car.id)}`}
                    variant="outlined"
                    fullWidth
                    className="rounded-xl! border-slate-300! text-slate-900!"
                    sx={{ textTransform: "none" }}
                >
                    ดูรายละเอียด
                </Button>

                <Button
                    component={Link}
                    href={`/booking?carId=${encodeURIComponent(car.id)}`}
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