"use client";

import * as React from "react";
import { getErrorMessage } from "@/src/lib/api-error";
import { getRentFlowSiteMode } from "@/src/lib/tenant";
import { getCars } from "@/src/services/cars/cars.service";
import type { Car } from "@/src/services/cars/cars.types";

type Params = {
    q: string;
    type: string;
    sort: "price_asc" | "price_desc";
    location: string;
    pickupDate: string;
    returnDate: string;
};

export function useCarsCatalog(params: Params) {
  const { q, type, sort, location, pickupDate, returnDate } = params;
  const siteMode = React.useMemo(() => getRentFlowSiteMode(), []);
  const [cars, setCars] = React.useState<Car[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        let cancelled = false;

        async function loadCars() {
            try {
                setLoading(true);
                setError(null);

                const start = Date.now();

                const res = await getCars({
                    q,
                    type,
                    sort,
                    location,
                    pickupDate,
                    returnDate,
                }, {
                    marketplace: siteMode === "marketplace",
                });
                const elapsed = Date.now() - start;
                const delay = Math.max(1000 - elapsed, 0);

                await new Promise((r) => setTimeout(r, delay));

                if (cancelled) return;

                setCars(res.items);
            } catch (err: unknown) {
                if (cancelled) return;

                setError(getErrorMessage(err, "โหลดข้อมูลไม่สำเร็จ"));
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
        location,
        pickupDate,
        q,
        returnDate,
        siteMode,
        sort,
        type,
    ]);

    return {
        cars,
        loading,
        error,
    };
}
