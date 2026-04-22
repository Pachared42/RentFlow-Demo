"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Skeleton,
  Stack,
} from "@mui/material";

type AuthSkeletonLayoutProps = {
  mode: "login" | "register";
};

export default function AuthSkeletonLayout({
  mode,
}: AuthSkeletonLayoutProps) {
  const isRegister = mode === "register";

  return (
    <Box className="apple-page relative">
      <Box aria-hidden className="pointer-events-none fixed inset-0" />

      <Container maxWidth="sm" className="apple-section relative">
        <Card
          elevation={0}
          className="apple-card apple-card-no-hover w-full"
          sx={{ backdropFilter: "blur(6px)" }}
        >
          <CardContent className="p-8!">
            <Stack className="mb-6 items-center text-center">
              <Box className="mb-4 flex items-center justify-center">
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "16px",
                  }}
                />
              </Box>
            </Stack>

            <Stack spacing={1} className="mb-4 items-center text-center">
              <Skeleton
                variant="text"
                animation="wave"
                sx={{
                  width: isRegister ? 210 : 180,
                  maxWidth: "100%",
                  height: 38,
                  borderRadius: "8px",
                  transform: "none",
                }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                sx={{
                  width: isRegister ? 360 : 320,
                  maxWidth: "100%",
                  height: 20,
                  borderRadius: "8px",
                  transform: "none",
                }}
              />
            </Stack>

            <Divider className="my-5! border-black/10!" />

            <Box className="grid gap-4">
              {isRegister ? (
                <Box className="grid gap-4 sm:grid-cols-2">
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{ width: "100%", height: 56, borderRadius: "18px" }}
                  />
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{ width: "100%", height: 56, borderRadius: "18px" }}
                  />
                </Box>
              ) : null}

              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{ width: "100%", height: 56, borderRadius: "18px" }}
              />

              <Box className="space-y-1.5">
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{ width: "100%", height: 56, borderRadius: "18px" }}
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{
                    width: isRegister ? 120 : 28,
                    height: 16,
                    borderRadius: "8px",
                    transform: "none",
                    opacity: 0.85,
                  }}
                />
              </Box>

              {isRegister ? (
                <Box className="space-y-1.5">
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{ width: "100%", height: 56, borderRadius: "18px" }}
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    sx={{
                      width: 92,
                      height: 16,
                      borderRadius: "8px",
                      transform: "none",
                      opacity: 0.85,
                    }}
                  />
                </Box>
              ) : null}

              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{ width: "100%", height: 52, borderRadius: "999px" }}
              />
            </Box>

            <Box className="p-4">
              <Box className="flex flex-col items-center gap-1">
                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{
                    width: isRegister ? "92%" : "88%",
                    maxWidth: 380,
                    height: 18,
                    borderRadius: "6px",
                    transform: "none",
                  }}
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{
                    width: isRegister ? "82%" : "74%",
                    maxWidth: 320,
                    height: 18,
                    borderRadius: "6px",
                    transform: "none",
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
