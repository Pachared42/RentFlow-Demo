// src/services/booking/booking.types.ts
import type { TenantSummary } from "../types/types";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "paid"
  | "completed"
  | "cancelled";

export type PickupMethod = "branch" | "custom";
export type ReturnMethod = "branch" | "custom";

export type Booking = TenantSummary & {
  id: string;
  bookingCode: string;
  userId: string;
  carId: string;
  carName?: string;
  status: BookingStatus;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
  pickupLocationValue?: string;
  returnLocationValue?: string;
  pickupMethod: PickupMethod;
  returnMethod: ReturnMethod;
  totalDays: number;
  subtotal: number;
  extraCharge: number;
  discount: number;
  totalAmount: number;
  note?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: string;
  updatedAt: string;
  tenantId?: string;
};

export type CreateBookingPayload = {
  carId: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
  pickupMethod: PickupMethod;
  returnMethod: ReturnMethod;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  note?: string;
};

export type BookingPricePreview = {
  totalDays: number;
  pricePerDay: number;
  subtotal: number;
  extraCharge: number;
  discount: number;
  totalAmount: number;
};

export type BookingPricePreviewPayload = {
  carId: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation?: string;
  returnLocation?: string;
};
