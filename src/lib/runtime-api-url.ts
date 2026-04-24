function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function isLocalApiHost(hostname: string) {
  const normalized = hostname.trim().toLowerCase().replace(/\.$/, "");
  return (
    normalized === "localhost" ||
    normalized === "127.0.0.1" ||
    normalized === "::1"
  );
}

export function getRentFlowApiBaseUrl() {
  const fallback = trimTrailingSlash(
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
  );

  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const resolved = new URL(fallback);
    const currentHostname = window.location.hostname
      .trim()
      .toLowerCase()
      .replace(/\.$/, "");

    if (
      isLocalApiHost(resolved.hostname) &&
      currentHostname.endsWith(".localhost")
    ) {
      resolved.hostname = currentHostname;
      return trimTrailingSlash(resolved.toString());
    }
  } catch {
    return fallback;
  }

  return fallback;
}

export function resolveRentFlowAssetUrl(value?: string | null) {
  const rawValue = value?.trim() || "";
  if (
    !rawValue ||
    rawValue.startsWith("data:") ||
    rawValue.startsWith("blob:") ||
    rawValue.startsWith("//")
  ) {
    return rawValue;
  }

  if (/^https?:\/\//i.test(rawValue)) {
    return rawValue;
  }

  const apiBaseUrl = getRentFlowApiBaseUrl();
  if (!apiBaseUrl) {
    return rawValue;
  }

  return new URL(rawValue.startsWith("/") ? rawValue : `/${rawValue}`, apiBaseUrl).toString();
}
