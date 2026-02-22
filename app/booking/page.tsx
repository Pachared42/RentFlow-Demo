"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const BookingPage = dynamic(() => import("@/components/pages/BookingPage"), {
    ssr: false,
});

export default function Page() {
    return (
        <Suspense fallback={null}>
            <BookingPage />
        </Suspense>
    );
}