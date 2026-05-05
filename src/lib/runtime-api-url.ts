function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export function getRentFlowApiBaseUrl() {
  return trimTrailingSlash(
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
  );
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
