"use client";

import dynamic from "next/dynamic";

const ContactPage = dynamic(
  () => import("@/src/components/pages/ContactPage"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <ContactPage />;
}
