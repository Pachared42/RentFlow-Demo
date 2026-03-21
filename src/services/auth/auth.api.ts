import api from "@/src/lib/axios";
import type {
  GoogleAuthPayload,
  GoogleAuthResponse,
  LegacyGoogleAuthResponse,
} from "./auth.types";

function normalizeGoogleAuthResponse(
  raw: GoogleAuthResponse | LegacyGoogleAuthResponse | null
): GoogleAuthResponse {
  if (!raw) {
    return {};
  }

  if ("data" in raw) {
    return raw as GoogleAuthResponse;
  }

  if ("user" in raw && raw.user) {
    return {
      success: raw.success,
      message: raw.message,
      data: {
        user: raw.user,
      },
    };
  }

  return {
    success: raw.success,
    message: raw.message,
  };
}

export async function authWithGoogle(
  payload: GoogleAuthPayload,
  fallbackMessage = "สมัครหรือเข้าสู่ระบบด้วย Google ไม่สำเร็จ"
): Promise<GoogleAuthResponse> {
  try {
    const res = await api.post<GoogleAuthResponse | LegacyGoogleAuthResponse>(
      "/auth/google",
      payload
    );

    return normalizeGoogleAuthResponse(res.data);
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || fallbackMessage;

    throw new Error(message);
  }
}

export async function signInWithGoogle(
  payload: GoogleAuthPayload,
  fallbackMessage = "สมัครหรือเข้าสู่ระบบด้วย Google ไม่สำเร็จ"
): Promise<GoogleAuthResponse> {
  return authWithGoogle(payload, fallbackMessage);
}

export async function logout(
  fallbackMessage = "ออกจากระบบไม่สำเร็จ"
): Promise<{ success?: boolean; message?: string }> {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || fallbackMessage;

    throw new Error(message);
  }
}

export async function getMe(
  fallbackMessage = "ดึงข้อมูลผู้ใช้ไม่สำเร็จ"
): Promise<GoogleAuthResponse> {
  try {
    const res = await api.get<GoogleAuthResponse>("/auth/me");
    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || fallbackMessage;

    throw new Error(message);
  }
}
