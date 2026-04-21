import api from "@/src/lib/axios";
import { getRentFlowTenantHeaders } from "@/src/lib/tenant";
import type { ApiResponse } from "../types/types";
import type { RentFlowRequestOptions } from "../types/types";
import type { CreatePaymentPayload, Payment } from "./payments.types";

export const paymentsApi = {
  async createPayment(
    payload: CreatePaymentPayload,
    options?: RentFlowRequestOptions
  ) {
    const res = await api.post<ApiResponse<Payment>>("/payments", payload, {
      headers:
        options?.tenantSlug !== undefined
          ? getRentFlowTenantHeaders({ tenantSlug: options.tenantSlug })
          : undefined,
    });
    return res.data;
  },

  async getPaymentByBookingId(
    bookingId: string,
    options?: RentFlowRequestOptions
  ) {
    const res = await api.get<ApiResponse<Payment>>(
      `/payments/booking/${bookingId}`,
      {
        headers:
          options?.tenantSlug !== undefined
            ? getRentFlowTenantHeaders({ tenantSlug: options.tenantSlug })
            : undefined,
      }
    );
    return res.data;
  },
};
