"use client";

import * as React from "react";

type Options = {
  minDelay?: number;
};

export default function usePageReady(options?: Options) {
  const minDelay = options?.minDelay ?? 2000;
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const start = Date.now();

    const timer = setTimeout(() => {
      const elapsed = Date.now() - start;
      const delay = Math.max(minDelay - elapsed, 0);

      const readyTimer = setTimeout(() => {
        setReady(true);
      }, delay);

      return () => clearTimeout(readyTimer);
    }, 0);

    return () => clearTimeout(timer);
  }, [minDelay]);

  return ready;
}
