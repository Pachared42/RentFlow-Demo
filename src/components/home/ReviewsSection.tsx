"use client";

import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import AppSnackbar, {
  type AppSnackbarSeverity,
} from "@/src/components/common/AppSnackbar";
import SectionHeading from "@/src/components/common/SectionHeading";
import { getErrorMessage } from "@/src/lib/api-error";
import { getRentFlowSiteMode } from "@/src/lib/tenant";
import { reviewsApi } from "@/src/services/reviews/reviews.service";
import type { Review } from "@/src/services/reviews/reviews.types";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: AppSnackbarSeverity;
};

function formatReviewDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ReviewsSection() {
  const siteMode = React.useMemo(() => getRentFlowSiteMode(), []);
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [rating, setRating] = React.useState<number | null>(5);
  const [loadingReviews, setLoadingReviews] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = React.useCallback(
    (message: string, severity: AppSnackbarSeverity = "info") => {
      setSnackbar({ open: true, message, severity });
    },
    []
  );

  React.useEffect(() => {
    let cancelled = false;

    async function loadReviews() {
      try {
        const scoped = await reviewsApi.getReviews({
          marketplace: siteMode === "marketplace",
        });
        if (!cancelled) {
          setReviews(scoped.data.items);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          showSnackbar(getErrorMessage(err, "ไม่สามารถโหลดรีวิวได้"), "error");
        }
      } finally {
        if (!cancelled) {
          setLoadingReviews(false);
        }
      }
    }

    loadReviews();

    return () => {
      cancelled = true;
    };
  }, [showSnackbar, siteMode]);

  const canSubmit =
    siteMode !== "marketplace" &&
    firstName.trim().length >= 2 &&
    lastName.trim().length >= 2 &&
    (rating ?? 0) > 0 &&
    !submitting;

  const closeSnackbar = React.useCallback(
    (_?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") return;
      setSnackbar((prev) => ({ ...prev, open: false }));
    },
    []
  );

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!canSubmit) return;

      setSubmitting(true);

      try {
        const res = await reviewsApi.createReview({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          rating: rating ?? 5,
          comment: comment.trim() || undefined,
        });

        setReviews((prev) => [res.data, ...prev]);
        setFirstName("");
        setLastName("");
        setComment("");
        setRating(5);
        showSnackbar("ขอบคุณสำหรับรีวิวของคุณ", "success");
      } catch (err: unknown) {
        showSnackbar(getErrorMessage(err, "ไม่สามารถส่งรีวิวได้"), "error");
      } finally {
        setSubmitting(false);
      }
    },
    [canSubmit, comment, firstName, lastName, rating, showSnackbar]
  );

  return (
    <Container maxWidth="lg" className="py-4">
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />

      <SectionHeading
        eyebrow={siteMode === "marketplace" ? "เสียงจากหลายร้าน" : "เสียงจากลูกค้า"}
        title={
          siteMode === "marketplace"
            ? "รีวิวล่าสุดจากลูกค้าหลายร้าน"
            : "รีวิวจากผู้ใช้งานของร้านนี้"
        }
        description={
          siteMode === "marketplace"
            ? "ดูความเห็นล่าสุดจากลูกค้าที่ใช้บริการแต่ละร้าน เพื่อช่วยตัดสินใจก่อนเลือกคันที่ใช่"
            : "ใครใช้งานแล้วสามารถเขียนรีวิวได้ทันทีโดยไม่ต้องเข้าสู่ระบบ"
        }
        tone={siteMode === "marketplace" ? "marketplace" : "default"}
      />

      <Box className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card
          elevation={0}
          sx={{ boxShadow: "none" }}
          className="rounded-2xl! border border-slate-200 bg-white"
        >
          <CardContent className="p-5!">
            <Box className="flex items-center gap-3">
              <Box className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                <RateReviewRoundedIcon />
              </Box>
              <Box>
                <Typography className="text-sm font-semibold text-slate-900">
                  {siteMode === "marketplace" ? "รีวิวใน marketplace" : "เขียนรีวิว"}
                </Typography>
                <Typography className="text-xs text-slate-500">
                  {siteMode === "marketplace"
                    ? "หน้าเว็บรวมจะแสดงรีวิวล่าสุดจากทุกร้าน และให้เขียนรีวิวผ่านหน้าร้านหรือหน้ารถของร้านนั้น"
                    : "ไม่ต้องเข้าสู่ระบบหรือมีรายการจอง"}
                </Typography>
              </Box>
            </Box>

            {siteMode === "marketplace" ? (
              <Box className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                <Typography className="text-sm font-semibold text-slate-900">
                  ต้องการเขียนรีวิวให้ร้านไหน
                </Typography>
                <Typography className="mt-2 text-sm leading-6 text-slate-600">
                  ให้เข้าไปที่หน้ารถหรือหน้าร้านของร้านนั้นโดยตรง ระบบจะผูกร้านให้ถูกต้องอัตโนมัติ
                </Typography>
              </Box>
            ) : (
              <Box
                component="form"
                onSubmit={handleSubmit}
                className="mt-5 grid gap-4"
              >
                <Box className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label="ชื่อจริง"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    fullWidth
                    size="small"
                    autoComplete="given-name"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                  />
                  <TextField
                    label="นามสกุล"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    fullWidth
                    size="small"
                    autoComplete="family-name"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                  />
                </Box>

                <Box className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <Box className="flex flex-wrap items-center gap-3">
                    <Typography className="text-xs text-slate-600">
                      คะแนน
                    </Typography>
                    <Rating
                      value={rating}
                      precision={1}
                      onChange={(_, value) => setRating(value)}
                      size="small"
                    />
                  </Box>
                </Box>

                <TextField
                  label="รีวิวของคุณ"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  fullWidth
                  multiline
                  minRows={4}
                  placeholder="เล่าประสบการณ์ที่อยากแบ่งปัน"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={!canSubmit}
                  className="rounded-xl! font-semibold!"
                  sx={{
                    minHeight: 44,
                    textTransform: "none",
                    backgroundColor: "rgb(15 23 42)",
                    "&:hover": { backgroundColor: "rgb(2 6 23)" },
                  }}
                >
                  {submitting ? (
                    <Box className="flex items-center gap-2">
                      <CircularProgress size={16} color="inherit" />
                      <span>กำลังส่งรีวิว...</span>
                    </Box>
                  ) : (
                    "ส่งรีวิว"
                  )}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>

        <Box className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          {loadingReviews ? (
            <Box className="flex min-h-72 items-center justify-center rounded-xl border border-slate-200 bg-white p-8 text-slate-600">
              <Box className="flex items-center gap-3 text-sm">
                <CircularProgress size={18} />
                <span>กำลังโหลดรีวิว...</span>
              </Box>
            </Box>
          ) : reviews.length ? (
            <Box className="grid gap-3">
              {reviews.map((review) => (
                <Card
                  key={review.id}
                  elevation={0}
                  sx={{ boxShadow: "none" }}
                  className="rounded-xl! border border-slate-200 bg-white"
                >
                  <CardContent className="p-4!">
                    <Box className="flex flex-wrap items-start justify-between gap-3">
                      <Box>
                        <Typography className="text-sm font-semibold text-slate-900">
                          {review.firstName} {review.lastName}
                        </Typography>
                        {review.shopName ? (
                          <Typography className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            {review.shopName}
                          </Typography>
                        ) : null}
                        <Typography className="text-xs text-slate-500">
                          {formatReviewDate(review.createdAt)}
                        </Typography>
                      </Box>
                      <Rating value={review.rating} readOnly size="small" />
                    </Box>
                    <Typography className="mt-3 text-sm leading-6 text-slate-700">
                      {review.comment || "ให้คะแนนการใช้งาน"}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Box className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <Box className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                <RateReviewRoundedIcon />
              </Box>
              <Typography className="mt-4 text-sm font-semibold text-slate-900">
                ยังไม่มีรีวิว
              </Typography>
              <Typography className="mx-auto mt-1 max-w-md text-sm text-slate-600">
                เมื่อมีรีวิวจากผู้ใช้งาน รายการจะแสดงในส่วนนี้
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Divider className="my-6! border-slate-200!" />
    </Container>
  );
}
