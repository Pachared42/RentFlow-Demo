"use client";

import * as React from "react";
import { Box, Chip, Typography } from "@mui/material";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "marketplace";
  action?: React.ReactNode;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  action,
}: Props) {
  const isCentered = align === "center";
  const isMarketplace = tone === "marketplace";

  return (
    <Box
      className={[
        "flex gap-4",
        isCentered
          ? "flex-col items-center text-center"
          : "flex-col sm:flex-row sm:items-end sm:justify-between",
      ].join(" ")}
    >
      <Box className={isCentered ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow ? (
          <Chip
            size="small"
            label={eyebrow}
            className={[
              "mb-3 border!",
              isMarketplace
                ? "border-amber-300! bg-amber-50! text-amber-800!"
                : "border-slate-200! bg-slate-50! text-slate-700!",
            ].join(" ")}
          />
        ) : null}

        <Typography
          className="font-black tracking-tight text-slate-900"
          sx={{ fontSize: { xs: "26px", md: "34px" }, lineHeight: 1.08 }}
        >
          {title}
        </Typography>

        {description ? (
          <Typography className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
            {description}
          </Typography>
        ) : null}
      </Box>

      {action ? <Box>{action}</Box> : null}
    </Box>
  );
}
