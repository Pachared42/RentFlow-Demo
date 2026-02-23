"use client";

import * as React from "react";
import Image from "next/image";
import { Box, Card, CardContent, Chip, Rating, Typography } from "@mui/material";
import type { Review } from "@/src/constants/review";

export function ReviewCard({ review }: { review: Review }) {
    const r = review;

    return (
        <Card
            elevation={0}
            sx={{ boxShadow: "none" }}
            className="min-w-75 max-w-90 rounded-2xl! border border-slate-200 bg-white transition hover:border-slate-400"
        >
            <CardContent className="p-5">
                <Box className="flex items-start gap-3">
                    <Box className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-slate-50">
                        <Image
                            src={r.avatar || "/avatars/placeholder.png"}
                            alt={r.name}
                            fill
                            className="object-cover"
                        />
                    </Box>

                    <Box className="min-w-0 flex-1">
                        <Typography className="truncate text-sm font-semibold text-slate-900">
                            {r.name}
                        </Typography>
                        <Typography className="truncate text-xs text-slate-600">
                            {r.role || "ผู้ใช้งาน"}
                        </Typography>
                    </Box>

                    {r.tag ? (
                        <Chip
                            size="small"
                            label={r.tag}
                            className="border! border-slate-200 bg-slate-900/5! text-slate-700!"
                        />
                    ) : null}
                </Box>

                <Box className="mt-3 flex items-center justify-between">
                    <Rating value={r.rating} precision={0.5} readOnly size="small" />
                    <Typography className="text-xs text-slate-500">{r.date}</Typography>
                </Box>

                <Typography className="mt-3 text-sm leading-relaxed text-slate-700">
                    “{r.comment}”
                </Typography>
            </CardContent>
        </Card>
    );
}