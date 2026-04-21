import type { AuthResponse, Customer } from "./auth.types";

type LegacyAuthResponse = {
  success?: boolean;
  message?: string;
  user?: Customer;
  data?: Customer | { user?: Customer };
};

export function normalizeAuthResponse(
  raw: AuthResponse | LegacyAuthResponse | null
): AuthResponse {
  if (!raw) return {};

  const data = raw.data;

  if (data && "user" in data) {
    return {
      success: raw.success,
      message: raw.message,
      data: data.user ? { user: data.user } : undefined,
    };
  }

  if (data && "id" in data) {
    return {
      success: raw.success,
      message: raw.message,
      data: { user: data },
    };
  }

  if ("user" in raw && raw.user) {
    return {
      success: raw.success,
      message: raw.message,
      data: { user: raw.user },
    };
  }

  return {
    success: raw.success,
    message: raw.message,
  };
}
