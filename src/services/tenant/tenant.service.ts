import api from "@/src/lib/axios";
import { resolveRentFlowAssetUrl } from "@/src/lib/runtime-api-url";
import type { ApiResponse } from "../types/types";
import type { TenantProfile } from "./tenant.types";

function normalizeTenantProfile(tenant: TenantProfile): TenantProfile {
  return {
    ...tenant,
    logoUrl: resolveRentFlowAssetUrl(tenant.logoUrl),
    promoImageUrl: resolveRentFlowAssetUrl(tenant.promoImageUrl),
  };
}

export const tenantApi = {
  async resolveTenant() {
    const res = await api.get<ApiResponse<TenantProfile>>("/tenants/resolve");
    return {
      ...res.data,
      data: normalizeTenantProfile(res.data.data),
    };
  },
};
