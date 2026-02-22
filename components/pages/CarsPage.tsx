"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Box,
    Container,
    Typography,
    TextField,
    MenuItem,
    Chip,
    Button,
    Divider,
    Rating,
    Card,
    CardContent,
    CardActions,
} from "@mui/material";
import { CARS, CAR_TYPES, type Car, type CarType, type Badge } from "@/constants/car";
import { formatTHB } from "@/lib/money";

type SortKey = "price_asc" | "price_desc" | "grade_desc";

function badgeStyle(b: Badge) {
    if (b === "Popular") return "!bg-amber-50 !text-amber-700 !border-amber-200";
    if (b === "New") return "!bg-emerald-50 !text-emerald-700 !border-emerald-200";
    return "!bg-slate-50 !text-slate-700 !border-slate-200";
}

// ถ้าหน้านี้ไม่ได้รับ props จริง ๆ ให้ปล่อยว่างได้เลย
type Props = {};

export default function CarsPage(_props: Props) {
    const [q, setQ] = React.useState("");
    const [type, setType] = React.useState<CarType | "all">("all");
    const [sort, setSort] = React.useState<SortKey>("price_asc");

    const filtered = React.useMemo(() => {
        const query = q.trim().toLowerCase();

        let items = CARS.filter((c) => {
            const matchQ = !query || c.name.toLowerCase().includes(query);
            const matchT = type === "all" ? true : c.type === type;
            return matchQ && matchT;
        });

        items = [...items].sort((a, b) => {
            if (sort === "price_asc") return a.pricePerDay - b.pricePerDay;
            if (sort === "price_desc") return b.pricePerDay - a.pricePerDay;
            return b.grade - a.grade;
        });

        return items;
    }, [q, type, sort]);

    return (
        <Container maxWidth="lg" className="py-12">


            <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Box className="flex flex-col gap-2">
                    <Typography variant="h5" className="text-2xl font-bold text-slate-900">รถทั้งหมด</Typography>
                    <Typography className="text-sm text-slate-600">
                        เลือกจากรถหลากหลายประเภท ทั้งรถเก๋ง รถ SUV รถกระบะ และอื่น ๆ พร้อมรายละเอียดครบถ้วน
                    </Typography>
                </Box>

                <Button
                    component={Link}
                    href="/"
                    variant="outlined"
                    className="rounded-xl! border-slate-300! text-slate-900!"
                    sx={{ textTransform: "none" }}
                >
                    กลับหน้าแรก
                </Button>
            </Box>

            <Chip
                size="small"
                label={`${filtered.length} รายการ`}
                variant="outlined"
                className="mt-4 border! border-slate-200! bg-slate-900/5! text-slate-700!"
            />

            {/* Filters */}
            <Box className="mt-2 rounded-2xl! border border-slate-200 bg-white p-5">
                <Box className="grid gap-3 md:grid-cols-3">
                    <TextField
                        label="ค้นหารถ"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        size="small"
                        fullWidth
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                            },
                        }}
                    />

                    <TextField
                        select
                        label="ประเภทรถ"
                        value={type}
                        onChange={(e) => setType(e.target.value as any)}
                        size="small"
                        fullWidth
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                            },
                        }}
                    >
                        <MenuItem value="all">ทั้งหมด</MenuItem>
                        {CAR_TYPES.map((t) => (
                            <MenuItem key={t} value={t}>
                                {t}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="เรียงตาม"
                        value={sort}
                        onChange={(e) => setSort(e.target.value as SortKey)}
                        size="small"
                        fullWidth
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                            },
                        }}
                    >
                        <MenuItem value="price_asc">ราคาต่ำ → สูง</MenuItem>
                        <MenuItem value="price_desc">ราคาสูง → ต่ำ</MenuItem>
                        <MenuItem value="grade_desc">คะแนนสูงสุด</MenuItem>
                    </TextField>
                </Box>
            </Box>

            {/* List */}
            {filtered.length === 0 ? (
                <Box className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
                    <Typography className="text-sm font-semibold text-slate-900">
                        ไม่พบรถที่ตรงกับเงื่อนไข
                    </Typography>
                    <Typography className="mt-1 text-sm text-slate-600">
                        ลองเปลี่ยนคำค้นหา หรือเลือกประเภทอื่น
                    </Typography>
                    <Button
                        variant="outlined"
                        className="mt-5! rounded-xl!"
                        sx={{ textTransform: "none" }}
                        onClick={() => {
                            setQ("");
                            setType("all");
                            setSort("price_asc");
                        }}
                    >
                        รีเซ็ตตัวกรอง
                    </Button>
                </Box>
            ) : (
                <Box className="mt-6 grid gap-5 md:grid-cols-3">
                    {filtered.map((c: Car) => (
                        <Card
                            key={c.id}
                            elevation={0}
                            sx={{ boxShadow: "none" }}
                            className="group bg-white border border-slate-200 rounded-2xl! transition hover:border-slate-400!"
                        >
                            {/* IMAGE */}
                            <Box className="relative h-52 w-full overflow-hidden rounded-t-2xl">
                                <Image
                                    src={c.image || "/cars/placeholder.jpg"}
                                    alt={c.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </Box>

                            <CardContent className="p-6">
                                <Box className="flex items-start justify-between gap-3">
                                    <Box className="min-w-0">
                                        <Typography className="truncate text-lg font-semibold text-slate-900">
                                            {c.name}
                                        </Typography>
                                        <Typography className="text-sm text-slate-600">
                                            {c.type} • {c.seats} ที่นั่ง • {c.transmission} • {c.fuel}
                                        </Typography>
                                    </Box>

                                    {c.badge ? (
                                        <Chip
                                            label={c.badge}
                                            size="small"
                                            variant="outlined"
                                            className={`border! ${badgeStyle(c.badge)}`}
                                        />
                                    ) : null}
                                </Box>

                                <Box className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                                    <Box className="flex items-end gap-2">
                                        <Typography className="text-sm text-slate-600">ราคาเริ่มต้น</Typography>

                                        <Typography className="text-2xl font-extrabold text-slate-900">
                                            {formatTHB(c.pricePerDay)}
                                        </Typography>

                                        <Typography className="text-sm text-slate-600">/วัน</Typography>
                                    </Box>
                                </Box>
                            </CardContent>

                            <CardActions sx={{ p: "0px 16px 16px" }} className="gap-2">
                                <Button
                                    component={Link}
                                    href={`/cars/${encodeURIComponent(c.id)}`}
                                    variant="outlined"
                                    fullWidth
                                    className="rounded-xl! border-slate-300! text-slate-900!"
                                    sx={{ textTransform: "none" }}
                                >
                                    ดูรายละเอียด
                                </Button>

                                <Button
                                    component={Link}
                                    href={`/booking?carId=${encodeURIComponent(c.id)}`}
                                    variant="contained"
                                    fullWidth
                                    className="rounded-xl! font-semibold!"
                                    sx={{ textTransform: "none", backgroundColor: "rgb(15 23 42)" }}
                                >
                                    จองเลย
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}
        </Container>
    );
}