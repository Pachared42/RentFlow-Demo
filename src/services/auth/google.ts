export type GoogleUserInfo = {
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
};

export async function fetchGoogleUserInfo(
  accessToken: string
): Promise<GoogleUserInfo> {
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

  if (!profileRes.ok) {
    throw new Error("ไม่สามารถเชื่อมต่อ Google เพื่อดึงข้อมูลผู้ใช้ได้");
  }

  if (!googleUser?.email) {
    throw new Error("ไม่สามารถดึงอีเมลผู้ใช้จาก Google ได้");
  }

  return googleUser;
}
