"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Container, Typography, Card, CardContent, Chip, Divider } from "@mui/material";

import { CAR_CLASSES } from "@/constants/classesCar";

export default function CarClassSection() {
    return (
        <Box className="mb-8">
            <Container maxWidth="lg" className="py-2">
                <Box className="flex items-end justify-between gap-4">
                    <Box>
                        <Typography variant="h4" className="font-bold text-slate-900">
                            เลือกตามคลาสรถ
                        </Typography>
                        <Typography className="text-sm text-slate-600">
                            กดการ์ดเพื่อไปหน้ารถตามคลาส
                        </Typography>
                    </Box>
                </Box>

                <Box className="mt-4 grid gap-4 rounded-2xl border border-slate-200 p-4 sm:grid-cols-2 lg:grid-cols-4">
                    {CAR_CLASSES.map((x) => (
                        <Card
                            key={x.slug}
                            component={Link}
                            href={`/classes/${x.slug}`}
                            elevation={0}
                            sx={{ boxShadow: "none" }}
                            className="group cursor-pointer overflow-hidden rounded-xl! border border-slate-200! bg-white! hover:border-slate-400!"
                        >
                            {/* IMAGE */}
                            <Box className="relative h-36 w-full overflow-hidden">
                                <Image
                                    src={x.image}
                                    alt={x.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <Box className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />
                            </Box>

                            <CardContent className="p-5">
                                <Box className="flex items-start justify-between gap-2">
                                    <Typography className="text-sm font-semibold text-slate-900">
                                        {x.title}
                                    </Typography>

                                    <Chip
                                        size="small"
                                        label={x.tag}
                                        className="bg-indigo-500/10! text-indigo-700! border border-indigo-200!"
                                    />
                                </Box>

                                <Typography className="mt-1 text-xs text-slate-600">
                                    {x.desc}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
                <Divider className="my-6! border-slate-200!" />
            </Container>
        </Box>
    );
}