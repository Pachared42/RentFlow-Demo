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
import { getErrorMessage } from "@/src/lib/api-error";
import {
  getRentFlowSiteMode,
  getRentFlowStorefrontHref,
} from "@/src/lib/tenant";
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
  const isMarketplace = siteMode === "marketplace";
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
        const res = await reviewsApi.getReviews({
          marketplace: isMarketplace,
        });
        if (!cancelled) {
          setReviews(res.data.items);
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
  }, [isMarketplace, showSnackbar]);

  const canSubmit =
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

  const marqueeReviews = React.useMemo(() => {
    const items = reviews.length ? reviews : [];
    return [...items, ...items];
  }, [reviews]);

  const firstReviewRow = React.useMemo(() => {
    return marqueeReviews.filter((_, index) => index % 2 === 0);
  }, [marqueeReviews]);

  const secondReviewRow = React.useMemo(() => {
    return marqueeReviews.filter((_, index) => index % 2 === 1);
  }, [marqueeReviews]);

  function renderReviewCard(review: Review, key: string) {
    const shopHref = review.domainSlug
      ? getRentFlowStorefrontHref(review.domainSlug)
      : "";
    const reviewDate = formatReviewDate(review.createdAt);

    return (
      <Card
        key={key}
        elevation={0}
        sx={{ boxShadow: "none" }}
        className="min-w-[320px] max-w-[320px] rounded-xl! border border-slate-200 bg-white sm:min-w-[420px] sm:max-w-[420px]"
      >
        <CardContent className="p-4!">
          <Box className="flex flex-wrap items-start justify-between gap-3">
            <Box>
              <Typography className="text-sm font-semibold text-slate-900">
                {review.firstName} {review.lastName}
              </Typography>
              <Typography className="text-xs text-slate-500">
                {review.shopName ? (
                  <>
                    {shopHref ? (
                      <Box
                        component="a"
                        href={shopHref}
                        className="font-semibold text-slate-700 underline-offset-4 transition hover:text-slate-950 hover:underline"
                      >
                        {review.shopName}
                      </Box>
                    ) : (
                      <Box component="span" className="font-semibold text-slate-700">
                        {review.shopName}
                      </Box>
                    )}
                    {reviewDate ? ` • ${reviewDate}` : ""}
                  </>
                ) : (
                  reviewDate
                )}
              </Typography>
            </Box>
            <Rating value={review.rating} readOnly size="small" />
          </Box>
          <Typography className="mt-3 text-sm leading-6 text-slate-700">
            {review.comment || "ให้คะแนนการใช้งาน"}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (isMarketplace) {
    return (
      <Container maxWidth="lg" className="py-4">
        <AppSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={closeSnackbar}
        />

        <Box className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Box>
            <Typography
              variant="h4"
              className="text-base font-semibold text-slate-900"
            >
              รีวิวจากผู้ใช้งาน
            </Typography>
            <Typography className="mt-1 text-sm text-slate-600">
              เสียงจากลูกค้าที่ใช้บริการกับร้านต่าง ๆ
            </Typography>
          </Box>
        </Box>

        <Box className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4">
          {loadingReviews ? (
            <Box className="flex min-h-72 items-center justify-center rounded-xl border border-slate-200 bg-white p-8 text-slate-600">
              <Box className="flex items-center gap-3 text-sm">
                <CircularProgress size={18} />
                <span>กำลังโหลดรีวิว...</span>
              </Box>
            </Box>
          ) : reviews.length ? (
            <Box className="grid gap-3">
              <Box className="marquee-left flex w-max gap-3">
                {firstReviewRow.map((review, index) =>
                  renderReviewCard(review, `review-left-${review.id}-${index}`)
                )}
              </Box>
              <Box className="marquee-right flex w-max gap-3">
                {secondReviewRow.map((review, index) =>
                  renderReviewCard(review, `review-right-${review.id}-${index}`)
                )}
              </Box>
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

        <Divider className="my-6! border-slate-200!" />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-4">
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />

      <Box className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <Box>
          <Typography
            variant="h4"
            className="text-base font-semibold text-slate-900"
          >
            รีวิวจากผู้ใช้งาน
          </Typography>
          <Typography className="mt-1 text-sm text-slate-600">
            แบ่งปันประสบการณ์ของคุณได้ทันที
          </Typography>
        </Box>
      </Box>

      <Box className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
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
                  เขียนรีวิว
                </Typography>
                <Typography className="text-xs text-slate-500">
                  ไม่ต้องเข้าสู่ระบบหรือมีรายการจอง
                </Typography>
              </Box>
            </Box>

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
