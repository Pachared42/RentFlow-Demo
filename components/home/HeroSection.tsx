"use client";

import * as React from "react";
import Link from "next/link";
import {
    Box,
    Container,
    Typography,
    TextField,
    MenuItem,
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
} from "@mui/material";

import type { Car } from "@/constants/car";
import { LOCATIONS, type LocationValue } from "@/constants/locations";
import { textFieldSX } from "@/ui/textfield";

type Props = {
    heroImages: readonly string[];

    location: LocationValue;
    setLocation: (v: LocationValue) => void;

    type: Car["type"] | "All";
    setType: (v: Car["type"] | "All") => void;

    pickupDate: string;
    setPickupDate: (v: string) => void;

    returnDate: string;
    setReturnDate: (v: string) => void;

    q: string;
    setQ: (v: string) => void;

    carTypes: readonly Car["type"][];

    onSearch?: () => void;
};

export default function HeroSection({
    heroImages,
    location,
    setLocation,
    type,
    setType,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    q,
    setQ,
    carTypes,
    onSearch,
}: Props) {
    const [heroIndex, setHeroIndex] = React.useState(0);

    React.useEffect(() => {
        const t = setInterval(() => {
            setHeroIndex((i) => (i + 1) % heroImages.length);
        }, 3500);
        return () => clearInterval(t);
    }, [heroImages.length]);

    return (
        <Box className="relative">
            {/* ชั้นรูป: sticky อยู่ด้านหลัง */}
            <Box className="sticky hero-ipad top-0 h-[30vh] sm:h-[65vh] md:h-[36vh] lg:h-[85vh] overflow-hidden">
                {heroImages.map((src, i) => {
                    const active = i === heroIndex;

                    return (
                        <React.Fragment key={src}>
                            <Box
                                className={[
                                    "absolute inset-0 transition-opacity duration-700",
                                    active ? "opacity-100" : "opacity-0",
                                ].join(" ")}
                                sx={{
                                    backgroundImage: `url(${src})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: {
                                        xs: "center 100%",
                                        md: "center 75%",
                                        lg: "center 80%",
                                    },
                                }}
                            />

                            <Box
                                className={[
                                    "absolute inset-0 transition-opacity duration-700",
                                    active ? "opacity-100" : "opacity-0",
                                ].join(" ")}
                                sx={{
                                    backgroundImage: `url(${src})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: {
                                        xs: "center 100%",
                                        md: "center 75%",
                                        lg: "center 80%",
                                    },
                                    filter: "blur(18px)",
                                    transform: "scale(1.06)",
                                    opacity: 0.95,

                                    WebkitMaskImage:
                                        "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,1) 88%, rgba(0,0,0,1) 100%)",
                                    maskImage:
                                        "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,1) 88%, rgba(0,0,0,1) 100%)",
                                }}
                            />
                        </React.Fragment>
                    );
                })}

                <Box className="absolute inset-0 bg-black/15" />

                <Box
                    className="pointer-events-none absolute bottom-0 left-0 w-full"
                    sx={{
                        height: { xs: "110px", sm: "150px", md: "190px", lg: "240px" },
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 45%, rgba(255,255,255,0.88) 78%, rgba(255,255,255,1) 100%)",
                    }}
                />

                <Box className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <Typography
                        className="text-white font-extrabold! drop-shadow-xl!"
                        sx={{
                            fontSize: { xs: "28px", sm: "40px", md: "48px", lg: "64px" },
                            letterSpacing: "-0.02em",
                        }}
                    >
                        RentFlow
                    </Typography>

                    <Typography
                        className="mt-4 text-white/90 drop-shadow-md"
                        sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px" } }}
                    >
                        ยินดีให้บริการรถเช่าคุณภาพดี ราคาชัดเจน พร้อมออกเดินทางทุกเส้นทาง
                    </Typography>
                </Box>
            </Box>

            {/* ชั้นคอนเทนต์: เลื่อนทับรูป */}
            <Container
                maxWidth="lg"
                className="relative z-10 -mt-16 sm:-mt-16 md:-mt-28 lg:-mt-36 pb-12"
            >
                <Box className="rounded-[28px]! border border-slate-200 bg-white/80! backdrop-blur-xl! p-6 md:p-10">
                    <Box className="grid items-center gap-10 md:grid-cols-2">
                        {/* Left */}
                        <Box>
                            <Typography
                                variant="h3"
                                className="font-extrabold tracking-tight text-slate-900"
                            >
                                เช่ารถยนต์ง่าย ๆ พร้อมออกเดินทางทันที
                            </Typography>

                            <Typography className="mt-3 text-slate-600">
                                เลือกรถที่เหมาะกับทริปของคุณ — ราคาชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง
                                รองรับรับรถหลายสาขา
                            </Typography>

                            <Stack direction="row" spacing={1.5} className="mt-6 flex-wrap">
                                <Chip
                                    label="ประกันพื้นฐาน"
                                    className="bg-slate-900/5! text-slate-700! border border-slate-200!"
                                />
                                <Chip
                                    label="ยกเลิกฟรี (ตามเงื่อนไข)"
                                    className="bg-slate-900/5! text-slate-700! border border-slate-200!"
                                />
                                <Chip
                                    label="บริการ 24/7"
                                    className="bg-slate-900/5! text-slate-700! border border-slate-200!"
                                />
                            </Stack>
                        </Box>

                        {/* Search Card */}
                        <Box id="search" className="scroll-mt-36">
                            <Card
                                elevation={0}
                                className="bg-white/70! backdrop-blur-xl! border border-slate-200! rounded-3xl!"
                                sx={{ boxShadow: "none" }}
                            >
                                <CardContent className="p-6">
                                    <Typography
                                        variant="h6"
                                        className="font-semibold text-slate-900"
                                    >
                                        ค้นหารถเช่า
                                    </Typography>
                                    <Typography className="mt-1 text-sm text-slate-600">
                                        กรอกข้อมูลเพื่อดูรถที่ว่างในช่วงเวลาและสาขาที่ต้องการ
                                    </Typography>

                                    <Box className="mt-5 grid gap-4">
                                        <TextField
                                            select
                                            label="สาขารับรถ"
                                            value={location}
                                            onChange={(e) =>
                                                setLocation(e.target.value as LocationValue)
                                            }
                                            fullWidth
                                            sx={textFieldSX}
                                        >
                                            {LOCATIONS.map((loc) => (
                                                <MenuItem key={loc.value} value={loc.value}>
                                                    {loc.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                        <Box className="grid gap-4 md:grid-cols-2">
                                            <TextField
                                                type="date"
                                                label="วันรับรถ"
                                                value={pickupDate}
                                                onChange={(e) => setPickupDate(e.target.value)}
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                sx={textFieldSX}
                                            />
                                            <TextField
                                                type="date"
                                                label="วันคืนรถ"
                                                value={returnDate}
                                                onChange={(e) => setReturnDate(e.target.value)}
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                sx={textFieldSX}
                                            />
                                        </Box>

                                        <Box className="grid gap-4 md:grid-cols-2">
                                            <TextField
                                                select
                                                label="ประเภทรถ"
                                                value={type}
                                                onChange={(e) =>
                                                    setType(e.target.value as Car["type"] | "All")
                                                }
                                                fullWidth
                                                sx={textFieldSX}
                                            >
                                                <MenuItem value="All">ทั้งหมด</MenuItem>
                                                {carTypes.map((t) => (
                                                    <MenuItem key={t} value={t}>
                                                        {t}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <TextField
                                                label="ค้นหาชื่อรุ่น"
                                                value={q}
                                                onChange={(e) => setQ(e.target.value)}
                                                placeholder="เช่น Yaris, Cross..."
                                                fullWidth
                                                sx={textFieldSX}
                                            />
                                        </Box>

                                        <Button
                                            size="large"
                                            variant="contained"
                                            className="rounded-xl! py-3! font-semibold!"
                                            sx={{
                                                textTransform: "none",
                                                backgroundColor: "rgb(15 23 42)",
                                            }}
                                            onClick={onSearch}
                                        >
                                            ค้นหารถว่าง
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}