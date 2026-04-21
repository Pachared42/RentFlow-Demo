"use client";

import * as React from "react";
import { getErrorMessage } from "@/src/lib/api-error";
import { getRentFlowSiteMode } from "@/src/lib/tenant";
import {
  buildCarClasses,
  buildCarTypes,
  buildLocationOptions,
} from "@/src/lib/rentflow-catalog";
import { branchesApi } from "@/src/services/branches/branches.service";
import type { Branch } from "@/src/services/branches/branches.types";
import { getCars } from "@/src/services/cars/cars.service";
import type { Car } from "@/src/services/cars/cars.types";

export function useCatalogDirectory() {
  const siteMode = React.useMemo(() => getRentFlowSiteMode(), []);
  const [cars, setCars] = React.useState<Car[]>([]);
  const [branches, setBranches] = React.useState<Branch[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function loadDirectory() {
      setLoading(true);
      setError(null);

      const [carsResult, branchesResult] = await Promise.allSettled([
        getCars(undefined, {
          marketplace: siteMode === "marketplace",
        }),
        branchesApi.getBranches({
          marketplace: siteMode === "marketplace",
        }),
      ]);

      if (cancelled) return;

      const messages: string[] = [];

      if (carsResult.status === "fulfilled") {
        setCars(carsResult.value.items);
      } else {
        setCars([]);
        messages.push(getErrorMessage(carsResult.reason, "โหลดข้อมูลรถไม่สำเร็จ"));
      }

      if (branchesResult.status === "fulfilled") {
        setBranches(branchesResult.value.data);
      } else {
        setBranches([]);
        messages.push(
          getErrorMessage(branchesResult.reason, "โหลดข้อมูลสาขาไม่สำเร็จ")
        );
      }

      setError(messages.length ? messages.join(" • ") : null);
      setLoading(false);
    }

    loadDirectory();

    return () => {
      cancelled = true;
    };
  }, [siteMode]);

  return {
    siteMode,
    cars,
    branches,
    carTypes: React.useMemo(() => buildCarTypes(cars), [cars]),
    locations: React.useMemo(() => buildLocationOptions(branches), [branches]),
    classes: React.useMemo(() => buildCarClasses(cars), [cars]),
    loading,
    error,
  };
}
