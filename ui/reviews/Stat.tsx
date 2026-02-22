"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";

export function Stat({
    className = "",
    label,
    value,
    sub,
}: {
    className?: string;
    label: string;
    value: string;
    sub?: string;
}) {
    return (
        <Box
            className={`rounded-2xl border border-slate-200 bg-white px-4 py-3
      transition-all duration-200 ease-out hover:border-slate-400 ${className}`}
        >
            <Typography className="text-xs text-slate-600">{label}</Typography>
            <Typography className="mt-1 text-lg font-bold text-slate-900">{value}</Typography>
            {sub ? <Typography className="text-xs text-slate-500">{sub}</Typography> : null}
        </Box>
    );
}