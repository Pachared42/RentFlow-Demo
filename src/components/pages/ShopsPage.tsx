"use client";

import * as React from "react";
import { Alert, Box } from "@mui/material";

import ShopRecommendationsSection from "@/src/components/shops/ShopRecommendationsSection";
import ShopsPageSkeleton from "@/src/components/shops/ShopsPageSkeleton";
import { useCatalogDirectory } from "@/src/hooks/catalog/useCatalogDirectory";
import { buildShopSummaries } from "@/src/lib/shop-directory";

export default function ShopsPage() {
  const { cars, loading, error } = useCatalogDirectory();
  const [minimumLoading, setMinimumLoading] = React.useState(true);
  const shops = React.useMemo(() => buildShopSummaries(cars), [cars]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setMinimumLoading(false);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, []);

  if (loading || minimumLoading) {
    return <ShopsPageSkeleton />;
  }

  return (
    <Box className="min-h-screen bg-white text-slate-900">
      {error ? (
        <Box className="mx-auto mb-6 w-full max-w-6xl px-6">
          <Alert severity="warning" className="rounded-2xl!">
            {error}
          </Alert>
        </Box>
      ) : null}

      <ShopRecommendationsSection
        shops={shops}
        title="ร้านทั้งหมด"
        subtitle="เลือกร้านเช่ารถที่เหมาะกับการเดินทางของคุณ"
        showDivider={false}
        layout="page"
      />
    </Box>
  );
}
