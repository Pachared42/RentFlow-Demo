import api from "@/src/lib/axios";
import type { ApiResponse } from "../types/types";
import type {
  AvailabilityResult,
  CheckAvailabilityPayload,
} from "./availability.types";

export const availabilityApi = {
  async check(payload: CheckAvailabilityPayload) {
    const res = await api.post<ApiResponse<AvailabilityResult>>(
      "/availability/check",
      payload
    );
    return res.data;
  },

  async getUnavailableDates(carId: string) {
    const res = await api.get<ApiResponse<string[]>>(
      `/availability/${carId}/unavailable-dates`
    );
    return res.data;
  },
};
