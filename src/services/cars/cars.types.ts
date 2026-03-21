export type CarType = "Economy" | "Sedan" | "SUV" | "Van";
export type Transmission = "Auto" | "Manual";
export type Fuel = "Gasoline" | "Hybrid" | "EV";

export type Car = {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  type: CarType;
  seats: number;
  transmission: Transmission;
  fuel: Fuel;
  pricePerDay: number;
  imageUrl: string;
  images?: string[];
  description?: string;
  locationId?: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CarsQuery = {
  page?: number;
  limit?: number;
  search?: string;
  type?: CarType | "All";
  transmission?: Transmission;
  fuel?: Fuel;
  minPrice?: number;
  maxPrice?: number;
  seats?: number;
  locationId?: string;
  startDate?: string;
  endDate?: string;
};
