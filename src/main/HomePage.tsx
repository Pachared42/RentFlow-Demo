"use client";

import * as React from "react";
import { Alert, Box } from "@mui/material";

import HeroSection from "@/src/components/home/HeroSection";
import MarketplaceHeroSection, {
  type MarketplaceHeroShop,
} from "@/src/components/home/MarketplaceHeroSection";
import MarketplaceHighlightsSection from "@/src/components/home/MarketplaceHighlightsSection";
import CarsSection from "@/src/components/home/CarsSection";
import CarClassSection from "@/src/components/home/CarClassSection";
import BenefitsCTASection from "@/src/components/home/BenefitsCTASection";
import ReviewsSection from "@/src/components/home/ReviewsSection";
import { useCatalogDirectory } from "@/src/hooks/catalog/useCatalogDirectory";
import type { CarType } from "@/src/services/cars/cars.types";

export default function HomePage() {
  const [location, setLocation] = React.useState("");
  const [type, setType] = React.useState<CarType | "All">("All");
  const [pickupDate, setPickupDate] = React.useState("");
  const [returnDate, setReturnDate] = React.useState("");
  const [q, setQ] = React.useState("");
  const { cars, carTypes, locations, classes, loading, error, siteMode } =
    useCatalogDirectory();

  const recommendedCars = React.useMemo(() => {
    return cars.slice(0, 6);
  }, [cars]);
  const heroImages = React.useMemo(() => {
    return cars
      .flatMap((car) => car.images?.length ? car.images : car.image ? [car.image] : [])
      .slice(0, 6);
  }, [cars]);
  const marketplaceShops = React.useMemo<MarketplaceHeroShop[]>(() => {
    const byShop = new Map<
      string,
      {
        name: string;
        slug?: string;
        carCount: number;
        minPrice: number | null;
        leadImage?: string;
      }
    >();

    for (const car of cars) {
      const key = car.domainSlug || car.shopName || car.id;
      const current = byShop.get(key);
      const nextPrice =
        typeof car.pricePerDay === "number" && Number.isFinite(car.pricePerDay)
          ? car.pricePerDay
          : null;
      const nextImage = car.image || car.images?.[0];

      if (!current) {
        byShop.set(key, {
          name: car.shopName || car.domainSlug || "ร้านเช่ารถ",
          slug: car.domainSlug,
          carCount: 1,
          minPrice: nextPrice,
          leadImage: nextImage,
        });
        continue;
      }

      current.carCount += 1;
      if (
        typeof nextPrice === "number" &&
        (current.minPrice === null || nextPrice < current.minPrice)
      ) {
        current.minPrice = nextPrice;
      }
      if (!current.leadImage && nextImage) {
        current.leadImage = nextImage;
      }
    }

    return [...byShop.values()].sort((a, b) => {
      if (b.carCount !== a.carCount) {
        return b.carCount - a.carCount;
      }

      const aPrice = a.minPrice ?? Number.MAX_SAFE_INTEGER;
      const bPrice = b.minPrice ?? Number.MAX_SAFE_INTEGER;
      return aPrice - bPrice;
    });
  }, [cars]);
  const locationLabels = React.useMemo(
    () => locations.map((locationItem) => locationItem.label),
    [locations]
  );

  return (
    <Box className="min-h-screen bg-white text-slate-900">
      {siteMode === "marketplace" ? (
        <MarketplaceHeroSection
          heroImages={heroImages}
          featuredShops={marketplaceShops}
          totalCars={cars.length}
          totalShops={marketplaceShops.length}
          totalLocations={locations.length}
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
      ) : (
        <HeroSection
          siteMode={siteMode}
          heroImages={heroImages}
          totalCars={cars.length}
          totalLocations={locations.length}
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
      )}

      {error ? (
        <Box className="mx-auto w-full max-w-6xl px-6">
          <Alert severity="warning" className="rounded-2xl!">
            {error}
          </Alert>
        </Box>
      ) : null}

      {siteMode === "marketplace" ? (
        <MarketplaceHighlightsSection
          shops={marketplaceShops}
          locations={locationLabels}
          carTypes={carTypes}
        />
      ) : null}

      <CarsSection
        cars={recommendedCars}
        siteMode={siteMode}
      />

      {siteMode === "storefront" ? (
        <CarClassSection classes={classes} loading={loading} />
      ) : null}

      <ReviewsSection />

      <BenefitsCTASection siteMode={siteMode} />
    </Box>
  );
}
