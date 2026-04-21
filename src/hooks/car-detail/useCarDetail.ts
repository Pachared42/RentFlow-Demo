"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { normCarId } from "@/src/utils/car-detail/carDetail.format";
import usePageReady from "@/src/hooks/usePageReady";
import { getRentFlowSiteMode } from "@/src/lib/tenant";
import { getCarById } from "@/src/services/cars/cars.service";
import type { Car } from "@/src/services/cars/cars.types";

export default function useCarDetail(carId: string) {
  const ready = usePageReady();
  const searchParams = useSearchParams();
  const siteMode = React.useMemo(() => getRentFlowSiteMode(), []);
  const tenantSlug = searchParams.get("tenant") || undefined;

  const id = React.useMemo(() => normCarId(carId), [carId]);
  const [detail, setDetail] = React.useState<Car | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function loadCar() {
      if (!id) {
        setDetail(null);
        return;
      }

      try {
        const car = await getCarById(id, {
          marketplace: siteMode === "marketplace",
          tenantSlug,
        });
        if (!cancelled) {
          setDetail(car);
        }
      } catch {
        if (!cancelled) {
          setDetail(null);
        }
      }
    }

    loadCar();

    return () => {
      cancelled = true;
    };
  }, [id, siteMode, tenantSlug]);

  return {
    ready,
    id,
    detail,
  };
}
