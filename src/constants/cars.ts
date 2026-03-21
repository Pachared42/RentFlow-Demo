export type CarType = "Economy" | "Sedan" | "SUV" | "Van";
export type Transmission = "Auto" | "Manual";
export type Fuel = "Gasoline" | "Hybrid" | "EV";
export type Grade = 1 | 2 | 3 | 4;
export type CarId =
  | "bmw-320d-m-sport"
  | "bmw-330e-m-sport"
  | "bmw-x3-m50"
  | "bmw-i5-edrive40-m-sport"
  | "bmw-i5-m60-xdrive"
  | "bmw-i7-xdrive60-m-sport";

export type Car = {
  id: CarId;
  name: string;
  type: CarType;
  seats: number;
  transmission: Transmission;
  fuel: Fuel;
  pricePerDay: number;
  image?: string;
  grade: Grade;
};

export const CAR_TYPES: CarType[] = ["Economy", "Sedan", "SUV", "Van"];

export const CARS: Car[] = [
  {
    id: "bmw-320d-m-sport",
    name: "BMW 320d M Sport",
    type: "Sedan",
    seats: 5,
    transmission: "Auto",
    fuel: "Gasoline",
    pricePerDay: 1290,
    image: "/cosySec.webp",
    grade: 3,
  },
  {
    id: "bmw-330e-m-sport",
    name: "BMW 330e M Sport",
    type: "Sedan",
    seats: 5,
    transmission: "Auto",
    fuel: "Hybrid",
    pricePerDay: 1490,
    image: "/cosySec1.webp",
    grade: 4,
  },
  {
    id: "bmw-x3-m50",
    name: "BMW X3 M50",
    type: "SUV",
    seats: 5,
    transmission: "Auto",
    fuel: "Gasoline",
    pricePerDay: 1990,
    image: "/cosySec2.webp",
    grade: 1,
  },
  {
    id: "bmw-i5-edrive40-m-sport",
    name: "BMW i5 eDrive40 M Sport",
    type: "Sedan",
    seats: 5,
    transmission: "Auto",
    fuel: "EV",
    pricePerDay: 1590,
    image: "/cosySec3.webp",
    grade: 2,
  },
  {
    id: "bmw-i5-m60-xdrive",
    name: "BMW i5 M60 xDrive",
    type: "Sedan",
    seats: 5,
    transmission: "Auto",
    fuel: "EV",
    pricePerDay: 1790,
    image: "/cosySec4.webp",
    grade: 3,
  },
  {
    id: "bmw-i7-xdrive60-m-sport",
    name: "BMW i7 xDrive60 M Sport",
    type: "Sedan",
    seats: 5,
    transmission: "Auto",
    fuel: "EV",
    pricePerDay: 1890,
    image: "/cosySec5.webp",
    grade: 1,
  },
];

export function getCarSummary(id: CarId) {
  return CARS.find((c) => c.id === id);
}

export function getCarById(id: string) {
  return CARS.find((c) => c.id === id) ?? null;
}
