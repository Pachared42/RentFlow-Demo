"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Chip,
  Button,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { toTHBText } from "@/src/utils/car-detail/carDetail.format";

type Props = {
  detail: {
    id: string;
    name: string;
    type: string;
    seats: number;
    transmission: string;
    fuel: string;
    pricePerDay: number;
  };
};

export default function CarDetailSummaryCard({ detail }: Props) {
  const router = useRouter();

  return (
    <Card
      elevation={0}
      sx={{ boxShadow: "none" }}
      className="lg:col-span-5 rounded-2xl! border border-slate-200 bg-white"
    >
      <CardContent className="p-4!">
        <Box className="flex items-start justify-between gap-3">
          <Box className="min-w-0">
            <Typography className="truncate text-xl font-bold text-slate-900">
              {detail.name}
            </Typography>
            <Typography className="mt-2 text-sm text-slate-600">
              {detail.type} • {detail.seats} ที่นั่ง • {detail.transmission} •{" "}
              {detail.fuel}
            </Typography>
          </Box>
        </Box>

        <Box className="mt-3 flex items-center gap-2">
          <Chip
            size="small"
            icon={<VerifiedRoundedIcon fontSize="small" />}
            label="ตรวจเช็คก่อนส่งมอบ"
            variant="outlined"
            className="border! border-slate-200! bg-white! text-slate-700!"
            sx={{ ml: 1 }}
          />
        </Box>

        <Divider className="my-5! border-slate-200!" />

        <Box className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <Typography className="text-sm text-slate-600">
            ราคาเริ่มต้น
          </Typography>
          <Box className="mt-1 flex items-end gap-2">
            <Typography className="text-3xl font-extrabold text-slate-900">
              {toTHBText(detail.pricePerDay)}
            </Typography>
            <Typography className="text-sm font-medium text-slate-600">
              / วัน
            </Typography>
          </Box>
        </Box>

        <Box className="mt-5 grid gap-2">
          <Button
            fullWidth
            variant="contained"
            className="rounded-xl! py-2.5! font-semibold!"
            sx={{ textTransform: "none", backgroundColor: "rgb(15 23 42)" }}
            onClick={() =>
              router.push(`/booking?carId=${encodeURIComponent(detail.id)}`)
            }
          >
            จองคันนี้
          </Button>

          <Button
            fullWidth
            variant="outlined"
            className="rounded-xl! py-2.5!"
            sx={{ textTransform: "none" }}
            onClick={() => router.push("/cars")}
          >
            ดูรถคันอื่น
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
