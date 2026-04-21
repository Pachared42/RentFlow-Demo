import api from "@/src/lib/axios";
import { getRentFlowTenantHeaders } from "@/src/lib/tenant";
import type { ApiResponse } from "../types/types";
import type { RentFlowRequestOptions } from "../types/types";
import type { Branch } from "./branches.types";

export const branchesApi = {
  async getBranches(options?: RentFlowRequestOptions) {
    const res = await api.get<ApiResponse<Branch[]>>("/branches", {
      params: {
        marketplace: options?.marketplace ? "true" : undefined,
      },
      headers:
        options?.tenantSlug !== undefined
          ? getRentFlowTenantHeaders({ tenantSlug: options.tenantSlug })
          : undefined,
    });
    return res.data;
  },

  async getBranchById(branchId: string, options?: RentFlowRequestOptions) {
    const res = await api.get<ApiResponse<Branch>>(`/branches/${branchId}`, {
      headers:
        options?.tenantSlug !== undefined
          ? getRentFlowTenantHeaders({ tenantSlug: options.tenantSlug })
          : undefined,
    });
    return res.data;
  },
};
