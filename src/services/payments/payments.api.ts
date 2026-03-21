import api from "@/src/lib/axios";
import type { ApiResponse } from "../types/types";
import type { CreatePaymentPayload, Payment } from "./payments.types";

export const paymentsApi = {
  async createPayment(payload: CreatePaymentPayload) {
    const res = await api.post<ApiResponse<Payment>>("/payments", payload);
    return res.data;
  },

  async getPaymentByBookingId(bookingId: string) {
    const res = await api.get<ApiResponse<Payment>>(
      `/payments/booking/${bookingId}`
    );
    return res.data;
  },
};
