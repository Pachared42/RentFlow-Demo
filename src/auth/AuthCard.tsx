"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AppSnackbar, {
  type AppSnackbarSeverity,
} from "@/src/components/common/AppSnackbar";
import { getErrorMessage } from "@/src/lib/api-error";
import {
  loginWithPassword,
  registerWithPassword,
} from "@/src/services/auth/auth.api";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: AppSnackbarSeverity;
};

type AuthCardProps = {
  mode: "login" | "register";
  title: string;
  subtitle: string;
  successMessage: string;
  submitErrorMessage: string;
  agreementText: React.ReactNode;
  redirectTo?: string;
};

const fieldSX = {
  "& .MuiOutlinedInput-root": { borderRadius: "12px" },
};

export default function AuthCard({
  mode,
  title,
  subtitle,
  successMessage,
  submitErrorMessage,
  agreementText,
  redirectTo = "/",
}: AuthCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || redirectTo;

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });

  const isRegister = mode === "register";
  const canSubmit = isRegister
    ? firstName.trim().length >= 2 &&
      lastName.trim().length >= 2 &&
      username.trim().length >= 3 &&
      password.length >= 8 &&
      password === confirmPassword
    : username.trim().length >= 3 && password.length >= 1;

  const closeSnackbar = React.useCallback(
    (_?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") return;
      setSnackbar((prev) => ({ ...prev, open: false }));
    },
    []
  );

  const showSnackbar = React.useCallback(
    (message: string, severity: AppSnackbarSeverity = "info") => {
      setSnackbar({ open: true, message, severity });
    },
    []
  );

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!canSubmit || loading) return;

      setLoading(true);

      try {
        if (isRegister) {
          await registerWithPassword(
            {
              username: username.trim(),
              password,
              firstName: firstName.trim(),
              lastName: lastName.trim(),
            },
            submitErrorMessage
          );
        } else {
          await loginWithPassword(
            {
              username: username.trim(),
              password,
            },
            submitErrorMessage
          );
        }

        showSnackbar(successMessage, "success");
        window.setTimeout(() => {
          router.push(redirect);
          router.refresh();
        }, 450);
      } catch (err: unknown) {
        showSnackbar(getErrorMessage(err, submitErrorMessage), "error");
        setLoading(false);
      }
    },
    [
      canSubmit,
      firstName,
      isRegister,
      lastName,
      loading,
      password,
      redirect,
      router,
      showSnackbar,
      submitErrorMessage,
      successMessage,
      username,
    ]
  );

  return (
    <Box className="relative bg-white">
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />

      <Container maxWidth="sm" className="relative py-12">
        <Card
          elevation={0}
          className="w-full rounded-2xl! border border-slate-200 bg-white"
          sx={{ boxShadow: "none", backdropFilter: "blur(6px)" }}
        >
          <CardContent className="p-8!">
            <Stack className="mb-6 items-center text-center">
              <Box className="mb-4 flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-1 py-1">
                <Box className="relative h-20 w-20">
                  <Image
                    src="/RentFlow.png"
                    alt="RentFlow Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </Box>
              </Box>
            </Stack>

            <Stack spacing={1} className="mb-4 items-center text-center">
              <Typography
                variant="h5"
                className="text-xl font-bold text-slate-900"
              >
                {title}
              </Typography>

              <Typography className="text-sm text-slate-600">
                {subtitle}
              </Typography>
            </Stack>

            <Divider className="my-5! border-slate-200!" />

            <Box component="form" onSubmit={handleSubmit} className="grid gap-4">
              {isRegister ? (
                <Box className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label="ชื่อจริง"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    autoComplete="given-name"
                    fullWidth
                    sx={fieldSX}
                  />
                  <TextField
                    label="นามสกุล"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    autoComplete="family-name"
                    fullWidth
                    sx={fieldSX}
                  />
                </Box>
              ) : null}

              <TextField
                label="ชื่อผู้ใช้"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                fullWidth
                sx={fieldSX}
              />

              <TextField
                label="รหัสผ่าน"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={isRegister ? "new-password" : "current-password"}
                fullWidth
                sx={fieldSX}
                helperText={isRegister ? "อย่างน้อย 8 ตัวอักษร" : " "}
              />

              {isRegister ? (
                <TextField
                  label="ยืนยันรหัสผ่าน"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="new-password"
                  fullWidth
                  error={!!confirmPassword && password !== confirmPassword}
                  helperText={
                    confirmPassword && password !== confirmPassword
                      ? "รหัสผ่านไม่ตรงกัน"
                      : " "
                  }
                  sx={fieldSX}
                />
              ) : null}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!canSubmit || loading}
                className="rounded-xl! font-semibold!"
                sx={{
                  minHeight: 52,
                  textTransform: "none",
                  backgroundColor: "rgb(15 23 42)",
                  "&:hover": { backgroundColor: "rgb(2 6 23)" },
                }}
              >
                {loading ? (
                  <Box className="flex items-center gap-2">
                    <CircularProgress size={18} thickness={5} color="inherit" />
                    <span>กำลังดำเนินการ...</span>
                  </Box>
                ) : isRegister ? (
                  "สมัครสมาชิก"
                ) : (
                  "เข้าสู่ระบบ"
                )}
              </Button>
            </Box>

            <Box className="p-4">
              <Typography className="text-center text-xs! leading-5 text-slate-600">
                {agreementText}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
