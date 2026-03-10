"use client";

import * as React from "react";
import { Box } from "@mui/material";

import { CARS, CAR_TYPES, type Car } from "@/src/constants/cars";
import { type LocationValue } from "@/src/constants/locations";

import HeroSection from "@/src/components/home/HeroSection";
import CarsSection from "@/src/components/home/CarsSection";
import CarClassSection from "@/src/components/home/CarClassSection";
import BenefitsCTASection from "@/src/components/home/BenefitsCTASection";
import ReviewsSection from "@/src/components/home/ReviewsSection";

import { formatTHB } from "@/src/constants/money";

const HERO_IMAGES = [
  "/cosySec.webp",
  "/cosySec1.webp",
  "/cosySec2.webp",
  "/cosySec3.webp",
  "/cosySec4.webp",
  "/cosySec5.webp",
] as const;

export default function HomePage() {
  const [location, setLocation] = React.useState<LocationValue>("bangkok");
  const [type, setType] = React.useState<Car["type"] | "All">("All");
  const [pickupDate, setPickupDate] = React.useState("");
  const [returnDate, setReturnDate] = React.useState("");
  const [q, setQ] = React.useState("");

  const recommendedCars = React.useMemo(() => {
    return CARS.slice(0, 6);
  }, []);

  return (
    <Box className="min-h-screen bg-white text-slate-900">
      <HeroSection
        heroImages={HERO_IMAGES}
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
        carTypes={CAR_TYPES}
      />

      <CarsSection cars={recommendedCars} formatTHB={formatTHB} />

      <CarClassSection />

      <ReviewsSection />

      <BenefitsCTASection />
    </Box>
  );
}
