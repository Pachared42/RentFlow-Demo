"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";

import { formatTHB } from "@/src/constants/money";
import { getErrorMessage } from "@/src/lib/api-error";
import { getRentFlowSiteMode } from "@/src/lib/tenant";
import { aiService } from "@/src/services/ai/ai.service";
import type {
  StorefrontAssistantRecommendation,
  StorefrontAssistantResult,
} from "@/src/services/ai/ai.types";

const SUGGESTIONS = [
  "อยากได้ SUV 5 คน งบไม่เกิน 3000 บาท",
  "ช่วยเลือกรถสำหรับเที่ยวทะเล 4 คน",
  "อยากได้รถประหยัดน้ำมันใช้งานในเมือง",
];

function RecommendationItem({
  car,
}: {
  car: StorefrontAssistantRecommendation;
}) {
  const detailHref = car.domainSlug
    ? `/cars/${encodeURIComponent(car.id)}?tenant=${encodeURIComponent(car.domainSlug)}`
    : `/cars/${encodeURIComponent(car.id)}`;

  return (
    <Box className="rounded-[22px] bg-[var(--rf-apple-surface-soft)] p-3">
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box className="relative h-14 w-16 shrink-0 overflow-hidden rounded-[18px] bg-white">
          {car.image ? (
            <Image src={car.image} alt={car.name} fill className="object-cover" />
          ) : (
            <Box className="grid h-full place-items-center text-[var(--rf-apple-muted)]">
              <DirectionsCarRoundedIcon fontSize="small" />
            </Box>
          )}
        </Box>

        <Box className="min-w-0 flex-1">
          <Typography className="truncate text-sm font-bold text-[var(--rf-apple-ink)]">
            {car.name}
          </Typography>
          <Typography className="text-xs text-[var(--rf-apple-muted)]">
            {car.seats} ที่นั่ง • {car.type} • {formatTHB(car.pricePerDay)}/วัน
          </Typography>
        </Box>
      </Stack>

      <Box className="mt-2 flex flex-wrap gap-1.5">
        {car.reasons.slice(0, 3).map((reason) => (
          <Chip
            key={reason}
            size="small"
            label={reason}
            className="h-6! bg-white! text-[11px]! text-[var(--rf-apple-muted)]!"
          />
        ))}
      </Box>

      <Button
        component={Link}
        href={detailHref}
        size="small"
        fullWidth
        className="mt-3 rounded-full!"
        variant="outlined"
        sx={{ textTransform: "none" }}
      >
        ดูรายละเอียดรถ
      </Button>
    </Box>
  );
}

