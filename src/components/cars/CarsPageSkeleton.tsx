"use client";

import * as React from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Container,
    Skeleton,
    TextField,
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
                            width: 120,
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
                            width: { xs: "100%", sm: 520 },
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

function FilterInputSkeleton() {
    return (
        <Box>
            <TextField
                fullWidth
                size="small"
                label=" "
                disabled
                value=""
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        position: "relative",
                        overflow: "hidden",
                        bgcolor: "transparent",
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "transparent",
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <Skeleton
                            variant="rounded"
                            animation="wave"
                            sx={{
                                width: "100%",
                                height: 24,
                                borderRadius: "6px",
                            }}
                        />
                    ),
                }}
            />
        </Box>
    );
}

function CarsFilterBarSkeleton() {
    return (
        <Box className="mt-4 rounded-2xl! border border-slate-200 bg-white p-4">
            <Box className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                <FilterInputSkeleton />
                <FilterInputSkeleton />
                <FilterInputSkeleton />
                <FilterInputSkeleton />
                <FilterInputSkeleton />
            </Box>

            <Box className="mt-4 grid gap-4 md:grid-cols-2">
                <FilterInputSkeleton />

                <Button
                    variant="outlined"
                    disabled
                    className="rounded-xl!"
                    sx={{
                        height: 40,
                        textTransform: "none",
                        borderColor: "rgb(226 232 240)",
                        color: "transparent",
                    }}
                >
                    <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{
                            width: 100,
                            height: 20,
                            borderRadius: "6px",
                            transform: "none",
                        }}
                    />
                </Button>
            </Box>
        </Box>
    );
}

function ShopBoxSkeleton() {
    return (
        <Box className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <Box className="flex items-end gap-2">
                <Skeleton
                    variant="text"
                    animation="wave"
                    sx={{
                        width: 82,
                        height: 24,
                        borderRadius: "6px",
                        transform: "none",
                    }}
                />

                <Skeleton
                    variant="text"
                    animation="wave"
                    sx={{
                        width: 118,
                        height: 32,
                        borderRadius: "8px",
                        transform: "none",
                    }}
                />
            </Box>
        </Box>
    );
}

function PriceBoxSkeleton() {
    return (
        <Box className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <Box className="flex items-end gap-2">
                <Skeleton
                    variant="text"
                    animation="wave"
                    sx={{
                        width: 72,
                        height: 20,
                        borderRadius: "6px",
                        transform: "none",
                    }}
                />

                <Skeleton
                    variant="text"
                    animation="wave"
                    sx={{
                        width: 96,
                        height: 30,
                        borderRadius: "8px",
                        transform: "none",
                    }}
                />

                <Skeleton
                    variant="text"
                    animation="wave"
                    sx={{
                        width: 28,
                        height: 20,
                        borderRadius: "6px",
                        transform: "none",
                    }}
                />
            </Box>
        </Box>
    );
}

function CarCardSkeleton({ showShop = false }: { showShop?: boolean }) {
    return (
        <Card
            elevation={0}
            sx={{ boxShadow: "none" }}
            className="rounded-2xl! border border-slate-200 bg-white"
        >
            <Box className="relative h-52 w-full overflow-hidden rounded-t-2xl">
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

            <CardContent className="p-6!">
                <Box className="flex items-start justify-between gap-3">
                    <Box className="min-w-0 w-full">
                        <Typography className="truncate text-lg font-semibold text-slate-900">
                            <Skeleton
                                variant="text"
                                animation="wave"
                                sx={{
                                    width: "68%",
                                    height: 28,
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
                                    mt: 0.5,
                                    width: "88%",
                                    height: 22,
                                    borderRadius: "8px",
                                    transform: "none",
                                }}
                            />
                        </Typography>
                    </Box>
                </Box>

                {showShop ? <ShopBoxSkeleton /> : null}

                <PriceBoxSkeleton />
            </CardContent>

            <CardActions sx={{ p: "0px 16px 16px" }} className="gap-2">
                <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{
                        flex: 1,
                        height: 36.5,
                        borderRadius: "12px",
                    }}
                />
                <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{
                        flex: 1,
                        height: 36.5,
                        borderRadius: "12px",
                    }}
                />
            </CardActions>
        </Card>
    );
}

export default function CarsPageSkeleton({ showShop = false }: { showShop?: boolean }) {
    return (
        <Container maxWidth="lg" className="py-12">
            <HeaderSkeleton />
            <CarsFilterBarSkeleton />

            <Box className="mt-6 grid gap-4 md:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <CarCardSkeleton key={index} showShop={showShop} />
                ))}
            </Box>
        </Container>
    );
}
