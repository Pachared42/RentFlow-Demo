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
