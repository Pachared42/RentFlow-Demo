import api from "@/src/lib/axios";
import { CARS, type Car } from "@/src/constants/cars";

export type SortKey = "price_asc" | "price_desc";

export type GetCarsParams = {
    q?: string;
    type?: string;
    location?: string;
    pickupDate?: string;
    returnDate?: string;
    sort?: SortKey;
};

export type GetCarsResponse = {
    items: Car[];
    total: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * ดึงรายการรถ
 * - ถ้ามี API_URL จะยิง API ผ่าน axios
 * - ถ้าไม่มีหรือยิงไม่สำเร็จ จะ fallback ใช้ CARS constant
 */
export async function getCars(
    params?: GetCarsParams
): Promise<GetCarsResponse> {
    try {
        if (API_URL) {
            const res = await api.get("/cars", {
                params: {
                    q: params?.q || undefined,
                    type:
                        params?.type && params.type !== "all" ? params.type : undefined,
                    location: params?.location || undefined,
                    pickupDate: params?.pickupDate || undefined,
                    returnDate: params?.returnDate || undefined,
                    sort: params?.sort || undefined,
                },
            });

            const data = res.data;

            return {
                items: data?.items ?? [],
                total: data?.total ?? 0,
            };
        }
    } catch (err) {
        console.error("carsAPI error:", err);
    }

    let items = [...CARS];

    if (params?.q) {
        const query = params.q.toLowerCase();

        items = items.filter(
            (c) =>
                c.name.toLowerCase().includes(query) ||
                c.type.toLowerCase().includes(query)
        );
    }

    if (params?.type && params.type !== "all") {
        items = items.filter((c) => c.type === params.type);
    }

    if (params?.sort === "price_asc") {
        items.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (params?.sort === "price_desc") {
        items.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    return {
        items,
        total: items.length,
    };
}