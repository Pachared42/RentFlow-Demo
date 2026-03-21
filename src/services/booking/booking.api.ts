import api from "@/src/lib/axios";
import type { ApiResponse } from "../types/types";
import type {
  Booking,
  BookingPricePreview,
  BookingPricePreviewPayload,
  CreateBookingPayload,
} from "./booking.types";

export const bookingApi = {
  async previewPrice(payload: BookingPricePreviewPayload) {
    const res = await api.post<ApiResponse<BookingPricePreview>>(
      "/bookings/preview",
      payload
    );
    return res.data;
  },

  async createBooking(payload: CreateBookingPayload) {
    const res = await api.post<ApiResponse<Booking>>("/bookings", payload);
    return res.data;
  },

  async getMyBookings() {
    const res = await api.get<ApiResponse<Booking[]>>("/bookings/me");
    return res.data;
  },

  async getBookingById(bookingId: string) {
    const res = await api.get<ApiResponse<Booking>>(`/bookings/${bookingId}`);
    return res.data;
  },

  async cancelBooking(bookingId: string) {
    const res = await api.patch<ApiResponse<Booking>>(
      `/bookings/${bookingId}/cancel`
    );
    return res.data;
  },
};
