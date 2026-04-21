"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";

type Props = {
  detail: {
    name: string;
    type: string;
    seats: number;
    transmission: string;
    fuel: string;
  };
};

export default function CarDetailOverview({ detail }: Props) {
  return (
    <Box className="rounded-2xl border border-slate-200 bg-white p-4!">
      <Typography className="text-sm font-semibold text-slate-900">
        รายละเอียดรถ
      </Typography>
      <Typography className="mt-2 text-sm leading-relaxed text-slate-600">
        รถรุ่น{" "}
        <span className="font-semibold text-slate-900">{detail.name}</span>{" "}
        เหมาะสำหรับการใช้งานประเภท{" "}
        <span className="font-semibold text-slate-900">{detail.type}</span>{" "}
        รองรับ{" "}
        <span className="font-semibold text-slate-900">
          {detail.seats} ที่นั่ง
        </span>{" "}
        พร้อมระบบ{" "}
        <span className="font-semibold text-slate-900">
          {detail.transmission}
        </span>{" "}
        และเชื้อเพลิง{" "}
        <span className="font-semibold text-slate-900">{detail.fuel}</span>.
      </Typography>
    </Box>
  );
}
