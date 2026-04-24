import api from "@/src/lib/axios";
import { normalizeCustomer } from "../auth/auth.mapper";
import type { ApiResponse } from "../types/types";
import type { Customer } from "../auth/auth.types";
import type {
  ChangePasswordPayload,
  UpdateProfilePayload,
} from "./users.types";

export const usersApi = {
  async getMe() {
    const res = await api.get<ApiResponse<Customer>>("/users/me");
    return {
      ...res.data,
      data: normalizeCustomer(res.data.data)!,
    };
  },

  async updateMe(payload: UpdateProfilePayload) {
    const hasAvatarFile =
      typeof FormData !== "undefined" &&
      typeof File !== "undefined" &&
      payload.avatarFile instanceof File;
    const hasInlineAvatar = payload.avatarUrl?.startsWith("data:") ?? false;

    if (hasAvatarFile || hasInlineAvatar || payload.clearAvatar) {
      const formData = new FormData();
      if (payload.name !== undefined) formData.append("name", payload.name);
      if (payload.phone !== undefined) formData.append("phone", payload.phone);
      if (payload.avatarFile) formData.append("avatar", payload.avatarFile);
      if (!payload.avatarFile && payload.avatarUrl !== undefined) {
        formData.append("avatarUrl", payload.avatarUrl);
      }
      if (payload.clearAvatar) formData.append("clearAvatar", "true");

      const res = await api.patch<ApiResponse<Customer>>(
        "/users/me",
        formData
      );
      return {
        ...res.data,
        data: normalizeCustomer(res.data.data)!,
      };
    }

    const res = await api.patch<ApiResponse<Customer>>("/users/me", payload);
    return {
      ...res.data,
      data: normalizeCustomer(res.data.data)!,
    };
  },

  async changePassword(payload: ChangePasswordPayload) {
    const res = await api.patch<ApiResponse<null>>(
      "/users/me/password",
      payload
    );
    return res.data;
  },
};
