"use client";

import * as React from "react";
import {
  Box,
  Container,
  Skeleton,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

function HeaderSkeleton() {
  return (
    <Box className="flex flex-col gap-2.5">
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: 90,
          height: 38,
          borderRadius: "8px",
          transform: "none",
        }}
      />
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: { xs: "100%", sm: 340 },
          maxWidth: "100%",
          height: 22,
          borderRadius: "8px",
          transform: "none",
        }}
      />
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: { xs: 210, sm: 260 },
          height: 18,
          borderRadius: "6px",
          transform: "none",
        }}
      />
    </Box>
  );
}

function SummaryTopSkeleton() {
  return (
    <Box className="flex flex-col gap-1.5">
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: 100,
          height: 22,
          borderRadius: "8px",
          transform: "none",
        }}
      />
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: 240,
          height: 18,
          borderRadius: "8px",
          transform: "none",
        }}
      />
    </Box>
  );
}

function SummaryImageSkeleton() {
  return (
    <Box className="relative aspect-4/3 overflow-hidden rounded-xl bg-slate-50">
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "12px",
        }}
      />
    </Box>
  );
}

function SummaryRowSkeleton({
  leftWidth = 70,
  rightWidth = 90,
  twoLines = false,
}: {
  leftWidth?: number | string;
  rightWidth?: number | string;
  twoLines?: boolean;
}) {
  return (
    <Box className="flex items-start justify-between gap-3">
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: leftWidth,
          height: 20,
          borderRadius: "6px",
          transform: "none",
          flexShrink: 0,
        }}
      />
      <Box className="flex flex-col items-end gap-1">
        <Skeleton
          variant="text"
          animation="wave"
          sx={{
            width: rightWidth,
            height: 20,
            borderRadius: "6px",
            transform: "none",
          }}
        />
        {twoLines ? (
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width:
                typeof rightWidth === "number" ? rightWidth - 18 : rightWidth,
              height: 16,
              borderRadius: "6px",
              transform: "none",
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
}

function SummarySkeleton() {
  return (
    <Card
      elevation={0}
      sx={{ boxShadow: "none" }}
      className="lg:col-span-5 rounded-2xl! border border-slate-200 bg-white"
    >
      <CardContent className="p-4!">
        <SummaryTopSkeleton />

        <Divider className="my-5! border-slate-200!" />

        <Box className="rounded-xl! border border-slate-200 bg-white p-4!">
          <SummaryImageSkeleton />

          <Box className="mt-3 flex flex-col gap-1.5">
            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                width: "72%",
                height: 26,
                borderRadius: "8px",
                transform: "none",
              }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                width: "92%",
                height: 18,
                borderRadius: "8px",
                transform: "none",
              }}
            />
          </Box>

          <Box className="mb-2 mt-5 space-y-2.5 text-sm">
            <SummaryRowSkeleton leftWidth={55} rightWidth={95} />
            <SummaryRowSkeleton leftWidth={45} rightWidth={120} twoLines />
            <SummaryRowSkeleton leftWidth={45} rightWidth={120} twoLines />
            <SummaryRowSkeleton leftWidth={60} rightWidth={50} />
            <SummaryRowSkeleton leftWidth={85} rightWidth={70} />
            <SummaryRowSkeleton leftWidth={80} rightWidth={85} />
            <SummaryRowSkeleton leftWidth={75} rightWidth={70} />
            <SummaryRowSkeleton leftWidth={50} rightWidth={105} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function InputSkeleton({ height = 40 }: { height?: number }) {
  return (
    <Skeleton
      variant="rounded"
      animation="wave"
      sx={{
        width: "100%",
        height,
        borderRadius: "14px",
      }}
    />
  );
}

function SectionTitleSkeleton({
  titleWidth = 100,
  descWidth = 250,
}: {
  titleWidth?: number | string;
  descWidth?: number | string;
}) {
  return (
    <Box className="flex flex-col gap-1.5">
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: titleWidth,
          height: 22,
          borderRadius: "8px",
          transform: "none",
        }}
      />
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: descWidth,
          maxWidth: "100%",
          height: 18,
          borderRadius: "8px",
          transform: "none",
        }}
      />
    </Box>
  );
}

