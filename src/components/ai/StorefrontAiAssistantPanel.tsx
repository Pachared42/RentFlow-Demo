"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

import SectionHeading from "@/src/components/common/SectionHeading";
import { formatTHB } from "@/src/constants/money";
import { getRentFlowSiteMode } from "@/src/lib/tenant";
import { aiService } from "@/src/services/ai/ai.service";
import type {
  StorefrontAssistantRecommendation,
  StorefrontAssistantResult,
} from "@/src/services/ai/ai.types";

const STORE_PROMPTS = [
  "อยากได้รถสำหรับไปทะเล 4 คน งบไม่เกิน 2500 บาทต่อวัน",
  "มีผู้ใหญ่ 2 เด็ก 2 อยากได้รถนั่งสบายสำหรับเดินทางไกล",
  "ช่วยแนะนำรถประหยัดน้ำมันสำหรับใช้งานในเมือง",
];

const MARKETPLACE_PROMPTS = [
  "ช่วยหารถจากหลายร้านสำหรับทริปครอบครัว 5 คน",
  "อยากได้ SUV ในงบไม่เกิน 3000 บาทต่อวัน",
  "มีสัมภาระเยอะ อยากได้รถนั่งสบายและเทียบหลายร้าน",
];

function RecommendationCard({
  item,
}: {
  item: StorefrontAssistantRecommendation;
}) {
  const detailHref = item.domainSlug
    ? `/cars/${encodeURIComponent(item.id)}?tenant=${encodeURIComponent(item.domainSlug)}`
    : `/cars/${encodeURIComponent(item.id)}`;
  const bookingHref = item.domainSlug
    ? `/booking?carId=${encodeURIComponent(item.id)}&tenant=${encodeURIComponent(item.domainSlug)}`
    : `/booking?carId=${encodeURIComponent(item.id)}`;

  return (
    <Card
      elevation={0}
      className="overflow-hidden rounded-[28px]! border border-slate-200 bg-white"
    >
      <Box className="relative h-48 overflow-hidden bg-slate-100">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : null}
        <Box className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/5 to-transparent" />
        <Box className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-4">
          <Chip
            size="small"
            label={item.shopName || "RentFlow"}
            className="border border-white/15! bg-slate-950/55! text-white!"
          />
          <Chip
            size="small"
            label={item.type}
            className="border border-white/15! bg-white/85! text-slate-900!"
          />
        </Box>
        <Box className="absolute inset-x-0 bottom-0 p-4">
          <Typography className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
            {item.brand} {item.model}
          </Typography>
          <Typography className="mt-1 text-xl font-black text-white">
            {item.name}
          </Typography>
        </Box>
      </Box>

      <CardContent className="p-5!">
        <Stack direction="row" spacing={1} className="flex-wrap">
          <Chip
            size="small"
            label={`${item.seats} ที่นั่ง`}
            className="border border-slate-200! bg-slate-50! text-slate-700!"
          />
          <Chip
            size="small"
            label={item.transmission}
            className="border border-slate-200! bg-slate-50! text-slate-700!"
          />
          <Chip
            size="small"
            label={item.fuel}
            className="border border-slate-200! bg-slate-50! text-slate-700!"
          />
        </Stack>

        <Box className="mt-4 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
          <Typography className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            ราคาเริ่มต้น
          </Typography>
          <Typography className="mt-2 text-3xl font-black text-slate-900">
            {formatTHB(item.pricePerDay)}
          </Typography>
        </Box>

        <Box className="mt-4 grid gap-2">
          {item.reasons.map((reason) => (
            <Box
              key={reason}
              className="rounded-2xl bg-amber-50 px-3 py-2 text-sm text-amber-900"
            >
              {reason}
            </Box>
          ))}
        </Box>

        <Box className="mt-5 grid gap-2 sm:grid-cols-2">
          <Button
            component={Link}
            href={detailHref}
            variant="outlined"
            className="rounded-2xl! border-slate-300! text-slate-900!"
            sx={{ textTransform: "none" }}
          >
            ดูรายละเอียด
          </Button>
          <Button
            component={Link}
            href={bookingHref}
            variant="contained"
            className="rounded-2xl! font-semibold!"
            sx={{
              textTransform: "none",
              backgroundColor: "#0f172a",
              "&:hover": { backgroundColor: "#020617" },
            }}
          >
            จองต่อ
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function StorefrontAiAssistantPanel({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const siteMode = React.useMemo(() => getRentFlowSiteMode(), []);
  const prompts =
    siteMode === "marketplace" ? MARKETPLACE_PROMPTS : STORE_PROMPTS;

  const [query, setQuery] = React.useState(prompts[0]);
  const [result, setResult] = React.useState<StorefrontAssistantResult | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const submit = React.useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      setError("กรุณากรอกคำอธิบายทริปหรือสิ่งที่คุณต้องการก่อน");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await aiService.askStorefrontAssistant(trimmed);
      setResult(response);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "ยังไม่สามารถเรียกผู้ช่วยเลือกได้"
      );
    } finally {
      setLoading(false);
    }
  }, [query]);

  return (
    <Box className={embedded ? "" : "py-6"}>
      <SectionHeading
        eyebrow={siteMode === "marketplace" ? "AI สำหรับ marketplace" : "AI สำหรับหน้าร้าน"}
        title={
          siteMode === "marketplace"
            ? "ผู้ช่วยเลือกและเทียบรถจากหลายร้าน"
            : "ผู้ช่วยเลือกคันที่เหมาะกับทริปของคุณ"
        }
        description={
          siteMode === "marketplace"
            ? "อธิบายทริปเป็นภาษาคน แล้วระบบจะสรุปเงื่อนไขและคัดรถจากหลายร้านให้ในหน้าเดียว"
            : "พิมพ์ความต้องการของคุณ แล้วระบบจะช่วยคัดรถของร้านนี้ให้แคบและตรงขึ้น"
        }
        tone={siteMode === "marketplace" ? "marketplace" : "default"}
      />

      <Box className="mt-8 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <Card
          elevation={0}
          className="rounded-[32px]! border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
        >
          <CardContent className="p-6!">
            <Stack direction="row" spacing={2} className="items-start">
              <Box className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white">
                <AutoAwesomeRoundedIcon />
              </Box>
              <Box>
                <Typography className="text-xl font-black text-slate-950">
                  ลองอธิบายแบบที่คุยกับคนจริง
                </Typography>
                <Typography className="mt-1 text-sm leading-7 text-slate-600">
                  เช่น จำนวนคน งบประมาณ สไตล์ทริป หรือความต้องการพิเศษ
                  ระบบจะสรุปเงื่อนไขจากฐานข้อมูลร้านให้ทันที
                </Typography>
              </Box>
            </Stack>

            <TextField
              label="บอกสิ่งที่ต้องการ"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              fullWidth
              multiline
              minRows={4}
              className="mt-5"
              placeholder="เช่น อยากได้รถสำหรับไปทะเล 4 คน งบไม่เกิน 2500 บาทต่อวัน"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "18px" } }}
            />

            <Stack direction="row" spacing={1} className="mt-4 flex-wrap">
              {prompts.map((prompt) => (
                <Chip
                  key={prompt}
                  label={prompt}
                  onClick={() => setQuery(prompt)}
                  className="cursor-pointer border border-slate-200! bg-slate-50! text-slate-700!"
                />
              ))}
            </Stack>

            {error ? (
              <Alert severity="error" className="mt-4 rounded-2xl!">
                {error}
              </Alert>
            ) : null}

            <Box className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button
                variant="contained"
                className="rounded-2xl! px-6 py-3 font-semibold!"
                sx={{
                  minHeight: 48,
                  textTransform: "none",
                  backgroundColor: "#0f172a",
                  "&:hover": { backgroundColor: "#020617" },
                }}
                endIcon={
                  loading ? <CircularProgress size={16} color="inherit" /> : <TravelExploreRoundedIcon />
                }
                onClick={submit}
                disabled={loading}
              >
                {loading ? "กำลังคัดรถให้..." : "ให้ AI ช่วยเลือก"}
              </Button>

              {!embedded ? (
                <Button
                  component={Link}
                  href="/cars"
                  variant="outlined"
                  className="rounded-2xl! border-slate-300! text-slate-900!"
                  sx={{ minHeight: 48, textTransform: "none" }}
                  endIcon={<ArrowOutwardRoundedIcon />}
                >
                  ดูรายการรถทั้งหมด
                </Button>
              ) : null}
            </Box>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          className="rounded-[32px]! border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
        >
          <CardContent className="p-6!">
            {result ? (
              <Box>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  className="items-start justify-between"
                >
                  <Box>
                    <Typography className="text-xl font-black text-slate-950">
                      คำแนะนำจากผู้ช่วยเลือก
                    </Typography>
                    <Typography className="mt-1 text-sm leading-7 text-slate-600">
                      {result.summary}
                    </Typography>
                  </Box>

                  <Chip
                    label={result.provider}
                    className="border border-slate-200! bg-slate-50! text-slate-700!"
                  />
                </Stack>

                <Stack direction="row" spacing={1} className="mt-4 flex-wrap">
                  {result.criteria.carType ? (
                    <Chip
                      label={`ประเภท ${result.criteria.carType}`}
                      className="border border-amber-200! bg-amber-50! text-amber-900!"
                    />
                  ) : null}
                  {result.criteria.minSeats ? (
                    <Chip
                      label={`${result.criteria.minSeats}+ ที่นั่ง`}
                      className="border border-amber-200! bg-amber-50! text-amber-900!"
                    />
                  ) : null}
                  {result.criteria.budgetPerDay ? (
                    <Chip
                      label={`งบ ${formatTHB(result.criteria.budgetPerDay)}/วัน`}
                      className="border border-amber-200! bg-amber-50! text-amber-900!"
                    />
                  ) : null}
                </Stack>

                <Box className="mt-5 grid gap-3">
                  {result.quickHints.map((hint) => (
                    <Box
                      key={hint}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600"
                    >
                      {hint}
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : (
              <Box className="grid min-h-[280px] place-items-center text-center">
                <Box className="max-w-md">
                  <Box className="mx-auto grid h-16 w-16 place-items-center rounded-[24px] bg-slate-900 text-white">
                    <AutoAwesomeRoundedIcon fontSize="large" />
                  </Box>
                  <Typography className="mt-5 text-xl font-black text-slate-950">
                    ยังไม่มีผลลัพธ์
                  </Typography>
                  <Typography className="mt-2 text-sm leading-7 text-slate-600">
                    ลองพิมพ์สิ่งที่ต้องการ เช่น จำนวนคน งบประมาณ
                    หรือสไตล์ทริป แล้วผู้ช่วยจะคัดรถจากข้อมูลในระบบให้ทันที
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {result?.recommendedCars?.length ? (
        <Box className="mt-8">
          <Typography className="text-2xl font-black text-slate-950">
            รถที่ AI คัดให้ดูต่อ
          </Typography>
          <Typography className="mt-2 text-sm text-slate-600">
            แต่ละคันจะแสดงเหตุผลว่าทำไมถึงถูกเลือกมาให้ตรงกับคำถามของคุณ
          </Typography>

          <Box className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {result.recommendedCars.map((item) => (
              <RecommendationCard key={`${item.id}-${item.shopName}`} item={item} />
            ))}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}
