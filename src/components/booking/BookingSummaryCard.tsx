"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, Button, Card, CardContent, Divider, Typography } from "@mui/material";
import type { Car } from "@/src/services/cars/cars.types";
import { formatTHB } from "@/src/constants/money";

type Props = {
  car?: Car | null;
  carId: string;
  finalPickupPoint: string;
  pickupDate: string;
  pickupTime: string;
  finalReturnPoint: string;
  returnDate: string;
  returnTime: string;
  days: number;
  addonsTotal: number;
  pricing: {
    discountPct: number;
    subTotal: number;
    discount: number;
    total: number;
  } | null;
  amount: number;
};

export default function BookingSummaryCard({
  car,
  carId,
  finalPickupPoint,
  pickupDate,
  pickupTime,
  finalReturnPoint,
  returnDate,
  returnTime,
  days,
  addonsTotal,
  pricing,
  amount,
}: Props) {
  return (
    <Card
      elevation={0}
      sx={{ boxShadow: "none" }}
      className="lg:col-span-5 rounded-2xl! border border-slate-200 bg-white"
    >
      <CardContent className="p-4!">
        <Typography className="text-sm font-semibold text-slate-900">
          สรุปการจอง
        </Typography>
        <Typography className="mt-1 text-xs text-slate-500">
          ตรวจสอบรถ จุดรับ-คืน และยอดรวมก่อนชำระเงิน
        </Typography>

        <Divider className="my-5! border-slate-200!" />

        {!car ? (
          <Box className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <Typography className="text-sm text-slate-700">
              ไม่พบข้อมูลรถ (รหัสรถ: <span className="font-semibold">{carId || "-"}</span>)
            </Typography>
            <Typography className="mt-2 text-xs text-slate-500">
              กรุณากลับไปเลือกจากหน้า “รถทั้งหมด”
            </Typography>

            <Link href="/cars" className="mt-4 inline-block">
              <Button
                variant="outlined"
                className="rounded-xl!"
                sx={{ textTransform: "none" }}
              >
                กลับไปเลือกรถ
              </Button>
            </Link>
          </Box>
        ) : (
          <Box className="rounded-xl! border border-slate-200 bg-white p-4!">
            <Box className="relative aspect-4/3 overflow-hidden rounded-xl bg-slate-50">
              <Image
                src={car.image || "/RentFlow.png"}
                alt={car.name}
                fill
                className="object-cover"
              />
            </Box>

            <Box className="mt-3 flex items-start justify-between gap-3">
              <Box className="min-w-0">
                <Typography className="truncate text-base font-semibold text-slate-900">
                  {car.name}
                </Typography>
                <Typography className="mt-1 text-xs text-slate-600">
                  {car.type} • {car.seats} ที่นั่ง • {car.transmission} • {car.fuel}
                </Typography>
              </Box>
            </Box>

            <Box className="mb-6! space-y-2 text-sm">
              <Box className="flex items-center justify-between">
                <Typography className="text-slate-600">ราคา/วัน</Typography>
                <Typography className="font-semibold text-slate-900">
                  {formatTHB(car.pricePerDay)} / วัน
                </Typography>
              </Box>

              <Box className="flex items-start justify-between gap-3">
                <Typography className="text-slate-600">รับรถ</Typography>
                <Box className="text-right">
                  <Typography component="div" className="font-semibold text-slate-900">
                    {finalPickupPoint || "-"}
                  </Typography>
                  <Typography component="div" className="text-xs font-normal text-slate-500">
                    {pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : "-"}
                  </Typography>
                </Box>
              </Box>

              <Box className="flex items-start justify-between gap-3">
                <Typography className="text-slate-600">คืนรถ</Typography>
                <Box className="text-right">
                  <Typography component="div" className="font-semibold text-slate-900">
                    {finalReturnPoint || "-"}
                  </Typography>
                  <Typography component="div" className="text-xs font-normal text-slate-500">
                    {returnDate && returnTime ? `${returnDate} ${returnTime}` : "-"}
                  </Typography>
                </Box>
              </Box>

              <Box className="flex items-center justify-between">
                <Typography className="text-slate-600">จำนวนวัน</Typography>
                <Typography className="font-semibold text-slate-900">
                  {days > 0 ? `${days} วัน` : "-"}
                </Typography>
              </Box>

              <Box className="flex items-center justify-between">
                <Box>
                  <Typography className="text-slate-600">
                    บริการเสริมที่เลือก
                  </Typography>
                  {addonsTotal > 0 ? (
                    <Typography className="text-[11px] text-slate-500">
                      ยังไม่รวมในยอดชำระออนไลน์
                    </Typography>
                  ) : null}
                </Box>
                <Typography className="font-semibold text-slate-900">
                  {addonsTotal > 0 ? formatTHB(addonsTotal) : "-"}
                </Typography>
              </Box>

              {pricing ? (
                <>
                  <Box className="flex items-center justify-between">
                    <Typography className="text-slate-600">ยอดก่อนส่วนลด</Typography>
                    <Typography className="font-semibold text-slate-900">
                      {formatTHB(pricing.subTotal)}
                    </Typography>
                  </Box>

                  {pricing.discountPct > 0 ? (
                    <Box className="flex items-center justify-between">
                      <Typography className="text-slate-600">
                        ส่วนลด ({pricing.discountPct}%)
                      </Typography>
                      <Typography className="font-semibold text-emerald-700">
                        -{formatTHB(pricing.discount)}
                      </Typography>
                    </Box>
                  ) : null}
                </>
              ) : null}

              <Box className="flex items-center justify-between">
                <Typography className="text-slate-600">ยอดรวม</Typography>
                <Typography className="text-lg font-bold text-slate-900">
                  {amount > 0 ? formatTHB(amount) : "-"}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
