"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Skeleton,
  Typography,
} from "@mui/material";

function HeaderSkeleton() {
  return (
    <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Box className="flex flex-col gap-2">
        <Typography variant="h5" className="text-2xl font-bold text-slate-900">
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width: 140,
              height: 35,
              borderRadius: "8px",
              transform: "none",
            }}
          />
        </Typography>

        <Typography className="text-sm text-slate-600">
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width: { xs: "100%", sm: 460 },
              maxWidth: "100%",
              height: 22,
              borderRadius: "8px",
              transform: "none",
            }}
          />
        </Typography>
      </Box>

      <Chip
        size="small"
        variant="outlined"
        label={
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width: 42,
              height: 16,
              borderRadius: "50px",
              transform: "none",
            }}
          />
        }
        className="w-min border! border-slate-200! bg-slate-900/5!"
        sx={{
          "& .MuiChip-label": {
            px: 1,
            display: "flex",
            alignItems: "center",
          },
        }}
      />
    </Box>
  );
}

function ShopCardSkeleton() {
  return (
    <Card
      elevation={0}
      sx={{ boxShadow: "none" }}
      className="rounded-2xl! border border-slate-200 bg-white"
    >
      <Box className="relative h-52 w-full overflow-hidden rounded-t-2xl bg-slate-100">
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 0,
          }}
        />
      </Box>

      <CardContent className="p-4!">
        <Box className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={`shop-chip-skeleton-${index}`}
              variant="rounded"
              animation="wave"
              sx={{
                width: 68,
                height: 24,
                borderRadius: "999px",
              }}
            />
          ))}
        </Box>

        <Box className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <Box className="flex items-end justify-between gap-3">
            <Box className="grid gap-1">
              <Skeleton
                variant="text"
                animation="wave"
                sx={{
                  width: 84,
                  height: 18,
                  borderRadius: "6px",
                  transform: "none",
                }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                sx={{
                  width: 56,
                  height: 24,
                  borderRadius: "8px",
                  transform: "none",
                }}
              />
            </Box>
            <Box className="grid gap-1">
              <Skeleton
                variant="text"
                animation="wave"
                sx={{
                  width: 58,
                  height: 18,
                  borderRadius: "6px",
                  transform: "none",
                }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                sx={{
                  width: 92,
                  height: 24,
                  borderRadius: "8px",
                  transform: "none",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box className="mt-5">
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              width: "100%",
              height: 36.5,
              borderRadius: "12px",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default function ShopsPageSkeleton() {
  return (
    <Container maxWidth="lg" className="py-12">
      <HeaderSkeleton />

      <Box className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ShopCardSkeleton key={`shop-page-skeleton-${index}`} />
        ))}
      </Box>
    </Container>
  );
}
