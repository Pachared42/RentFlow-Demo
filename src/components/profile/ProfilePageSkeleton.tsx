"use client";

import * as React from "react";
import { Box, Container, Skeleton, Typography } from "@mui/material";

function HeadingSkeleton() {
  return (
    <Box className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
      <Typography className="apple-heading">
        <Skeleton
          variant="text"
          animation="wave"
          sx={{
            mx: "auto",
            width: { xs: 220, md: 320 },
            height: { xs: 56, md: 78 },
            borderRadius: "16px",
            transform: "none",
          }}
        />
      </Typography>

      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          mx: "auto",
          mt: 1.5,
          width: { xs: "100%", sm: 420 },
          maxWidth: "100%",
          height: 26,
          borderRadius: "12px",
          transform: "none",
        }}
      />
    </Box>
  );
}

function FieldSkeleton() {
  return (
    <Box className="rounded-[22px] bg-[var(--rf-apple-surface-soft)] px-4 py-4 md:px-5 md:py-4.5">
      <Box className="space-y-1.5">
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: 92,
          height: 18,
          borderRadius: "8px",
          transform: "none",
        }}
      />
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: "72%",
          height: 28,
          borderRadius: "10px",
          transform: "none",
        }}
      />
      </Box>
    </Box>
  );
}

function SectionSkeleton({
  titleWidth,
  columns = "md:grid-cols-2",
  fields = 4,
}: {
  titleWidth: number;
  columns?: string;
  fields?: number;
}) {
  return (
    <Box className="apple-card p-5! md:p-6!">
      <Box className="mb-5 flex items-center gap-3">
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{ width: 36, height: 36, borderRadius: "999px" }}
        />
        <Skeleton
          variant="text"
          animation="wave"
          sx={{
            width: titleWidth,
            height: 28,
            borderRadius: "10px",
            transform: "none",
          }}
        />
      </Box>

      <Box className={`grid gap-3 ${columns}`}>
        {Array.from({ length: fields }).map((_, index) => (
          <FieldSkeleton key={`profile-field-skeleton-${titleWidth}-${index}`} />
        ))}
      </Box>
    </Box>
  );
}

function ActionCardSkeleton() {
  return (
    <Box className="apple-card p-5 md:p-6">
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: 132,
          height: 28,
          borderRadius: "10px",
          transform: "none",
        }}
      />

      <Box className="mt-5 grid gap-3">
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{ width: "100%", height: 44, borderRadius: "999px" }}
        />
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{ width: "100%", height: 44, borderRadius: "999px" }}
        />
      </Box>

      <Box className="my-4 h-px bg-black/10" />

      <Box className="space-y-3 pt-1">
        {Array.from({ length: 2 }).map((_, index) => (
          <Box
            key={`profile-status-skeleton-${index}`}
            className="flex items-center justify-between"
          >
            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                width: 54,
                height: 18,
                borderRadius: "8px",
                transform: "none",
              }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                width: 72,
                height: 18,
                borderRadius: "8px",
                transform: "none",
              }}
            />
          </Box>
        ))}
      </Box>

      <Box className="my-4 h-px bg-black/10" />

      <Box className="pt-1">
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{ width: "100%", height: 44, borderRadius: "999px" }}
        />
      </Box>
    </Box>
  );
}

export default function ProfilePageSkeleton() {
  return (
    <Box className="apple-page">
      <Container maxWidth="lg" className="apple-section">
        <HeadingSkeleton />

        <Box className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-6">
          <Box className="grid gap-5">
            <SectionSkeleton titleWidth={118} fields={5} />
            <SectionSkeleton titleWidth={102} columns="grid-cols-1" fields={3} />
          </Box>

          <Box className="space-y-5">
            <ActionCardSkeleton />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
