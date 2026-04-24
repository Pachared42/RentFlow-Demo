"use client";

import * as React from "react";

import {
  getRentFlowSiteMode,
  type RentFlowSiteMode,
} from "@/src/lib/tenant";

export function useRentFlowSiteMode() {
  return useRentFlowSiteModeStatus().siteMode;
}

export function useRentFlowSiteModeStatus() {
  const [state, setState] = React.useState<{
    siteMode: RentFlowSiteMode;
    ready: boolean;
  }>({
    siteMode: "marketplace",
    ready: false,
  });

  React.useEffect(() => {
    setState({
      siteMode: getRentFlowSiteMode(),
      ready: true,
    });
  }, []);

  return state;
}
