"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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

import { Herotextfield } from "@/src/components/hero/Herotextfield";
import type { LocationOption } from "@/src/lib/rentflow-catalog";
import type { CarType } from "@/src/services/cars/cars.types";

type Props = {
  heroImages: readonly string[];

  location: string;
  setLocation: (v: string) => void;

  type: CarType | "All";
  setType: (v: CarType | "All") => void;

  pickupDate: string;
  setPickupDate: (v: string) => void;

  returnDate: string;
  setReturnDate: (v: string) => void;

  q: string;
  setQ: (v: string) => void;

  carTypes: readonly CarType[];
  locations: readonly LocationOption[];
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
  locations,
}: Props) {
  const router = useRouter();
  const [heroIndex, setHeroIndex] = React.useState(0);

  React.useEffect(() => {
    if (!heroImages.length) return;

    const t = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length);
    }, 3500);

    return () => clearInterval(t);
  }, [heroImages.length]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (pickupDate) params.set("pickupDate", pickupDate);
    if (returnDate) params.set("returnDate", returnDate);
    if (q.trim()) params.set("q", q.trim());
    if (type && type !== "All") params.set("type", type);

    router.push(`/cars?${params.toString()}`);
  };

  return (
    <Box className="relative">
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

        <Box className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
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

      <Container
        maxWidth="lg"
        className="relative z-10 -mt-16 pb-12 sm:-mt-16 md:-mt-28 lg:-mt-36"
      >
        <Box className="rounded-[28px]! border border-slate-200 bg-white/80! p-6 backdrop-blur-xl! md:p-10">
          <Box className="grid items-center gap-10 md:grid-cols-2">
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

              <Stack direction="row" spacing={1} className="mt-6 flex-wrap">
                <Chip
                  label="ประกันพื้นฐาน"
                  className="border border-slate-200! bg-slate-900/5! text-slate-700!"
                />
                <Chip
                  label="ยกเลิกฟรี (ตามเงื่อนไข)"
                  className="border border-slate-200! bg-slate-900/5! text-slate-700!"
                />
                <Chip
                  label="บริการ 24/7"
                  className="border border-slate-200! bg-slate-900/5! text-slate-700!"
                />
              </Stack>
            </Box>

            <Box id="search" className="scroll-mt-36">
              <Card
                elevation={0}
                className="rounded-2xl! border border-slate-200! bg-white/70! backdrop-blur-xl!"
                sx={{ boxShadow: "none" }}
              >
                <CardContent className="p-4!">
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
                      onChange={(e) => setLocation(e.target.value)}
                      fullWidth
                      sx={Herotextfield}
                    >
                      <MenuItem value="">ทุกสาขา</MenuItem>
                      {locations.map((loc) => (
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
                        sx={Herotextfield}
                      />
                      <TextField
                        type="date"
                        label="วันคืนรถ"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        sx={Herotextfield}
                      />
                    </Box>

                    <Box className="grid gap-4 md:grid-cols-2">
                      <TextField
                        select
                        label="ประเภทรถ"
                        value={type}
                        onChange={(e) => setType(e.target.value as CarType | "All")}
                        fullWidth
                        sx={Herotextfield}
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
                        sx={Herotextfield}
                      />
                    </Box>

                    <Button
                      size="large"
                      variant="contained"
                      className="rounded-xl! py-3! font-semibold!"
                      sx={{
                        textTransform: "none",
                        backgroundColor: "rgb(15 23 42)",
                        "&:hover": {
                          backgroundColor: "rgb(2 6 23)",
                        },
                      }}
                      onClick={handleSearch}
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
