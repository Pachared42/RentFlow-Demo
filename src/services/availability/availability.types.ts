export type CheckAvailabilityPayload = {
  carId: string;
  pickupDate: string;
  returnDate: string;
};

export type AvailabilityResult = {
  carId: string;
  available: boolean;
  unavailableDates?: string[];
};
