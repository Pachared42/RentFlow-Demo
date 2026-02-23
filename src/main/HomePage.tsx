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
  const [grade, setGrade] = React.useState<1 | 2 | 3 | 4 | "All">("All");
  const [pickupDate, setPickupDate] = React.useState("");
  const [returnDate, setReturnDate] = React.useState("");
  const [q, setQ] = React.useState("");

  const filtered = React.useMemo(() => {
    return CARS.filter((c) => {
      const matchType = type === "All" ? true : c.type === type;
      const matchQ = q.trim()
        ? c.name.toLowerCase().includes(q.trim().toLowerCase())
        : true;
      const matchGrade = grade === "All" ? true : c.grade === grade;

      return matchType && matchQ && matchGrade;
    });
  }, [type, q, grade]);

  const [heroIndex, setHeroIndex] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <Box className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
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
        onSearch={() =>
          console.log({ location, pickupDate, returnDate, type, q })
        }
      />

      {/* Cars */}
      <CarsSection cars={filtered} formatTHB={formatTHB} />

      {/* CarClasses */}
      <CarClassSection />

      {/* Reviews */}
      <ReviewsSection />

      {/* Benefits + CTA */}
      <BenefitsCTASection />
    </Box>
  );
}
