"use client";

import * as React from "react";
import type { Car } from "@/src/constants/cars";
import { getCars } from "@/src/services/APIcars/cars.api";

type Params = {
    q: string;
    type: string;
    sort: "price_asc" | "price_desc";
    location: string;
    pickupDate: string;
    returnDate: string;
};

export function useCarsCatalog(params: Params) {
    const [cars, setCars] = React.useState<Car[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        let cancelled = false;

        async function loadCars() {
            try {
                setLoading(true);

                const start = Date.now();

                const res = await getCars(params);
                const elapsed = Date.now() - start;
                const delay = Math.max(2000 - elapsed, 0);

                await new Promise((r) => setTimeout(r, delay));

                if (cancelled) return;

                setCars(res.items);
            } catch (err: any) {
                if (cancelled) return;

                setError(err?.message ?? "โหลดข้อมูลไม่สำเร็จ");
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadCars();

        return () => {
            cancelled = true;
        };
    }, [
        params.q,
        params.type,
        params.sort,
        params.location,
        params.pickupDate,
        params.returnDate,
    ]);

    return {
        cars,
        loading,
        error,
    };
}