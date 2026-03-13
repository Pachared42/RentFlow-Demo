"use client";

import * as React from "react";
import { Box, Container, Skeleton } from "@mui/material";

function CarCardSkeleton() {
    return (
        <Box className="rounded-2xl border border-slate-200 bg-white p-0">
            <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{
                    height: 208,
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                }}
            />

            <Box className="p-6">
                <Skeleton
                    variant="text"
                    animation="wave"
                    sx={{
                        height: 38,
                        width: "62%",
                        borderRadius: "8px",
                    }}
                />

                <Skeleton
                    variant="text"
                    animation="wave"
                    sx={{
                        mt: 0.5,
                        height: 30,
                        width: "78%",
                        borderRadius: "8px",
                    }}
                />

                <Box className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{
                            height: 34,
                            width: "70%",
                            borderRadius: "8px",
                        }}
                    />
                </Box>

                <Box className="mt-5 grid grid-cols-2 gap-3">
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        sx={{
                            height: 50,
                            borderRadius: "14px",
                        }}
                    />
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        sx={{
                            height: 50,
                            borderRadius: "14px",
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default function CarsPageSkeleton() {
    return (
        <Container maxWidth="lg" className="py-12">
            <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Box className="flex flex-col gap-2">
                    <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{
                            height: 46,
                            width: 180,
                            borderRadius: "8px",
                        }}
                    />
                    <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{
                            height: 30,
                            width: 620,
                            maxWidth: "100%",
                            borderRadius: "8px",
                        }}
                    />
                </Box>

                <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{
                        width: 84,
                        height: 34,
                        borderRadius: "999px",
                        alignSelf: { xs: "flex-start", sm: "center" },
                    }}
                />
            </Box>

            <Box className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <Box className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        sx={{ height: 56, borderRadius: "12px" }}
                    />
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        sx={{ height: 56, borderRadius: "12px" }}
                    />
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        sx={{ height: 56, borderRadius: "12px" }}
                    />
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        sx={{ height: 56, borderRadius: "12px" }}
                    />
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        sx={{ height: 56, borderRadius: "12px" }}
                    />
                </Box>

                <Box className="mt-4 grid gap-4 md:grid-cols-2">
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        sx={{ height: 56, borderRadius: "12px" }}
                    />
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        sx={{ height: 56, borderRadius: "12px" }}
                    />
                </Box>
            </Box>

            <Box className="mt-6 grid gap-4 md:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <CarCardSkeleton key={index} />
                ))}
            </Box>
        </Container>
    );
}