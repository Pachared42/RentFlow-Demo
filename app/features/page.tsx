import { Suspense } from "react";
import FeaturesPage from "@/src/components/pages/FeaturesPage";
import FeaturesPageSkeleton from "@/src/components/feature/FeaturesPageSkeleton";

export default function Page() {
  return (
    <Suspense fallback={<FeaturesPageSkeleton />}>
      <FeaturesPage />
    </Suspense>
  );
}