"use client";

import dynamic from "next/dynamic";

const CarsPage = dynamic(() => import("@/components/pages/CarsPage"), {
    ssr: false,
});

export default function Page() {
    return <CarsPage />;
}