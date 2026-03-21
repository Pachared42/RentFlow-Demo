import type { GoogleUserInfo } from "./google";

export type GoogleAuthPayload = {
    accessToken: string;
    user: GoogleUserInfo;
};

export type GoogleAuthResponse = {
    token?: string;
    message?: string;
};

export async function authWithGoogle(
    payload: GoogleAuthPayload,
    fallbackMessage = "สมัครหรือเข้าสู่ระบบด้วย Google ไม่สำเร็จ"
): Promise<GoogleAuthResponse> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        throw new Error("ยังไม่ได้ตั้งค่า NEXT_PUBLIC_API_URL");
    }

    const res = await fetch(`${apiUrl}/auth/google`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data: GoogleAuthResponse | null = await res.json().catch(() => null);

    if (!res.ok) {
        throw new Error(data?.message || fallbackMessage);
    }

    return data || {};
}

export function saveAuthToken(token?: string) {
    if (token) {
        localStorage.setItem("token", token);
    }
}