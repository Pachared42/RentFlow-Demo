"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    Divider,
} from "@mui/material";

import type { Car } from "@/constants/car";

type Props = {
    cars: Car[];
    formatTHB: (n: number) => string;
};

export default function CarsSection({ cars, formatTHB }: Props) {
    return (
        <Container maxWidth="lg" className="py-2">
            <Box className="flex items-end justify-between gap-4">
                <Box>
                    <Typography variant="h4" className="font-bold text-slate-900">
                        รถแนะนำ
                    </Typography>
                    <Typography className="text-slate-600">เลือกคันที่ใช่ แล้วกดจองได้เลย</Typography>
                </Box>

                <Chip
                    label={`${cars.length} คัน`}
                    className="bg-slate-900/5! text-slate-700! border border-slate-200!"
                />
            </Box>

            <Box className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cars.map((c) => (
                    <Card
                        key={c.id}
                        elevation={0}
                        sx={{ boxShadow: "none" }}
                        className="group bg-white border border-slate-200 rounded-2xl! transition hover:border-slate-400!"
                    >
                        {/* IMAGE */}
                        <Box className="relative h-52 w-full overflow-hidden rounded-t-2xl">
                            <Image
                                src={c.image || "/placeholder-car.png"}
                                alt={c.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </Box>

                        <CardContent className="p-6">
                            <Box className="flex items-start justify-between gap-3">
                                <Box>
                                    <Typography className="text-lg font-semibold text-slate-900">
                                        {c.name}
                                    </Typography>
                                    <Typography className="text-sm text-slate-600">
                                        {c.type} • {c.seats} ที่นั่ง • {c.transmission} • {c.fuel}
                                    </Typography>
                                </Box>

                                {c.badge && (
                                    <Chip
                                        label={c.badge}
                                        size="small"
                                        className="bg-indigo-500/10! text-indigo-700! border border-indigo-200!"
                                    />
                                )}
                            </Box>

                            <Box className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <Box className="flex items-end gap-2">
                                    <Typography className="text-sm text-slate-600">
                                        ราคาเริ่มต้น
                                    </Typography>

                                    <Typography className="text-2xl font-extrabold text-slate-900">
                                        {formatTHB(c.pricePerDay)}
                                    </Typography>

                                    <Typography className="text-sm text-slate-600">
                                        /วัน
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>

                        <CardActions sx={{ p: "0px 16px 16px" }} className="gap-2">
                            <Button
                                component={Link}
                                href={`/cars/${c.id}`}
                                variant="outlined"
                                fullWidth
                                className="rounded-xl! border-slate-300! text-slate-900!"
                                sx={{ textTransform: "none" }}
                            >
                                ดูรายละเอียด
                            </Button>

                            <Button
                                component={Link}
                                href={`/booking?carId=${c.id}`}
                                variant="contained"
                                fullWidth
                                className="rounded-xl! font-semibold!"
                                sx={{ textTransform: "none", backgroundColor: "rgb(15 23 42)" }}
                            >
                                จองเลย
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
            <Divider className="my-6! border-slate-200!" />
        </Container>
    );
}