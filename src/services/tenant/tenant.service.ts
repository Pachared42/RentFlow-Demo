import api from "@/src/lib/axios";
import { resolveRentFlowAssetUrl } from "@/src/lib/runtime-api-url";
import type { ApiResponse } from "../types/types";
import type { TenantProfile } from "./tenant.types";

function normalizeTenantProfile(tenant: TenantProfile): TenantProfile {
  const promoImageUrls = (tenant.promoImageUrls || [])
    .map((url) => resolveRentFlowAssetUrl(url))
    .filter(Boolean) as string[];
  const promoImageUrl =
    resolveRentFlowAssetUrl(tenant.promoImageUrl) || promoImageUrls[0];

  return {
    ...tenant,
    logoUrl: resolveRentFlowAssetUrl(tenant.logoUrl),
    promoImageUrl,
    promoImageUrls,
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