export default function FloatingAiChat() {
  const [open, setOpen] = React.useState(false);
  const [showHint, setShowHint] = React.useState(true);
  const [query, setQuery] = React.useState(SUGGESTIONS[0]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState<StorefrontAssistantResult | null>(
    null
  );
  const siteMode = React.useMemo(() => getRentFlowSiteMode(), []);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowHint(false);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  const ask = React.useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed || loading) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await aiService.askStorefrontAssistant(trimmed);
      setResult(response);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "ยังไม่สามารถเรียกผู้ช่วย AI ได้"));
    } finally {
      setLoading(false);
    }
  }, [loading, query]);

  return (
    <Box className="fixed bottom-5 right-5 z-50 md:bottom-7 md:right-7">
      <Paper
        elevation={0}
        className={`absolute bottom-0 right-0 w-[calc(100vw-40px)] max-w-[420px] overflow-hidden rounded-[30px]! border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)] transform-gpu will-change-[transform,opacity,filter] transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "pointer-events-auto translate-y-0 scale-[1] opacity-100 blur-0"
            : "pointer-events-none translate-y-3 scale-[0.985] opacity-0 blur-[6px]"
        }`}
        sx={{
          transformOrigin: "bottom right",
        }}
      >
          <Box className="bg-[var(--rf-apple-ink)] px-5 py-4 text-white">
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
                <AutoAwesomeRoundedIcon />
              </Box>
              <Box className="min-w-0 flex-1">
                <Typography className="text-sm font-bold">
                  ผู้ช่วยเลือก RentFlow
                </Typography>
                <Typography className="text-xs text-white/65">
                  {siteMode === "marketplace"
                    ? "ช่วยเทียบรถจากหลายร้าน"
                    : "ช่วยเลือกรถจากร้านนี้"}
                </Typography>
              </Box>
              <IconButton
                aria-label="ปิดผู้ช่วย AI"
                onClick={() => setOpen(false)}
                className="text-white! transition-transform duration-300 ease-out hover:scale-105"
                size="small"
              >
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          <Box className="min-h-[360px] max-h-[70vh] overflow-y-auto p-5">
            <Box className="rounded-[22px] bg-[var(--rf-apple-surface-soft)] p-3">
              <Typography className="text-sm leading-6 text-[var(--rf-apple-muted)]">
                บอกจำนวนคน งบประมาณ หรือสไตล์ทริป แล้ว AI จะช่วยคัดรถที่เหมาะให้
              </Typography>
            </Box>

            <Box className="mt-4 grid gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((suggestion) => (
                <Chip
                  key={suggestion}
                  size="small"
                  label={suggestion}
                  onClick={() => setQuery(suggestion)}
                  className={`h-auto! min-h-11! w-full! cursor-pointer justify-start! rounded-[18px]! border px-2! py-2! text-left! text-[12px]! font-bold! leading-5! transition-transform duration-1000 ease-[cubic-bezier(0.18,0.9,0.22,1)] hover:scale-[1.006] ${
                    query === suggestion
                      ? "border-[var(--rf-apple-blue)]! bg-[var(--rf-apple-blue)]! text-white!"
                      : "border-black/10! bg-[var(--rf-apple-surface-soft)]! text-[var(--rf-apple-ink)]! hover:bg-white!"
                  }`}
                  sx={{
                    "& .MuiChip-label": {
                      display: "block",
                      overflow: "visible",
                      whiteSpace: "normal",
                    },
                  }}
                />
              ))}
            </Box>

            {result ? (
              <Box className="mt-4 rounded-[22px] bg-[var(--rf-apple-surface-soft)] p-3">
                <Typography className="text-sm font-bold text-[var(--rf-apple-ink)]">
                  คำแนะนำ
                </Typography>
                <Typography className="mt-1 text-sm leading-6 text-[var(--rf-apple-muted)]">
                  {result.summary}
                </Typography>

                {result.recommendedCars.length ? (
                  <Box className="mt-3 grid gap-2">
                    {result.recommendedCars.slice(0, 2).map((car) => (
                      <RecommendationItem key={`${car.id}-${car.domainSlug}`} car={car} />
                    ))}
                  </Box>
                ) : (
                  <Typography className="mt-3 text-sm text-[var(--rf-apple-muted)]">
                    ยังไม่มีรถที่ตรงกับเงื่อนไขในตอนนี้
                  </Typography>
                )}
              </Box>
            ) : null}

            {error ? (
              <Box className="mt-3 rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </Box>
            ) : null}
          </Box>

          <Box className="border-t border-black/10 p-4">
            <Stack direction="row" spacing={1}>
              <TextField
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void ask();
                  }
                }}
                placeholder="พิมพ์สิ่งที่ต้องการ..."
                size="small"
                fullWidth
                multiline
                maxRows={3}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "18px" } }}
              />
              <IconButton
                aria-label="ส่งคำถามให้ AI"
                onClick={() => void ask()}
                disabled={loading || !query.trim()}
                className="h-10 w-10 rounded-full! bg-[var(--rf-apple-blue)]! text-white! transition-transform duration-300 ease-out hover:scale-105 disabled:bg-black/10!"
              >
                {loading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <SendRoundedIcon fontSize="small" />
                )}
              </IconButton>
            </Stack>
          </Box>
      </Paper>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        className={`will-change-[opacity] transition-opacity duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "pointer-events-none opacity-0"
            : "pointer-events-auto opacity-100"
        }`}
      >
          <Box
            className={`hidden rounded-[20px] border border-black/10 bg-white px-4 py-2 text-right shadow-[0_14px_40px_rgba(0,0,0,0.12)] transition-all duration-500 sm:block ${
              !open && showHint
                ? "translate-x-0 opacity-100"
                : "pointer-events-none translate-x-3 opacity-0"
            }`}
          >
            <Typography className="text-sm font-bold text-[var(--rf-apple-ink)]">
              AI ช่วยเลือก
            </Typography>
            <Typography className="text-xs text-[var(--rf-apple-muted)]">
              แนะนำรถให้เหมาะกับทริป
            </Typography>
          </Box>
          <IconButton
            aria-label="เปิดผู้ช่วย AI"
            onClick={() => setOpen(true)}
            className="h-16 w-16 rounded-full! bg-[var(--rf-apple-ink)]! text-white! shadow-[0_18px_48px_rgba(0,0,0,0.28)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] hover:bg-black!"
          >
            <svg width="0" height="0" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="ai-floating-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="28%" stopColor="#a78bfa" />
                  <stop offset="52%" stopColor="#fb7185" />
                  <stop offset="76%" stopColor="#facc15" />
                  <stop offset="100%" stopColor="#34d399" />
                  <animateTransform
                    attributeName="gradientTransform"
                    type="rotate"
                    from="0 0.5 0.5"
                    to="360 0.5 0.5"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </linearGradient>
              </defs>
            </svg>
            <AutoAwesomeRoundedIcon
              sx={{
                fontSize: 40,
                "& path": { fill: "url(#ai-floating-icon-gradient)" },
              }}
            />
          </IconButton>
      </Stack>
    </Box>
  );
}
