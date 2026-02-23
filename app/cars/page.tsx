"use client";

import dynamic from "next/dynamic";

const CarsPage = dynamic(() => import("@/src/components/pages/CarsPage"), {
  ssr: false,
});

export default function Page() {
  return <CarsPage />;
}
