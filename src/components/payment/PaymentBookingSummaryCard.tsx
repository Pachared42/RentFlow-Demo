"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import type { Car } from "@/src/services/cars/cars.types";
import { formatTHB } from "@/src/constants/money";
import { ADDONS, type AddonKey } from "@/src/utils/payment/payment.helpers";

type Props = {
  bookingId: string;
  carId: string;
  car?: Car;
  days: number;
  pickupDate: string;
  returnDate: string;
  pickupPoint: string;
  returnPoint: string;
  pickupTime: string;
  returnTime: string;
  amount: number;
  addonKeys: AddonKey[];
  addonsTotal: number;
  carSubTotal: number;
  carNet: number;
  carDiscount: number;
  discountPct: number;
  extraCharge: number;
};

export default function PaymentBookingSummaryCard({
  bookingId,
  carId,
  car,
  days,
  pickupDate,
  returnDate,
  pickupPoint,
  returnPoint,
  pickupTime,
  returnTime,
  amount,
  addonKeys,
  addonsTotal,
  carSubTotal,
  carNet,
  carDiscount,
  discountPct,
  extraCharge,
}: Props) {
  return (
    <Card
      elevation={0}
      className="apple-card order-2 lg:order-1 lg:col-span-5"
    >
      <CardContent className="p-5! md:p-6!">
        <Typography className="text-sm font-semibold tracking-[-0.03em] text-slate-900">
          สรุปการจอง
        </Typography>
        <Typography className="mt-1 text-sm text-[var(--rf-apple-muted)]">
          ตรวจสอบรายละเอียดรถ ช่วงเวลา และยอดรวมก่อนยืนยันการชำระเงิน
        </Typography>

        <Box className="mt-4 rounded-[22px] bg-[var(--rf-apple-surface-soft)] p-4">
          <Box className="flex items-center justify-between">
            <Typography className="text-sm text-slate-600">
              รหัสการจอง
            </Typography>
            <Typography className="text-sm font-semibold text-slate-900">
              {bookingId}
            </Typography>
          </Box>

          {(pickupPoint || returnPoint || pickupDate || returnDate) && (
            <Box className="mt-3 rounded-[18px] bg-white p-3">
              <Box className="grid gap-2">
                <Box className="flex items-start justify-between gap-3">
                  <Typography className="text-xs font-semibold text-slate-600">
                    จุดรับรถ
                  </Typography>
                  <Box className="text-right">
                    <Typography
                      component="div"
                      className="text-sm font-bold text-slate-900"
                    >
                      {pickupPoint || "-"}
                    </Typography>
                    <Typography
                      component="div"
                      className="text-xs text-slate-500"
                    >
                      {pickupDate
                        ? `${pickupDate}${pickupTime ? ` ${pickupTime}` : ""}`
                        : "-"}
                    </Typography>
                  </Box>
                </Box>

                <Divider className="border-black/10!" />

                <Box className="flex items-start justify-between gap-3">
                  <Typography className="text-xs font-semibold text-slate-600">
                    จุดคืนรถ
                  </Typography>
                  <Box className="text-right">
                    <Typography
                      component="div"
                      className="text-sm font-bold text-slate-900"
                    >
                      {returnPoint || "-"}
                    </Typography>
                    <Typography
                      component="div"
                      className="text-xs text-slate-500"
                    >
                      {returnDate
                        ? `${returnDate}${returnTime ? ` ${returnTime}` : ""}`
                        : "-"}
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex items-center justify-between pt-1">
                  <Typography className="text-xs text-slate-600">
                    จำนวนวัน
                  </Typography>
                  <Typography className="text-xs font-bold text-slate-900">
                    {days ? `${days} วัน` : "-"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          {carSubTotal > 0 ? (
            <>
              <Box className="mt-3 flex items-center justify-between">
                <Typography className="text-sm text-slate-600">
                  ราคาเต็ม (รถ)
                </Typography>
                <Typography
                  component="div"
                  className="text-sm font-semibold text-slate-500 line-through"
                >
                  {formatTHB(carSubTotal)}
                </Typography>
              </Box>

              <Box className="mt-2 flex items-center justify-between">
                <Typography className="text-sm text-slate-600">
                  ยอดรถสุทธิ
                </Typography>
                <Typography className="text-sm font-bold text-slate-900">
                  {formatTHB(carNet)}
                </Typography>
              </Box>

              {carDiscount > 0 ? (
                <Box className="mt-3 rounded-[18px] bg-emerald-50 px-4 py-3">
                  <Box className="flex items-center justify-between">
                    <Typography className="text-sm font-bold text-emerald-900">
                      คุณประหยัดไป
                    </Typography>
                    <Typography className="text-lg font-black text-emerald-800">
                      -{formatTHB(carDiscount)} ({discountPct}%)
                    </Typography>
                  </Box>
                </Box>
              ) : null}

              {addonKeys.length > 0 ? (
                <Box className="mt-3 space-y-2">
                  <Divider className="mb-2! border-black/10!" />

                  <Box className="flex items-center justify-between">
                    <Typography className="text-sm font-semibold text-slate-800">
                      บริการเสริมที่เลือก
                    </Typography>
                    <Typography className="text-sm font-bold text-slate-900">
                      {formatTHB(addonsTotal)}
                    </Typography>
                  </Box>

                  <Typography className="text-xs text-slate-500">
                    ราคาส่วนนี้ยังไม่ถูกรวมในยอดชำระออนไลน์อัตโนมัติ
                  </Typography>

                  <Box className="space-y-1">
                    {addonKeys.map((key) => {
                      const addon = ADDONS.find((x) => x.key === key);
                      if (!addon) return null;

                      const priceText =
                        addon.pricing === "perDay"
                          ? `${formatTHB(addon.price)} / วัน`
                          : `${formatTHB(addon.price)} / ครั้ง`;

                      return (
                        <Box
                          key={key}
                          className="flex items-start justify-between gap-3"
                        >
                          <Typography className="text-xs text-slate-600">
                            • {addon.title}
                          </Typography>
                          <Typography className="whitespace-nowrap text-xs font-semibold text-slate-700">
                            {priceText}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              ) : null}

              {extraCharge > 0 ? (
                <Box className="mt-3 flex items-center justify-between">
                  <Typography className="text-sm text-slate-600">
                    ค่าบริการเพิ่ม
                  </Typography>
                  <Typography className="text-sm font-semibold text-slate-900">
                    {formatTHB(extraCharge)}
                  </Typography>
                </Box>
              ) : null}

              <Box className="mt-3 flex items-center justify-between">
                <Typography className="text-sm text-slate-600">
                  ยอดชำระ
                </Typography>
                <Typography className="text-lg font-bold text-slate-900">
                  {formatTHB(amount)}
                </Typography>
              </Box>
            </>
          ) : (
            <Box className="mt-2 flex items-center justify-between">
              <Typography className="text-sm text-slate-600">
                ยอดชำระ
              </Typography>
              <Typography className="text-lg font-bold text-slate-900">
                {formatTHB(amount)}
              </Typography>
            </Box>
          )}
        </Box>

        <Divider className="my-5! border-black/10!" />

        {car ? (
          <Box className="rounded-[22px] bg-[var(--rf-apple-surface-soft)] p-4">
            <Box className="relative aspect-4/3 overflow-hidden rounded-[18px] bg-white">
              <Image
                src={car.image || "/RentFlow.png"}
                alt={car.name}
                fill
                className="object-cover"
              />
            </Box>

            <Box className="mt-3 flex items-start justify-between gap-3">
              <Box className="min-w-0">
                <Typography className="truncate text-sm font-semibold text-slate-900">
                  {car.name}
                </Typography>
                <Typography className="mt-1 text-xs text-slate-600">
                  {car.type} • {car.seats} ที่นั่ง • {car.transmission} •{" "}
                  {car.fuel}
                </Typography>
              </Box>
            </Box>

            <Divider className="my-4! border-black/10!" />

            <Box className="flex items-center justify-between">
              <Typography className="text-sm text-slate-600">
                ราคา/วัน
              </Typography>
              <Typography className="text-sm font-semibold text-slate-900">
                {formatTHB(car.pricePerDay)}
              </Typography>
            </Box>

            <Link
              href={`/cars/${encodeURIComponent(car.id)}`}
              className="mt-4 block"
            >
              <Button
                fullWidth
                variant="outlined"
                className="rounded-full!"
                sx={{ textTransform: "none" }}
              >
                ดูรายละเอียดรถ
              </Button>
            </Link>
          </Box>
        ) : (
          <Box className="rounded-[22px] bg-[var(--rf-apple-surface-soft)] p-4">
            <Typography className="text-sm text-slate-600">
              ไม่พบข้อมูลรถ (carId:{" "}
              <span className="font-semibold">{carId || "-"}</span>)
            </Typography>

            <Link href="/cars" className="mt-3 inline-block">
              <Button
                variant="outlined"
                className="rounded-full!"
                sx={{ textTransform: "none" }}
              >
                กลับไปเลือกรถ
              </Button>
            </Link>
          </Box>
        )}

        <Divider className="my-5! border-black/10!" />

        <Box className="rounded-[22px] bg-[var(--rf-apple-surface-soft)] px-4 py-3">
          <Typography className="text-xs leading-6 text-slate-500">
            แนะนำ: หากชำระแล้วไม่ขึ้นสถานะ ให้ติดต่อทีมงานพร้อมรหัสการจอง
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
