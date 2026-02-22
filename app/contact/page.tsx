"use client";

import dynamic from "next/dynamic";

const ContactPage = dynamic(() => import("@/components/pages/ContactPage"), {
    ssr: false,
});

export default function Page() {
    return <ContactPage />;
}