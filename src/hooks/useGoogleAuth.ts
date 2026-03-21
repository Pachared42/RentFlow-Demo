"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { fetchGoogleUserInfo } from "@/src/services/auth/google";
import { signInWithGoogle } from "@/src/services/auth/auth.api";

declare global {
  interface Window {
    google?: any;
  }
}

export type SnackbarSeverity = "success" | "error" | "info" | "warning";

type UseGoogleAuthOptions = {
  successMessage: string;
  authErrorMessage: string;
  submitErrorMessage: string;
  redirectTo?: string;
};

type ShowSnackbar = (message: string, severity?: SnackbarSeverity) => void;

export function useGoogleAuth({
  successMessage,
  authErrorMessage,
  submitErrorMessage,
  redirectTo = "/",
}: UseGoogleAuthOptions) {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [googleReady, setGoogleReady] = React.useState(false);

  const tokenClientRef = React.useRef<any>(null);
  const initializedRef = React.useRef(false);
  const initStartedAtRef = React.useRef(Date.now());

  const initGoogle = React.useCallback(
    (showSnackbar: ShowSnackbar) => {
      if (initializedRef.current) return;

      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

      if (!window.google?.accounts?.oauth2) return;

      if (!clientId) {
        showSnackbar("ยังไม่ได้ตั้งค่า NEXT_PUBLIC_GOOGLE_CLIENT_ID", "error");
        return;
      }

      tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: "openid email profile",
        callback: async (tokenResponse: {
          access_token?: string;
          error?: string;
        }) => {
          const startedAt = Date.now();

          try {
            if (tokenResponse?.error) {
              throw new Error(authErrorMessage);
            }

            const accessToken = tokenResponse?.access_token;

            if (!accessToken) {
              throw new Error("ไม่ได้รับ access token จาก Google");
            }

            const googleUser = await fetchGoogleUserInfo(accessToken);

            await signInWithGoogle(
              {
                accessToken,
                user: googleUser,
              },
              submitErrorMessage
            );

            const elapsed = Date.now() - startedAt;
            const delay = Math.max(2000 - elapsed, 0);

            setTimeout(() => {
              showSnackbar(successMessage, "success");

              setTimeout(() => {
                router.push(redirectTo);
              }, 700);

              setLoading(false);
            }, delay);
          } catch (err: any) {
            const elapsed = Date.now() - startedAt;
            const delay = Math.max(2000 - elapsed, 0);

            setTimeout(() => {
              showSnackbar(err?.message || submitErrorMessage, "error");
              setLoading(false);
            }, delay);
          }
        },
      });

      initializedRef.current = true;

      const elapsed = Date.now() - initStartedAtRef.current;
      const delay = Math.max(1200 - elapsed, 0);

      setTimeout(() => {
        setGoogleReady(true);
      }, delay);
    },
    [authErrorMessage, redirectTo, router, submitErrorMessage, successMessage]
  );

  const handleGoogleAuth = React.useCallback((showSnackbar: ShowSnackbar) => {
    try {
      if (!window.google?.accounts?.oauth2 || !tokenClientRef.current) {
        throw new Error("Google Sign-In ยังไม่พร้อม");
      }

      setLoading(true);
      tokenClientRef.current.requestAccessToken();
    } catch (err: any) {
      setLoading(false);
      showSnackbar(
        err?.message || "ไม่สามารถเริ่ม Google Sign-In ได้",
        "error"
      );
    }
  }, []);

  return {
    loading,
    googleReady,
    initGoogle,
    handleGoogleAuth,
  };
}
