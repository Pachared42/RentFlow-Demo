"use client";

import * as React from "react";
import { Alert, Box } from "@mui/material";

import HeroSection from "@/src/components/home/HeroSection";
import CarsSection from "@/src/components/home/CarsSection";
import CarClassSection from "@/src/components/home/CarClassSection";
import BenefitsCTASection from "@/src/components/home/BenefitsCTASection";
import ReviewsSection from "@/src/components/home/ReviewsSection";
import ShopRecommendationsSection from "@/src/components/shops/ShopRecommendationsSection";
import { formatTHB } from "@/src/constants/money";
import { useCatalogDirectory } from "@/src/hooks/catalog/useCatalogDirectory";
import { buildShopSummaries } from "@/src/lib/shop-directory";
import type { CarType } from "@/src/services/cars/cars.types";
import { platformApi } from "@/src/services/platform/platform.service";
import type { PlatformPublicSettings } from "@/src/services/platform/platform.types";
import { tenantApi } from "@/src/services/tenant/tenant.service";
import type { TenantProfile } from "@/src/services/tenant/tenant.types";

type HomePageProps = {
  initialHost?: string;
  initialTenantProfile?: TenantProfile | null;
};

export default function HomePage({
  initialHost,
  initialTenantProfile = null,
}: HomePageProps) {
  const [location, setLocation] = React.useState("");
  const [type, setType] = React.useState<CarType | "All">("All");
  const [pickupDate, setPickupDate] = React.useState("");
  const [returnDate, setReturnDate] = React.useState("");
  const [q, setQ] = React.useState("");
  const { siteMode, cars, carTypes, locations, classes, loading, error } =
    useCatalogDirectory(undefined, initialHost);
  const [tenantProfile, setTenantProfile] =
    React.useState<TenantProfile | null>(initialTenantProfile);
  const [platformSettings, setPlatformSettings] =
    React.useState<PlatformPublicSettings | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    if (siteMode === "marketplace") {
      setTenantProfile(null);
      return;
    }

    tenantApi
      .resolveTenant()
      .then((res) => {
        if (!cancelled) setTenantProfile(res.data);
      })
      .catch(() => {
        if (!cancelled) setTenantProfile(initialTenantProfile);
      });

    return () => {
      cancelled = true;
    };
  }, [initialTenantProfile, siteMode]);

  React.useEffect(() => {
    let cancelled = false;

    if (siteMode !== "marketplace") {
      setPlatformSettings(null);
      return;
    }

    platformApi
      .getPublicSettings()
      .then((settings) => {
        if (!cancelled) setPlatformSettings(settings);
      })
      .catch(() => {
        if (!cancelled) setPlatformSettings(null);
      });

    return () => {
      cancelled = true;
    };
  }, [siteMode]);

  const recommendedCars = React.useMemo(() => {
    return cars.slice(0, 6);
  }, [cars]);
  const recommendedShops = React.useMemo(() => {
    return buildShopSummaries(cars).slice(0, 12);
  }, [cars]);
  const heroImages = React.useMemo(() => {
    if (siteMode === "storefront") {
      const images = tenantProfile?.promoImageUrls?.length
        ? tenantProfile.promoImageUrls
        : tenantProfile?.promoImageUrl
          ? [tenantProfile.promoImageUrl]
          : [];

      return images.filter(Boolean);
    }

    return platformSettings?.promoImageUrl ? [platformSettings.promoImageUrl] : [];
  }, [platformSettings, siteMode, tenantProfile]);

  return (
    <Box className="apple-page">
      <HeroSection
        heroImages={heroImages}
        location={location}
        setLocation={setLocation}
        type={type}
        setType={setType}
        pickupDate={pickupDate}
        setPickupDate={setPickupDate}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
        q={q}
        setQ={setQ}
        carTypes={carTypes}
        locations={locations}
      />

      {error ? (
        <Box className="mx-auto w-full max-w-6xl px-6">
          <Alert severity="warning" className="rounded-2xl!">
            {error}
          </Alert>
        </Box>
      ) : null}

      {siteMode === "marketplace" ? (
        <>
          <ShopRecommendationsSection shops={recommendedShops} limit={12} />
        </>
      ) : (
        <>
          <CarsSection cars={recommendedCars} formatTHB={formatTHB} />
          <CarClassSection classes={classes} loading={loading} />
        </>
      )}

      <ReviewsSection />

      <BenefitsCTASection />
    </Box>
  );
}
