import api from "@/src/lib/axios";
import type { ApiResponse } from "../types/types";
import type { Branch } from "./branches.types";

export const branchesApi = {
  async getBranches() {
    const res = await api.get<ApiResponse<Branch[]>>("/branches");
    return res.data;
  },

  async getBranchById(branchId: string) {
    const res = await api.get<ApiResponse<Branch>>(`/branches/${branchId}`);
    return res.data;
  },
};
