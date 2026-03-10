"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";

declare global {
  interface Window {
    google?: any;
  }
}

type GoogleUserInfo = {
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
};

export default function RegisterPage() {
  const router = useRouter();

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [googleReady, setGoogleReady] = React.useState(false);

  const tokenClientRef = React.useRef<any>(null);

  const handleGoogleLogin = React.useCallback(() => {
    try {
      setError(null);

      if (!window.google?.accounts?.oauth2 || !tokenClientRef.current) {
        throw new Error("Google Sign-In ยังไม่พร้อม");
      }

      setLoading(true);
      tokenClientRef.current.requestAccessToken();
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || "ไม่สามารถเริ่ม Google Sign-In ได้");
    }
  }, []);

  const initGoogle = React.useCallback(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!window.google?.accounts?.oauth2) return;

    if (!clientId) {
      setError("ยังไม่ได้ตั้งค่า NEXT_PUBLIC_GOOGLE_CLIENT_ID");
      return;
    }

    tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "openid email profile",
      callback: async (tokenResponse: {
        access_token?: string;
        error?: string;
      }) => {
        try {
          if (tokenResponse?.error) {
            throw new Error("สมัครหรือเข้าสู่ระบบด้วย Google ไม่สำเร็จ");
          }

          const accessToken = tokenResponse?.access_token;
          if (!accessToken) {
            throw new Error("ไม่ได้รับ access token จาก Google");
          }

          const profileRes = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const googleUser: GoogleUserInfo | null = await profileRes
            .json()
            .catch(() => null);

          if (!profileRes.ok || !googleUser?.email) {
            throw new Error("ไม่สามารถดึงข้อมูลผู้ใช้จาก Google ได้");
          }

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                accessToken,
                user: googleUser,
              }),
            }
          );

          const data = await res.json().catch(() => null);

          if (!res.ok) {
            throw new Error(
              data?.message || "สมัครหรือเข้าสู่ระบบด้วย Google ไม่สำเร็จ"
            );
          }

          if (data?.token) {
            localStorage.setItem("token", data.token);
          }

          router.push("/");
        } catch (err: any) {
          setError(err?.message || "สมัครด้วย Google ไม่สำเร็จ");
        } finally {
          setLoading(false);
        }
      },
    });

    setGoogleReady(true);
  }, [router]);

  React.useEffect(() => {
    if (window.google?.accounts?.oauth2) {
      initGoogle();
    }
  }, [initGoogle]);

  return (
    <Box>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initGoogle}
      />

      <Box aria-hidden className="pointer-events-none fixed inset-0" />

      <Container maxWidth="sm" className="relative py-12">
        <Card
          elevation={0}
          className="w-full rounded-2xl! border border-slate-200 bg-white"
          sx={{
            boxShadow: "none",
            backdropFilter: "blur(6px)",
          }}
        >
          <CardContent className="p-8!">
            <Stack className="mb-6 items-center text-center">
              <Box
                className="mb-3 grid h-12 w-50 place-items-center rounded-2xl border border-slate-200 bg-white"
                sx={{ boxShadow: "none" }}
              >
                <Typography className="text-base font-black text-slate-900">
                  RentFlow
                </Typography>
              </Box>
            </Stack>
            <Stack spacing={1} className="mb-4 items-center text-center">
              <Typography
                variant="h5"
                className="text-xl font-bold text-slate-900"
              >
                สมัครสมาชิก
              </Typography>

              <Typography className="text-sm text-slate-600">
                ดำเนินการต่อด้วยบัญชี Google ของคุณ
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

            <Stack spacing={2} className="items-center">
              <Button
                fullWidth
                variant="outlined"
                onClick={handleGoogleLogin}
                disabled={!googleReady || loading}
                sx={{
                  minHeight: 54,
                  borderRadius: "12px",
                  px: 2.25,
                  py: 1.5,
                  gap: 1.25,
                  justifyContent: "center",
                  borderColor: "rgb(226 232 240)",
                  color: "rgb(15 23 42)",
                  backgroundColor: "#fff",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "rgb(203 213 225)",
                    backgroundColor: "rgb(248 250 252)",
                    boxShadow: "none",
                  },
                  "&.Mui-disabled": {
                    borderColor: "rgb(226 232 240)",
                    backgroundColor: "rgb(248 250 252)",
                    color: "rgb(148 163 184)",
                  },
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={18} />
                    <span>กำลังดำเนินการ...</span>
                  </>
                ) : (
                  <>
                    <Box
                      component="img"
                      src="/google.svg"
                      alt="Google"
                      sx={{
                        width: 20,
                        height: 20,
                        display: "block",
                        flexShrink: 0,
                      }}
                    />
                    <span>ดำเนินการต่อด้วย Google</span>
                  </>
                )}
              </Button>

              {!googleReady && !loading ? (
                <Typography className="text-xs text-slate-500">
                  กำลังโหลด Google Sign-In...
                </Typography>
              ) : null}
            </Stack>

            <Box className="mt-5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <Typography className="text-center text-sm! leading-5 text-slate-600">
                เมื่อดำเนินการต่อ ถือว่าคุณยอมรับ{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-slate-900 underline-offset-2 hover:underline"
                >
                  เงื่อนไขการใช้งาน
                </Link>{" "}
                และ{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-slate-900 underline-offset-2 hover:underline"
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
