"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Chip,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import {
  CARS,
  CAR_TYPES,
  type Car,
  type CarType,
} from "@/src/constants/cars";
import { formatTHB } from "@/src/constants/money";
import { LOCATIONS, type LocationValue } from "@/src/constants/locations";

type SortKey = "price_asc" | "price_desc";

type Props = {};

export default function CarsPage(_props: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialQ = searchParams.get("q") ?? "";
  const initialType = searchParams.get("type") ?? "all";
  const initialLocation = searchParams.get("location") ?? "";
  const initialPickupDate = searchParams.get("pickupDate") ?? "";
  const initialReturnDate = searchParams.get("returnDate") ?? "";

  const [q, setQ] = React.useState(initialQ);
  const [type, setType] = React.useState<CarType | "all">(
    initialType === "All" ? "all" : (initialType as CarType | "all")
  );
  const [sort, setSort] = React.useState<SortKey>("price_asc");
  const [location, setLocation] = React.useState<LocationValue | "">(
    initialLocation as LocationValue | ""
  );
  const [pickupDate, setPickupDate] = React.useState(initialPickupDate);
  const [returnDate, setReturnDate] = React.useState(initialReturnDate);

  React.useEffect(() => {
    const nextQ = searchParams.get("q") ?? "";
    const nextType = searchParams.get("type") ?? "all";
    const nextLocation = searchParams.get("location") ?? "";
    const nextPickupDate = searchParams.get("pickupDate") ?? "";
    const nextReturnDate = searchParams.get("returnDate") ?? "";

    setQ(nextQ);
    setType(nextType === "All" ? "all" : (nextType as CarType | "all"));
    setLocation(nextLocation as LocationValue | "");
    setPickupDate(nextPickupDate);
    setReturnDate(nextReturnDate);
  }, [searchParams]);

  const updateUrl = React.useCallback(
    (next: {
      q?: string;
      type?: CarType | "all";
      location?: LocationValue | "";
      pickupDate?: string;
      returnDate?: string;
      sort?: SortKey;
    }) => {
      const params = new URLSearchParams(searchParams.toString());

      const nextQ = next.q ?? q;
      const nextType = next.type ?? type;
      const nextLocation = next.location ?? location;
      const nextPickupDate = next.pickupDate ?? pickupDate;
      const nextReturnDate = next.returnDate ?? returnDate;

      if (nextQ.trim()) params.set("q", nextQ.trim());
      else params.delete("q");

      if (nextType && nextType !== "all") params.set("type", nextType);
      else params.delete("type");

      if (nextLocation) params.set("location", nextLocation);
      else params.delete("location");

      if (nextPickupDate) params.set("pickupDate", nextPickupDate);
      else params.delete("pickupDate");

      if (nextReturnDate) params.set("returnDate", nextReturnDate);
      else params.delete("returnDate");

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, q, type, location, pickupDate, returnDate, router, pathname]
  );

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase();

    let items = CARS.filter((c) => {
      const matchQ =
        !query ||
        c.name.toLowerCase().includes(query) ||
        c.type.toLowerCase().includes(query);

      const matchT = type === "all" ? true : c.type === type;

      return matchQ && matchT;
    });

    items = [...items].sort((a, b) => {
      if (sort === "price_asc") return a.pricePerDay - b.pricePerDay;
      return b.pricePerDay - a.pricePerDay;
    });

    return items;
  }, [q, type, sort]);

  return (
    <Container maxWidth="lg" className="py-12">
      <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Box className="flex flex-col gap-2">
          <Typography
            variant="h5"
            className="text-2xl font-bold text-slate-900"
          >
            รถทั้งหมด
          </Typography>
          <Typography className="text-sm text-slate-600">
            เลือกจากรถหลากหลายประเภท ทั้งรถเก๋ง รถ SUV รถกระบะ และอื่น ๆ
            พร้อมรายละเอียดครบถ้วน
          </Typography>
        </Box>

        <Chip
          size="small"
          label={`${filtered.length} รายการ`}
          variant="outlined"
          className="w-min border! border-slate-200! bg-slate-900/5! text-slate-700!"
        />
      </Box>

      <Box className="mt-4 rounded-2xl! border border-slate-200 bg-white p-4">
        <Box className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <TextField
            label="ค้นหารถ"
            value={q}
            onChange={(e) => {
              const value = e.target.value;
              setQ(value);
              updateUrl({ q: value });
            }}
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
            onChange={(e) => {
              const value = e.target.value as CarType | "all";
              setType(value);
              updateUrl({ type: value });
            }}
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
            label="สาขารับรถ"
            value={location}
            onChange={(e) => {
              const value = e.target.value as LocationValue | "";
              setLocation(value);
              updateUrl({ location: value });
            }}
            size="small"
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          >
            <MenuItem value="">ทั้งหมด</MenuItem>
            {LOCATIONS.map((loc) => (
              <MenuItem key={loc.value} value={loc.value}>
                {loc.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="date"
            label="วันรับรถ"
            value={pickupDate}
            onChange={(e) => {
              const value = e.target.value;
              setPickupDate(value);
              updateUrl({ pickupDate: value });
            }}
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />

          <TextField
            type="date"
            label="วันคืนรถ"
            value={returnDate}
            onChange={(e) => {
              const value = e.target.value;
              setReturnDate(value);
              updateUrl({ returnDate: value });
            }}
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />
        </Box>

        <Box className="mt-4 grid gap-4 md:grid-cols-2">
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
          </TextField>

          <Button
            variant="outlined"
            className="rounded-xl!"
            sx={{ textTransform: "none" }}
            onClick={() => {
              setQ("");
              setType("all");
              setSort("price_asc");
              setLocation("");
              setPickupDate("");
              setReturnDate("");
              router.replace(pathname, { scroll: false });
            }}
          >
            รีเซ็ตตัวกรอง
          </Button>
        </Box>
      </Box>

      {filtered.length === 0 ? (
        <Box className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
          <Typography className="text-sm font-semibold text-slate-900">
            ไม่พบรถที่ตรงกับเงื่อนไข
          </Typography>
          <Typography className="mt-1 text-sm text-slate-600">
            ลองเปลี่ยนคำค้นหา หรือเลือกประเภทอื่น
          </Typography>
        </Box>
      ) : (
        <Box className="mt-6 grid gap-4 md:grid-cols-3">
          {filtered.map((c: Car) => (
            <Card
              key={c.id}
              elevation={0}
              sx={{ boxShadow: "none" }}
              className="group rounded-2xl! border border-slate-200 bg-white transition hover:border-slate-400!"
            >
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
                </Box>

                <Box className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <Box className="flex items-end gap-2">
                    <Typography className="text-sm text-slate-600">
                      ราคาเริ่มต้น
                    </Typography>

                    <Typography className="text-2xl font-extrabold text-slate-900">
                      {formatTHB(c.pricePerDay)}
                    </Typography>

                    <Typography className="text-sm text-slate-600">
                      /วัน
                    </Typography>
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
                  sx={{
                    textTransform: "none",
                    backgroundColor: "rgb(15 23 42)",
                    "&:hover": {
                      backgroundColor: "rgb(2 6 23)",
                    },
                  }}
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