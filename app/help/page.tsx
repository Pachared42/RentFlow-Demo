"use client";

import dynamic from "next/dynamic";

const HelpPage = dynamic(() => import("@/components/pages/HelpPage"), {
    ssr: false,
});

export default function Page() {
    return <HelpPage />;
}