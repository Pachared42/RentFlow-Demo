import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import type { Car } from "@/src/constants/cars";
import type { CarClass } from "@/src/constants/classesCar";
import { formatTHB } from "@/src/constants/money";

export default function ClassPage({
  meta,
  cars,
}: {
  meta: CarClass;
  cars: Car[];
}) {
  return (
    <Box className="min-h-screen bg-white text-slate-900">
      <Container maxWidth="lg" className="py-10">
        <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Box className="flex flex-col gap-2">
            <Typography
              variant="h5"
              className="text-2xl font-bold text-slate-900"
            >
              รถ{meta.title}
            </Typography>
          </Box>
        </Box>

        <Box className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((c) => (
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
                <Link
                  href={`/cars/${encodeURIComponent(String(c.id))}`}
                  className="flex-1"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="outlined"
                    fullWidth
                    className="rounded-xl! border-slate-300! text-slate-900!"
                    sx={{ textTransform: "none" }}
                  >
                    ดูรายละเอียด
                  </Button>
                </Link>

                <Link
                  href={`/booking?carId=${encodeURIComponent(String(c.id))}`}
                  className="flex-1"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    className="rounded-xl! font-semibold!"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "rgb(15 23 42)",
                    }}
                  >
                    จองเลย
                  </Button>
                </Link>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}