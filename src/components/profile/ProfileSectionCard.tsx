"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";

export default function ProfileSectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Box className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <Box className="mb-4 flex items-center gap-2">
        {icon ? (
          <Box className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700">
            {icon}
          </Box>
        ) : null}
        <Typography className="text-base font-bold text-slate-900">
          {title}
        </Typography>
      </Box>

      <Box className="grid gap-3">{children}</Box>
    </Box>
  );
}