"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

const fieldSX = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255,255,255,0.98)",
    borderRadius: "14px",
    transition: "box-shadow .2s ease, transform .06s ease",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(203,213,225,0.9)",
      borderWidth: 1.5,
      borderRadius: "14px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(148,163,184)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(15 23 42)",
      borderWidth: 2,
    },
    "&.Mui-focused": {
      boxShadow: "none",
    },
  },
  "& .MuiInputBase-input": { color: "rgb(15,23,42)" },
  "& .MuiInputLabel-root": { color: "rgb(71,85,105)" },
  "& .MuiInputLabel-root.Mui-focused": { color: "rgb(15 23 42)" },
} as const;

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const canSubmit =
    isValidEmail(email) && password.trim().length >= 6 && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidEmail(email)) {
      setError("อีเมลไม่ถูกต้อง");
      return;
    }
    if (password.trim().length < 6) {
      setError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }

    try {
      setLoading(true);

      // TODO: ต่อ API จริง
      // const res = await fetch("/api/auth/login", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ email, password }) })
      // if (!res.ok) throw new Error("เข้าสู่ระบบไม่สำเร็จ");
      // const data = await res.json();
      // store token -> context/localStorage/cookie

      await new Promise((r) => setTimeout(r, 450)); // mock
      router.push("/"); // TODO: เปลี่ยนเป็น /dashboard ถ้ามี
    } catch (err: any) {
      setError(err?.message || "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box aria-hidden className="pointer-events-none fixed inset-0" />

      <Container maxWidth="sm" className="relative py-12">
        <Stack className="mb-6 items-center text-center">
          <Box
            className="mb-3 grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm"
            sx={{ boxShadow: "none" }}
          >
            <Typography className="text-base font-black text-slate-900">
              CR
            </Typography>
          </Box>
          <Typography className="text-2xl font-extrabold text-slate-900">
            RentFlow Car
          </Typography>
        </Stack>

        <Card
          elevation={0}
          className="w-full rounded-2xl! border border-slate-200 bg-white"
          sx={{
            boxShadow: "none",
            backdropFilter: "blur(6px)",
          }}
        >
          <CardContent className="p-7">
            <Stack spacing={1} className="mb-4 items-center text-center">
              <Typography
                variant="h5"
                className="text-xl font-bold text-slate-900"
              >
                เข้าสู่ระบบ
              </Typography>
              <Typography className="text-sm text-slate-600">
                ยินดีต้อนรับกลับมา — พร้อมออกเดินทางแล้วใช่ไหม
              </Typography>
            </Stack>

            <Divider className="my-5! border-slate-200!" />

            {error ? (
              <Alert
                severity="error"
                className="mb-4 rounded-xl!"
                onClose={() => setError(null)}
              >
                {error}
              </Alert>
            ) : null}

            <Box
              component="form"
              onSubmit={handleSubmit}
              className="mt-3! grid gap-4"
            >
              <TextField
                label="อีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={fieldSX}
                autoComplete="email"
                inputMode="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRoundedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="รหัสผ่าน"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={fieldSX}
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPw((v) => !v)}
                        aria-label={showPw ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                      >
                        {showPw ? (
                          <VisibilityOffRoundedIcon fontSize="small" />
                        ) : (
                          <VisibilityRoundedIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={!canSubmit}
                className="rounded-xl! py-3! font-semibold!"
                sx={{
                  textTransform: "none",
                  backgroundColor: "rgb(15 23 42)",
                  "&:hover": { backgroundColor: "rgb(2 6 23)" },
                }}
              >
                {loading ? (
                  <Stack direction="row" className="items-center gap-2">
                    <CircularProgress size={18} />
                    <span>กำลังเข้าสู่ระบบ...</span>
                  </Stack>
                ) : (
                  "เข้าสู่ระบบ"
                )}
              </Button>

              <Stack
                direction="row"
                className="items-center pt-1 gap-6 justify-center"
              >
                <Stack direction="row" className="items-center gap-2">
                  <Typography className="text-xs text-slate-500">
                    ลืมรหัสผ่าน?
                  </Typography>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-semibold text-slate-900 underline-offset-2 hover:underline"
                  >
                    กดที่นี่
                  </Link>
                </Stack>

                <Stack direction="row" className="items-center gap-2">
                  <Typography className="text-xs text-slate-500">
                    ยังไม่มีบัญชี?
                  </Typography>
                  <Link
                    href="/register"
                    className="text-sm font-semibold text-slate-900 underline-offset-2 hover:underline"
                  >
                    สมัครสมาชิก
                  </Link>
                </Stack>
              </Stack>

              <Typography className="pt-2 text-center text-[16px]! leading-relaxed text-slate-500">
                การเข้าสู่ระบบถือว่าคุณยอมรับ{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-slate-700 underline-offset-2 hover:underline"
                >
                  เงื่อนไขการใช้งาน
                </Link>{" "}
                และ{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-slate-700 underline-offset-2 hover:underline"
                >
                  นโยบายความเป็นส่วนตัว
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
