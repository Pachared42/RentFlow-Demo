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
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
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

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);

  const [accept, setAccept] = React.useState(true);

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const nameOk = name.trim().length >= 2;
  const emailOk = isValidEmail(email);
  const pwOk = password.trim().length >= 6;
  const confirmOk = confirm === password && confirm.length > 0;

  const canSubmit =
    nameOk && emailOk && pwOk && confirmOk && accept && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nameOk) return setError("กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร");
    if (!emailOk) return setError("อีเมลไม่ถูกต้อง");
    if (!pwOk) return setError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
    if (confirm !== password) return setError("ยืนยันรหัสผ่านไม่ตรงกัน");
    if (!accept) return setError("กรุณายอมรับเงื่อนไขการใช้งาน");

    try {
      setLoading(true);

      // TODO: ต่อ API จริง
      // const res = await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name, email, password }),
      // });
      // if (!res.ok) throw new Error("สมัครสมาชิกไม่สำเร็จ");
      // router.push("/login");

      await new Promise((r) => setTimeout(r, 450)); // mock
      router.push("/login");
    } catch (err: any) {
      setError(err?.message || "สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  const pwMismatch = confirm.length > 0 && confirm !== password;

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
                สมัครสมาชิก
              </Typography>
              <Typography className="text-sm text-slate-600">
                กรอกข้อมูลให้ครบเพื่อสร้างบัญชีใหม่
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
              className="mt-3 grid gap-4"
            >
              {(() => {
                const showNameErr = name.length > 0 && !nameOk;
                const showEmailErr = email.length > 0 && !emailOk;
                const showPwErr = password.length > 0 && !pwOk;
                const showConfirmErr = pwMismatch;

                return (
                  <>
                    <TextField
                      label="ชื่อผู้ใช้งาน"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      sx={fieldSX}
                      autoComplete="name"
                      error={showNameErr}
                      helperText={
                        showNameErr ? "อย่างน้อย 2 ตัวอักษร" : undefined
                      }
                      FormHelperTextProps={{
                        sx: { display: showNameErr ? "block" : "none", m: 0 },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonRoundedIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      label="อีเมล"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                      sx={fieldSX}
                      autoComplete="email"
                      inputMode="email"
                      error={showEmailErr}
                      helperText={
                        showEmailErr ? "รูปแบบอีเมลไม่ถูกต้อง" : undefined
                      }
                      FormHelperTextProps={{
                        sx: { display: showEmailErr ? "block" : "none", m: 0 },
                      }}
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
                      autoComplete="new-password"
                      error={showPwErr}
                      helperText={
                        showPwErr ? "อย่างน้อย 6 ตัวอักษร" : undefined
                      }
                      FormHelperTextProps={{
                        sx: { display: showPwErr ? "block" : "none", m: 0 },
                      }}
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
                              aria-label={
                                showPw ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"
                              }
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

                    <TextField
                      label="ยืนยันรหัสผ่าน"
                      type={showPw ? "text" : "password"}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      fullWidth
                      sx={fieldSX}
                      autoComplete="new-password"
                      error={showConfirmErr}
                      helperText={
                        showConfirmErr ? "ยืนยันรหัสผ่านไม่ตรงกัน" : undefined
                      }
                      FormHelperTextProps={{
                        sx: {
                          display: showConfirmErr ? "block" : "none",
                          m: 0,
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockRoundedIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <FormControlLabel
                      className="select-none"
                      control={
                        <Checkbox
                          checked={accept}
                          onChange={(e) => setAccept(e.target.checked)}
                          sx={{
                            color: "rgb(148,163,184)",
                            "&.Mui-checked": { color: "rgb(15 23 42)" },
                          }}
                        />
                      }
                      label={
                        <Typography className="text-sm text-slate-600">
                          ฉันยอมรับ{" "}
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
                      }
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
                          <span>กำลังสมัครสมาชิก...</span>
                        </Stack>
                      ) : (
                        "สมัครสมาชิก"
                      )}
                    </Button>

                    <Stack
                      direction="row"
                      className="items-center pt-1 gap-2 justify-center"
                    >
                      <Typography className="text-xs text-slate-500">
                        มีบัญชีแล้ว?
                      </Typography>
                      <Link
                        href="/login"
                        className="text-sm font-semibold text-slate-900 underline-offset-2 hover:underline"
                      >
                        เข้าสู่ระบบ
                      </Link>
                    </Stack>
                  </>
                );
              })()}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
