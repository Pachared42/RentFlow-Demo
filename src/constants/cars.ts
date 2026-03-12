export type CarType = "Economy" | "Sedan" | "SUV" | "Van";
export type Transmission = "Auto" | "Manual";
export type Fuel = "Gasoline" | "Hybrid" | "EV";
export type Grade = 1 | 2 | 3 | 4;

export type Car = {
    id: string;
    name: string;
    type: CarType;
    seats: number;
    transmission: Transmission;
    fuel: Fuel;
    pricePerDay: number;
    image?: string;
    grade: Grade;
};

export const CAR_TYPES: CarType[] = [
    "Economy",
    "Sedan",
    "SUV",
    "Van",
];

export const CARS: Car[] = [
    {
        id: "c1",
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
        id: "c2",
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
        id: "c3",
        name: "BMW M3 CS",
        type: "SUV",
        seats: 5,
        transmission: "Auto",
        fuel: "Gasoline",
        pricePerDay: 1990,
        image: "/cosySec2.webp",
        grade: 1,
    },
    {
        id: "c4",
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
        id: "c5",
        name: "BMW i5 M60 xDrive",
        type: "Van",
        seats: 5,
        transmission: "Auto",
        fuel: "EV",
        pricePerDay: 1790,
        image: "/cosySec4.webp",
        grade: 3,
    },
    {
        id: "c6",
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

export function getCarSummary(id: string) {
    return CARS.find((c) => c.id === id);
}
