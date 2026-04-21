"use client";

import * as React from "react";

type Options = {
  minDelay?: number;
};

export default function usePageReady(options?: Options) {
  const minDelay = options?.minDelay ?? 2000;
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, minDelay);

    return () => clearTimeout(timer);
  }, [minDelay]);

  return ready;
}
