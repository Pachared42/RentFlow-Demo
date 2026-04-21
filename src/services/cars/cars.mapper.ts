import type {
  Car,
  CarImageUploadItem,
  CarsApiResponse,
  RawCarImageUploadItem,
} from "./cars.types";

function resolveApiAssetUrl(value?: string) {
  const rawValue = value?.trim() || "";
  if (!rawValue || rawValue.startsWith("data:") || rawValue.startsWith("blob:")) {
    return rawValue;
  }

  if (/^https?:\/\//i.test(rawValue)) {
    return rawValue;
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiBaseUrl && rawValue.startsWith("/")) {
    return new URL(rawValue, apiBaseUrl).toString();
  }

  return rawValue;
}

export function normalizeCar(
  raw: Partial<Car> & { id: string; name: string }
): Car {
  const imageUrl = resolveApiAssetUrl(raw.imageUrl || raw.image || "");
  const images = raw.images?.map(resolveApiAssetUrl).filter(Boolean);

  return {
    id: raw.id,
    name: raw.name,
    brand: raw.brand || "",
    model: raw.model || "",
    year: raw.year || 0,
    type: (raw.type || "Sedan") as Car["type"],
    seats: raw.seats || 0,
    transmission: (raw.transmission || "Auto") as Car["transmission"],
    fuel: (raw.fuel || "Gasoline") as Car["fuel"],
    pricePerDay: raw.pricePerDay || 0,
    image: imageUrl || undefined,
    imageUrl,
    grade: raw.grade,
    images: images?.length ? images : imageUrl ? [imageUrl] : undefined,
    description: raw.description,
    locationId: raw.locationId,
    isAvailable: raw.isAvailable ?? true,
    createdAt: raw.createdAt || "",
    updatedAt: raw.updatedAt || "",
    tenantId: raw.tenantId,
    shopName: raw.shopName,
    domainSlug: raw.domainSlug,
    publicDomain: raw.publicDomain,
    lineOfficialAccount: raw.lineOfficialAccount,
  };
}

export function normalizeCarsResponse(raw: CarsApiResponse) {
  return {
    items: (raw.items ?? []).map(normalizeCar),
    total: raw.total ?? 0,
  };
}

export function normalizeUploadedCarImage(
  raw: RawCarImageUploadItem
): CarImageUploadItem {
  return {
    ...raw,
    imageUrl: resolveApiAssetUrl(raw.imageUrl),
  };
}
