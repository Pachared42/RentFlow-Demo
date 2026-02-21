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
  CardActions,
  Chip,
  Stack,
  Divider,
} from "@mui/material";

import { CARS, CAR_TYPES, type Car } from "@/constants/car";
import { LOCATIONS, type LocationValue } from "@/constants/locations";
import { textFieldSX } from "@/ui/textfield";

function formatTHB(n: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function HomePage() {
  const [location, setLocation] = React.useState<LocationValue>("bangkok");
  const [type, setType] = React.useState<Car["type"] | "All">("All");
  const [pickupDate, setPickupDate] = React.useState("");
  const [returnDate, setReturnDate] = React.useState("");
  const [q, setQ] = React.useState("");

  const filtered = React.useMemo(() => {
    return CARS.filter((c) => {
      const matchType = type === "All" ? true : c.type === type;
      const matchQ = q.trim()
        ? c.name.toLowerCase().includes(q.trim().toLowerCase())
        : true;
      return matchType && matchQ;
    });
  }, [type, q]);

  return (
    <Box className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <Box className="relative overflow-hidden">
        <Box className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-500/10 via-white to-white" />
        <Container maxWidth="lg" className="relative py-14 md:py-20">
          <Box className="grid items-center gap-10 md:grid-cols-2">
            <Box>
              <Typography variant="h3" className="mt-4 font-extrabold tracking-tight text-slate-900">
                เช่ารถยนต์ง่าย ๆ พร้อมออกเดินทางทันที
              </Typography>
              <Typography className="mt-3 text-slate-600">
                เลือกรถที่เหมาะกับทริปของคุณ — ราคาชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง รองรับรับรถหลายสาขา
              </Typography>

              <Stack direction="row" spacing={1.5} className="mt-6 flex-wrap">
                <Chip label="ประกันพื้นฐาน" className="bg-slate-900/5! text-slate-700! border border-slate-200!" />
                <Chip label="ยกเลิกฟรี (ตามเงื่อนไข)" className="bg-slate-900/5! text-slate-700! border border-slate-200!" />
                <Chip label="บริการ 24/7" className="bg-slate-900/5! text-slate-700! border border-slate-200!" />
              </Stack>

              <Box className="mt-8 flex items-center gap-3">
                <Button
                  component={Link}
                  href="/cars"
                  variant="contained"
                  className="rounded-xl! px-5! py-3! font-semibold!"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "rgb(15 23 42)",
                  }}
                >
                  ดูรถทั้งหมด
                </Button>
              </Box>
            </Box>

            {/* Search Card */}
            <Card
              elevation={0}
              className="bg-white/70! backdrop-blur-xl! border border-slate-200! rounded-2xl!"
              sx={{ boxShadow: "none" }}
            >
              <CardContent className="p-6">
                <Typography variant="h6" className="font-semibold text-slate-900">
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
                    onChange={(e) => setLocation(e.target.value as LocationValue)}
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
                      onChange={(e) => setType(e.target.value as any)}
                      fullWidth
                      sx={textFieldSX}
                    >
                      <MenuItem value="All">ทั้งหมด</MenuItem>
                      {CAR_TYPES.map((t) => (
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
                    onClick={() => {
                      console.log({ location, pickupDate, returnDate, type, q });
                    }}
                  >
                    ค้นหารถว่าง
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* Cars */}
      <Container maxWidth="lg" className="py-12">
        <Box className="flex items-end justify-between gap-4">
          <Box>
            <Typography variant="h5" className="font-bold text-slate-900">
              รถแนะนำ
            </Typography>
            <Typography className="text-slate-600">เลือกคันที่ใช่ แล้วกดจองได้เลย</Typography>
          </Box>

          <Chip
            label={`${filtered.length} คัน`}
            className="bg-slate-900/5! text-slate-700! border border-slate-200!"
          />
        </Box>

        <Divider className="my-6! border-slate-200!" />

        <Box className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <Card
              key={c.id}
              className="bg-white! border! border-slate-200! rounded-2xl transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <CardContent className="p-6">
                <Box className="flex items-start justify-between gap-3">
                  <Box>
                    <Typography className="text-lg font-semibold text-slate-900">
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
                      className="bg-indigo-500/10! text-indigo-700! border border-indigo-200!"
                    />
                  ) : null}
                </Box>

                <Box className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <Typography className="text-sm text-slate-600">ราคาเริ่มต้น</Typography>
                  <Typography className="mt-1 text-2xl font-extrabold text-slate-900">
                    {formatTHB(c.pricePerDay)}
                    <span className="ml-1 text-sm font-medium text-slate-600">/วัน</span>
                  </Typography>

                  <Stack direction="row" spacing={1} className="mt-3 flex-wrap">
                    <Chip size="small" label="ประกันพื้นฐาน" className="bg-slate-900/5! text-slate-700! border border-slate-200!" />
                    <Chip size="small" label="รับรถเร็ว" className="bg-slate-900/5! text-slate-700! border border-slate-200!" />
                  </Stack>
                </Box>
              </CardContent>

              <CardActions className="px-6 pb-6">
                <Button
                  component={Link}
                  href={`/cars/${c.id}`}
                  variant="outlined"
                  fullWidth
                  className="rounded-xl! border-slate-300! text-slate-900! hover:border-slate-400!"
                  sx={{ textTransform: "none" }}
                >
                  ดูรายละเอียด
                </Button>

                <Button
                  component={Link}
                  href={`/booking?carId=${c.id}&loc=${encodeURIComponent(location)}&p=${pickupDate}&r=${returnDate}`}
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
      </Container>

      {/* Benefits + CTA */}
      <Box className="border-t border-slate-200 bg-slate-50">
        <Container maxWidth="lg" className="py-12">
          <Box className="grid gap-6 md:grid-cols-3">
            {[
              { title: "ราคาชัดเจน", desc: "แสดงราคารวมก่อนจอง ลดปัญหาค่าใช้จ่ายแอบแฝง" },
              { title: "รถสภาพดี", desc: "ตรวจเช็คและทำความสะอาดก่อนส่งมอบทุกครั้ง" },
              { title: "ซัพพอร์ต 24/7", desc: "มีทีมช่วยเหลือกรณีฉุกเฉินตลอดการเช่า" },
            ].map((b) => (
              <Card key={b.title} className="bg-white! border! border-slate-200! rounded-2xl">
                <CardContent className="p-6">
                  <Typography className="text-lg font-semibold text-slate-900">{b.title}</Typography>
                  <Typography className="mt-2 text-slate-600">{b.desc}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:flex-row md:items-center">
            <Box>
              <Typography className="text-xl font-bold text-slate-900">
                พร้อมจองรถสำหรับทริปถัดไปแล้วใช่ไหม?
              </Typography>
              <Typography className="mt-1 text-slate-600">
                เลือกช่วงวันและรุ่นรถที่ต้องการ แล้วเริ่มจองได้ทันที
              </Typography>
            </Box>

            <Button
              size="large"
              variant="contained"
              className="rounded-xl! px-6! py-3! font-semibold!"
              sx={{
                textTransform: "none",
                background:
                  "linear-gradient(90deg, rgba(15,23,42,1) 0%, rgba(99,102,241,1) 100%)",
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              ไปที่ค้นหา
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box className="py-8">
        <Container maxWidth="lg">
          <Typography className="text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Car Rental UI • Next.js + MUI + Tailwind
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}