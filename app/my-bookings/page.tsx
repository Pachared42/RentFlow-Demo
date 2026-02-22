"use client";

import dynamic from "next/dynamic";

const MyBookingsPage = dynamic(
    () => import("@/components/pages/MyBookingsPage"),
    { ssr: false }
);

export default function Page() {
    return <MyBookingsPage />;
}