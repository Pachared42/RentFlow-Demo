import BookingPage from "@/components/pages/BookingPage";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <Suspense fallback={null}>
            <BookingPage />
        </Suspense>
    );
}