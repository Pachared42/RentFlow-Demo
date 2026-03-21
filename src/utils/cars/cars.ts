import { CARS, type Car, type CarType } from "@/src/constants/cars";

export type SortKey = "price_asc" | "price_desc";

export function filterAndSortCars(params: {
    q: string;
    type: CarType | "all";
    sort: SortKey;
}): Car[] {
    const { q, type, sort } = params;
    const query = q.trim().toLowerCase();

    let items = CARS.filter((car) => {
        const matchQ =
            !query ||
            car.name.toLowerCase().includes(query) ||
            car.type.toLowerCase().includes(query);

        const matchType = type === "all" ? true : car.type === type;

        return matchQ && matchType;
    });

    items = [...items].sort((a, b) => {
        if (sort === "price_asc") return a.pricePerDay - b.pricePerDay;
        return b.pricePerDay - a.pricePerDay;
    });

    return items;
}