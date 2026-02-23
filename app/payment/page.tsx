"use client";

import dynamic from "next/dynamic";

const PaymentPage = dynamic(
  () => import("@/src/components/pages/PaymentPage"),
  { ssr: false }
);

export default function Page() {
  return <PaymentPage />;
}
