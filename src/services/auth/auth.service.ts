import api from "@/src/lib/axios";
import { getErrorMessage } from "@/src/lib/api-error";
import { normalizeAuthResponse } from "./auth.mapper";
import type {
  AuthResponse,
  Customer,
  LoginPayload,
  RegisterPayload,
} from "./auth.types";

export async function loginWithPassword(
  payload: LoginPayload,
  fallbackMessage = "เข้าสู่ระบบไม่สำเร็จ"
): Promise<AuthResponse> {
  try {
    const res = await api.post("/auth/login", payload);

    return normalizeAuthResponse(res.data);
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, fallbackMessage));
  }
}

export async function registerWithPassword(
  payload: RegisterPayload,
  fallbackMessage = "สมัครสมาชิกไม่สำเร็จ"
): Promise<AuthResponse> {
  try {
    const name = `${payload.firstName} ${payload.lastName}`.trim();
    const res = await api.post("/auth/register", {
      ...payload,
      name,
    });

    return normalizeAuthResponse(res.data);
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, fallbackMessage));
  }
}

export async function logout(
  fallbackMessage = "ออกจากระบบไม่สำเร็จ"
): Promise<{ success?: boolean; message?: string }> {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, fallbackMessage));
  }
}

export async function getMe(
  fallbackMessage = "ดึงข้อมูลผู้ใช้ไม่สำเร็จ"
): Promise<AuthResponse> {
  try {
    const res = await api.get("/auth/me");
    return normalizeAuthResponse(res.data);
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error, fallbackMessage));
  }
}

export async function getSessionUser(
  fallbackMessage = "ดึงข้อมูลผู้ใช้ไม่สำเร็จ"
): Promise<Customer | null> {
  const response = await getMe(fallbackMessage);
  return response.data?.user ?? null;
}