function CheckboxRowSkeleton() {
  return (
    <Box className="flex items-start gap-3 py-1.5">
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{
          width: 22,
          height: 22,
          borderRadius: "6px",
          mt: "2px",
          flexShrink: 0,
        }}
      />

      <Box className="flex w-full items-start justify-between gap-3">
        <Box className="min-w-0 flex flex-1 flex-col gap-1">
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width: "56%",
              height: 20,
              borderRadius: "8px",
              transform: "none",
            }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width: "72%",
              height: 16,
              borderRadius: "8px",
              transform: "none",
            }}
          />
        </Box>

        <Skeleton
          variant="text"
          animation="wave"
          sx={{
            width: 74,
            height: 20,
            borderRadius: "8px",
            transform: "none",
            flexShrink: 0,
          }}
        />
      </Box>
    </Box>
  );
}

function ChatSuggestSkeleton() {
  return (
    <Box
      className="rounded-2xl border border-amber-200 bg-amber-50 p-4"
      sx={{
        backgroundImage:
          "radial-gradient(520px 160px at 18% 0%, rgba(251,191,36,0.14), transparent 60%)",
      }}
    >
      <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Box className="min-w-0 flex flex-1 flex-col gap-1.5">
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width: 220,
              height: 22,
              borderRadius: "8px",
              transform: "none",
            }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width: { xs: "100%", sm: 280 },
              maxWidth: "100%",
              height: 18,
              borderRadius: "8px",
              transform: "none",
            }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width: 230,
              height: 16,
              borderRadius: "8px",
              transform: "none",
            }}
          />
        </Box>

        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            width: { xs: "100%", sm: 220 },
            height: 46,
            borderRadius: "12px",
            flexShrink: 0,
          }}
        />
      </Box>
    </Box>
  );
}

function FormSkeleton() {
  return (
    <Card
      elevation={0}
      sx={{ boxShadow: "none" }}
      className="lg:col-span-7 rounded-2xl! border border-slate-200 bg-white"
    >
      <CardContent className="p-4!">
        <SectionTitleSkeleton titleWidth={110} descWidth={300} />

        <Divider className="my-5! border-slate-200!" />

        <Box className="grid gap-4">
          <Box className="grid gap-4 sm:grid-cols-2">
            <InputSkeleton />
            <InputSkeleton />
          </Box>

          <Box className="flex flex-col gap-1.5">
            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                width: 90,
                height: 22,
                borderRadius: "8px",
                transform: "none",
              }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                width: { xs: "100%", sm: 320 },
                maxWidth: "100%",
                height: 18,
                borderRadius: "8px",
                transform: "none",
              }}
            />

            <Box className="mt-4 grid gap-4 sm:grid-cols-2">
              <Box className="grid gap-3">
                <InputSkeleton />
                <InputSkeleton />
              </Box>

              <Box className="grid gap-3">
                <InputSkeleton />
                <InputSkeleton />
              </Box>
            </Box>
          </Box>

          <Box className="grid gap-4 sm:grid-cols-2">
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
          </Box>

          <Divider className="border-slate-200!" />

          <Box className="flex flex-col gap-1.5">
            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                width: 90,
                height: 22,
                borderRadius: "8px",
                transform: "none",
              }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                width: 230,
                height: 18,
                borderRadius: "8px",
                transform: "none",
              }}
            />

            <Box className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <Box className="space-y-1.5">
                <CheckboxRowSkeleton />
                <CheckboxRowSkeleton />
                <CheckboxRowSkeleton />
              </Box>

              <Divider className="my-4! border-slate-200!" />

              <Box className="flex items-center justify-between">
                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{
                    width: 95,
                    height: 20,
                    borderRadius: "6px",
                    transform: "none",
                  }}
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{
                    width: 70,
                    height: 20,
                    borderRadius: "6px",
                    transform: "none",
                  }}
                />
              </Box>
            </Box>
          </Box>

          <ChatSuggestSkeleton />

          <Box className="space-y-3">
            <Box className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{
                  width: 230,
                  maxWidth: "100%",
                  height: 48,
                  borderRadius: "12px",
                }}
              />

              <Skeleton
                variant="text"
                animation="wave"
                sx={{
                  width: 210,
                  height: 18,
                  borderRadius: "8px",
                  transform: "none",
                }}
              />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function BookingPageSkeleton() {
  return (
    <Box className="bg-white">
      <Container maxWidth="lg" className="py-12">
        <HeaderSkeleton />

        <Box className="mt-6 grid gap-6 lg:grid-cols-12">
          <SummarySkeleton />
          <FormSkeleton />
        </Box>
      </Container>
    </Box>
  );
}