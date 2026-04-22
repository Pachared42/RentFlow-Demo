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
    <Box component="section" className="bg-[var(--rf-apple-bg)]">
      <Container maxWidth="lg" className="apple-section pt-[56px]!">
        <Box className="mx-auto max-w-4xl text-center">
          <Typography
            className="apple-heading"
            sx={{
              fontSize: { xs: "44px", sm: "64px", md: "80px" },
            }}
          >
            รถที่ใช่ สำหรับทุกการเดินทาง
          </Typography>
          <Box
            className="apple-subtitle mt-4 flex flex-col items-center justify-center text-center"
            sx={{
              width: "100vw",
              ml: "calc(50% - 50vw)",
              fontSize: { xs: 18, md: 24 },
              lineHeight: 1.35,
              textAlign: "center",
              textWrap: "balance",
            }}
          >
            <Box component="span" sx={{ display: "block", width: "100%", textAlign: "center" }}>
              เลือกรถ เช็กราคา และจองได้ในหน้าเดียว
            </Box>
            <Box component="span" sx={{ display: "block", width: "100%", textAlign: "center" }}>
              พร้อมประสบการณ์ที่เรียบง่ายเหมือนเลือกผลิตภัณฑ์ที่คุณชอบ
            </Box>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            className="mt-7 flex-wrap justify-center"
            useFlexGap
          >
            {["ราคาชัดเจน", "เลือกรับรถได้หลายสาขา", "พร้อมเดินทาง"].map(
              (label) => (
                <Chip
                  key={label}
                  label={label}
                  className="apple-pill h-9! px-2! text-[var(--rf-apple-muted)]!"
                />
              )
            )}
          </Stack>
        </Box>

        <Box className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <Box className="apple-card relative min-h-[360px] overflow-hidden bg-black md:min-h-[520px]">
            {heroImages.length ? (
              heroImages.map((src, i) => {
                const active = i === heroIndex;

                return (
                  <Box
                    key={src}
                    className={[
                      "absolute inset-0 transition-all duration-700",
                      active ? "scale-100 opacity-100" : "scale-[1.02] opacity-0",
                    ].join(" ")}
                    sx={{
                      backgroundImage: `url(${src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                );
              })
            ) : (
              <Box className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-800 to-slate-600" />
            )}

            <Box className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <Box className="absolute bottom-6 left-6 right-6 text-white md:bottom-8 md:left-8 md:right-8">
              <Typography
                className="font-black tracking-[-0.05em]"
                sx={{
                  fontSize: { xs: "34px", md: "48px", lg: "52px" },
                  lineHeight: 0.98,
                  whiteSpace: { md: "nowrap" },
                }}
              >
                พร้อมออกเดินทาง ในไม่กี่คลิก
              </Typography>
            </Box>
          </Box>

          <Box id="search" className="scroll-mt-28">
            <Card elevation={0} className="apple-card h-full">
              <CardContent className="p-5! md:p-7!">
                <Typography
                  className="apple-heading"
                  sx={{ fontSize: { xs: 30, md: 38 } }}
                >
                  ค้นหารถเช่า
                </Typography>
                <Typography className="apple-subtitle mt-2 text-sm">
                  เลือกช่วงเวลา สาขา และรุ่นที่ต้องการ
                </Typography>

                <Box className="mt-6 grid gap-4">
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

                  <Box className="grid gap-4 sm:grid-cols-2">
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

                  <Button
                    size="large"
                    variant="contained"
                    className="min-h-12! rounded-full! text-base!"
                    onClick={handleSearch}
                  >
                    ค้นหารถว่าง
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
