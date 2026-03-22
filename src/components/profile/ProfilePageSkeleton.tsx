"use client";

import * as React from "react";
import { Box, Container, Skeleton } from "@mui/material";

export default function ProfilePageSkeleton() {
  return (
    <Box className="bg-white py-6 md:py-8">
      <Container maxWidth="lg">
        <Box className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Box className="grid gap-5">
            {[1, 2, 3].map((section) => (
              <Box
                key={section}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <Box className="mb-4 flex items-center gap-3">
                  <Skeleton variant="rounded" width={36} height={36} />
                  <Skeleton variant="text" width={180} height={28} />
                </Box>

                <Box className="grid gap-3 md:grid-cols-2">
                  {[1, 2, 3, 4].map((field) => (
                    <Box
                      key={field}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-4"
                    >
                      <Skeleton variant="text" width={90} height={18} />
                      <Skeleton variant="text" width="70%" height={28} />
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>

          <Box>
            <Box className="rounded-3xl border border-slate-200 bg-white p-5">
              <Skeleton variant="text" width={140} height={28} />
              <Box className="mt-4 grid gap-3">
                <Skeleton variant="rounded" height={44} />
                <Skeleton variant="rounded" height={44} />
              </Box>
              <Skeleton
                variant="text"
                width="100%"
                height={24}
                className="mt-4!"
              />
              <Skeleton variant="text" width="100%" height={24} />
              <Skeleton variant="text" width="100%" height={24} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}