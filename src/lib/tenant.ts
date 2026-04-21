const DEFAULT_ROOT_DOMAIN = "rentflow.com";

function normalizeHost(value?: string) {
  const rawValue = value?.trim().toLowerCase() || "";
  if (!rawValue) {
    return "";
  }

  try {
    const parsedUrl = rawValue.includes("://")
      ? new URL(rawValue)
      : new URL(`https://${rawValue}`);
    return parsedUrl.host.replace(/:\d+$/, "").replace(/\.$/, "");
  } catch {
    return rawValue.split("/")[0].replace(/:\d+$/, "").replace(/\.$/, "");
  }
}

export function getRentFlowTenantHost() {
  if (typeof window !== "undefined") {
    return normalizeHost(window.location.host);
  }

  return normalizeHost(process.env.NEXT_PUBLIC_RENTFLOW_TENANT_HOST);
}

export function getRentFlowTenantSlug(host = getRentFlowTenantHost()) {
  const normalizedHost = normalizeHost(host);
  const rootDomain = normalizeHost(
    process.env.NEXT_PUBLIC_RENTFLOW_ROOT_DOMAIN || DEFAULT_ROOT_DOMAIN
  );

  if (!normalizedHost) {
    return process.env.NEXT_PUBLIC_RENTFLOW_TENANT || "";
  }

  if (
    normalizedHost === "localhost" ||
    normalizedHost === "127.0.0.1" ||
    normalizedHost === "::1"
  ) {
    return process.env.NEXT_PUBLIC_RENTFLOW_TENANT || "";
  }

  if (normalizedHost.endsWith(".localhost")) {
    const labels = normalizedHost.replace(".localhost", "").split(".");
    return labels[labels.length - 1] || "";
  }

  if (rootDomain && normalizedHost.endsWith(`.${rootDomain}`)) {
    const labels = normalizedHost.replace(`.${rootDomain}`, "").split(".");
    return labels[labels.length - 1] || "";
  }

  return process.env.NEXT_PUBLIC_RENTFLOW_TENANT || "";
}

export function getRentFlowTenantHeaders() {
  const host = getRentFlowTenantHost();
  const slug = getRentFlowTenantSlug(host);

  return {
    ...(host ? { "X-RentFlow-Host": host } : {}),
    ...(slug ? { "X-RentFlow-Tenant": slug } : {}),
  };
}
