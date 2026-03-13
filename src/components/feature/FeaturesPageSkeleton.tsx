"use client";

import * as React from "react";
import {
    Box,
    Container,
    Skeleton,
} from "@mui/material";

function HeaderSkeleton() {
    return (
        <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Box className="flex flex-col gap-2">
                <Skeleton
                    variant="text"
                    animation="wave"
                    sx={{
                        width: 220,
                        height: 40,
                        borderRadius: "8px",
                        transform: "none",
                    }}
                />
                <Skeleton
                    variant="text"
                    animation="wave"
                    sx={{
                        width: 520,
                        maxWidth: "100%",
                        height: 22,
                        borderRadius: "8px",
                        transform: "none",
                    }}
                />
            </Box>
        </Box>
    );
}

function HeroBadgesSkeleton() {
    return (
        <Box className="mt-3 flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                    key={index}
                    variant="rounded"
                    animation="wave"
                    sx={{
                        width: 150,
                        height: 32,
                        borderRadius: "999px",
                    }}
                />
            ))}
        </Box>
    );
}

function FeatureCardSkeleton() {
    return (
        <Box className="rounded-2xl! border border-slate-200 bg-white p-4">
            <Box className="flex items-start gap-3">
                <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        flexShrink: 0,
                    }}
                />

                <Box className="min-w-0 flex-1">
                    <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{
                            width: "48%",
                            height: 24,
                            borderRadius: "8px",
                            transform: "none",
                        }}
                    />
                    <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{
                            mt: 0.5,
                            width: "96%",
                            height: 20,
                            borderRadius: "8px",
                            transform: "none",
                        }}
                    />
                    <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{
                            width: "82%",
                            height: 20,
                            borderRadius: "8px",
                            transform: "none",
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

function StepCardSkeleton() {
    return (
        <Box className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <Box className="flex items-start gap-3">
                <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "12px",
                        flexShrink: 0,
                    }}
                />

                <Box className="flex-1">
                    <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{
                            width: "42%",
                            height: 22,
                            borderRadius: "8px",
                            transform: "none",
                        }}
                    />
                    <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{
                            mt: 0.5,
                            width: "94%",
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
                            height: 20,
                            borderRadius: "8px",
                            transform: "none",
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

function TrustCardSkeleton() {
    return (
        <Box className="rounded-2xl border border-slate-200 bg-white p-4">
            <Skeleton
                variant="text"
                animation="wave"
                sx={{
                    width: "56%",
                    height: 24,
                    borderRadius: "8px",
                    transform: "none",
                }}
            />
            <Skeleton
                variant="text"
                animation="wave"
                sx={{
                    mt: 0.5,
                    width: "95%",
                    height: 20,
                    borderRadius: "8px",
                    transform: "none",
                }}
            />
            <Skeleton
                variant="text"
                animation="wave"
                sx={{
                    width: "78%",
                    height: 20,
                    borderRadius: "8px",
                    transform: "none",
                }}
            />
        </Box>
    );
}

function CTASectionSkeleton() {
    return (
        <Box className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <Skeleton
                variant="text"
                animation="wave"
                sx={{
                    width: 110,
                    height: 22,
                    borderRadius: "8px",
                    transform: "none",
                }}
            />
            <Skeleton
                variant="text"
                animation="wave"
                sx={{
                    mt: 0.5,
                    width: 360,
                    maxWidth: "100%",
                    height: 20,
                    borderRadius: "8px",
                    transform: "none",
                }}
            />

            <Box className="mt-4 flex flex-wrap gap-2">
                <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{
                        width: 120,
                        height: 36.5,
                        borderRadius: "12px",
                    }}
                />
                <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{
                        width: 120,
                        height: 36.5,
                        borderRadius: "12px",
                    }}
                />
            </Box>
        </Box>
    );
}

export default function FeaturesPageSkeleton() {
    return (
        <Container maxWidth="lg" className="py-12">
            <HeaderSkeleton />
            <HeroBadgesSkeleton />

            <Box className="mt-8">
                <Box className="flex items-end justify-between gap-3">
                    <Box>
                        <Skeleton
                            variant="text"
                            animation="wave"
                            sx={{
                                width: 160,
                                height: 28,
                                borderRadius: "8px",
                                transform: "none",
                            }}
                        />
                        <Skeleton
                            variant="text"
                            animation="wave"
                            sx={{
                                mt: 0.5,
                                width: 360,
                                maxWidth: "100%",
                                height: 20,
                                borderRadius: "8px",
                                transform: "none",
                            }}
                        />
                    </Box>
                </Box>

                <Box className="mt-4 grid gap-4 md:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <FeatureCardSkeleton key={index} />
                    ))}
                </Box>
            </Box>

            <Box className="mt-10 rounded-2xl border border-slate-200 bg-white p-4">
                <Skeleton
                    variant="text"
                    animation="wave"
                    sx={{
                        width: 130,
                        height: 28,
                        borderRadius: "8px",
                        transform: "none",
                    }}
                />
                <Skeleton
                    variant="text"
                    animation="wave"
                    sx={{
                        mt: 0.5,
                        width: 420,
                        maxWidth: "100%",
                        height: 20,
                        borderRadius: "8px",
                        transform: "none",
                    }}
                />

                <Box className="mt-4 grid gap-4 md:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <StepCardSkeleton key={index} />
                    ))}
                </Box>
            </Box>

            <Box className="mt-10">
                <Skeleton
                    variant="text"
                    animation="wave"
                    sx={{
                        width: 230,
                        height: 28,
                        borderRadius: "8px",
                        transform: "none",
                    }}
                />
                <Skeleton
                    variant="text"
                    animation="wave"
                    sx={{
                        mt: 0.5,
                        width: 340,
                        maxWidth: "100%",
                        height: 20,
                        borderRadius: "8px",
                        transform: "none",
                    }}
                />

                <Box className="mt-4 grid gap-4 md:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <TrustCardSkeleton key={index} />
                    ))}
                </Box>
            </Box>

            <CTASectionSkeleton />
        </Container>
    );
}