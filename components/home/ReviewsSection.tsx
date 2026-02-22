"use client";

import * as React from "react";
import Image from "next/image";
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Rating,
    Chip,
    Divider,
    TextField,
    Button,
    Stack,
    MenuItem,
} from "@mui/material";

import { SEED_REVIEWS, TAGS, Review } from "@/constants/review";
import { Stat } from "@/ui/reviews/Stat";
import { ReviewCard } from "@/ui/reviews/ReviewCard";
import { fieldSX } from "@/ui/reviews/fieldSX";

function formatNowTH() {
    return "วันนี้";
}

export default function ReviewsSection() {
    const [reviews, setReviews] = React.useState<Review[]>(SEED_REVIEWS);

    // form state
    const [name, setName] = React.useState("");
    const [role, setRole] = React.useState("");
    const [tag, setTag] = React.useState<(typeof TAGS)[number] | "">("");
    const [rating, setRating] = React.useState<number | null>(5);
    const [comment, setComment] = React.useState("");

    const avg =
        reviews.reduce((sum, r) => sum + r.rating, 0) / Math.max(reviews.length, 1);

    const canSubmit =
        name.trim().length >= 2 && (rating ?? 0) >= 1 && comment.trim().length >= 10;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;

        const newReview: Review = {
            name: name.trim(),
            role: role.trim() || "ผู้ใช้งาน",
            rating: rating ?? 5,
            comment: comment.trim(),
            date: formatNowTH(),
            tag: tag || undefined,
            avatar: "/avatars/placeholder.png",
        };

        setReviews((prev) => [newReview, ...prev]);

        // reset
        setName("");
        setRole("");
        setTag("");
        setRating(5);
        setComment("");
    };

    // สำหรับ marquee: ทำให้เลื่อนลื่น + loop ด้วยการ duplicate array
    const midpoint = Math.ceil(reviews.length / 2);

    const firstHalf = reviews.slice(0, midpoint);
    const secondHalf = reviews.slice(midpoint);

    const row1 = React.useMemo(
        () => [...firstHalf, ...firstHalf],
        [firstHalf]
    );

    const row2 = React.useMemo(
        () => [...secondHalf, ...secondHalf],
        [secondHalf]
    );

    return (
        <Container maxWidth="lg" className="py-4">
            {/* Header */}
            <Box className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <Box>
                    <Typography variant="h4" className="text-base font-semibold text-slate-900">
                        รีวิวจากผู้ใช้งานจริง
                    </Typography>
                    <Typography className="mt-1 text-sm text-slate-600">
                        ความเห็นเพื่อช่วยให้คุณตัดสินใจได้ง่ายขึ้น
                    </Typography>
                </Box>

                <Box className="flex gap-3 overflow-x-auto scrollbar-hide">
                    <Stat
                        label="คะแนนเฉลี่ย"
                        value={avg.toFixed(1)}
                        sub="จากผู้ใช้ทั้งหมด"
                    />
                    <Stat
                        label="จำนวนรีวิว"
                        value={`${reviews.length}`}
                        sub="รีวิวทั้งหมด"
                    />
                    <Stat
                        label="การตอบกลับ"
                        value="เร็ว"
                        sub="ภายในเวลาทำการ"
                    />
                </Box>
            </Box>

            {/* Reviews: 2 rows marquee */}
            <Box className="mt-4 space-y-5">
                {/* Row 1 -> left */}
                <Box className="relative overflow-hidden rounded-2xl! border border-slate-200 bg-slate-50 p-4">
                    {/* fade edges */}
                    <Box className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-slate-50 to-transparent" />
                    <Box className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-slate-50 to-transparent" />

                    <Box className="flex w-max gap-4 marquee-left">
                        {row1.map((r, idx) => (
                            <ReviewCard key={`r1-${idx}-${r.name}-${r.date}`} review={r} />
                        ))}
                    </Box>
                </Box>

                {/* Row 2 -> right */}
                <Box className="relative overflow-hidden rounded-2xl! border border-slate-200 bg-slate-50 p-4">
                    {/* fade edges */}
                    <Box className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-slate-50 to-transparent" />
                    <Box className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-slate-50 to-transparent" />

                    <Box className="flex w-max gap-4 marquee-right">
                        {row2.map((r, idx) => (
                            <ReviewCard key={`r2-${idx}-${r.name}-${r.date}`} review={r} />
                        ))}
                    </Box>
                </Box>
            </Box>

            <Box className="mt-5 space-y-6">
                {/* Form เต็มความกว้าง */}
                <Card
                    elevation={0}
                    sx={{ boxShadow: "none" }}
                    className="w-full rounded-2xl! border border-slate-200 bg-white hover:border-slate-400"
                >
                    <CardContent className="p-4!">
                        <Typography variant="h6" className="text-sm font-semibold text-slate-900">
                            เพิ่มรีวิวของคุณ
                        </Typography>
                        <Typography className="mt-1 text-sm text-slate-600">
                            ช่วยให้คนอื่นตัดสินใจได้ง่ายขึ้น
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} className="mt-5 grid gap-4">
                            <Box className="grid gap-4 sm:grid-cols-2">
                                <TextField
                                    label="ชื่อ"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    fullWidth
                                    sx={fieldSX}
                                />
                                <TextField
                                    label="ประเภทการใช้งาน (ไม่ใส่ก็ได้)"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    fullWidth
                                    sx={fieldSX}
                                />
                            </Box>

                            <Box className="grid gap-4 sm:grid-cols-2">
                                <TextField
                                    select
                                    label="แท็ก (ไม่ใส่ก็ได้)"
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value as any)}
                                    fullWidth
                                    sx={fieldSX}
                                >
                                    <MenuItem value="">ไม่ระบุ</MenuItem>
                                    {TAGS.map((t) => (
                                        <MenuItem key={t} value={t}>
                                            {t}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <Box className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                    <Box className="flex items-center gap-2">
                                        <Typography className="text-xs text-slate-600">ให้คะแนน</Typography>
                                        <Typography className="text-sm font-semibold text-slate-900">
                                            {(rating ?? 0).toFixed(1)}
                                        </Typography>
                                        <Rating
                                            value={rating}
                                            precision={0.5}
                                            onChange={(_, v) => setRating(v)}
                                            size="small"
                                        />
                                    </Box>
                                </Box>
                            </Box>

                            <TextField
                                label="ความคิดเห็น"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                fullWidth
                                multiline
                                minRows={4}
                                placeholder="เช่น รถสะอาด รับรถเร็ว บริการดี..."
                                sx={fieldSX}
                            />

                            <Stack direction="row" spacing={1.5} className="flex-wrap">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={!canSubmit}
                                    className="rounded-xl! px-5! py-3! font-semibold!"
                                    sx={{
                                        textTransform: "none",
                                        backgroundColor: "rgb(15 23 42)",
                                    }}
                                >
                                    ส่งรีวิว
                                </Button>

                                <Typography className="mt-2 self-center text-xs text-slate-500">
                                    * ต้องมีชื่อ + คะแนน + ความคิดเห็นอย่างน้อย 10 ตัวอักษร
                                </Typography>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <Divider className="my-6! border-slate-200!" />
        </Container>
    );
}