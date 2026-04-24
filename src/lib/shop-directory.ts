import type { Car, CarType } from "@/src/services/cars/cars.types";

export type ShopSummary = {
  key: string;
  name: string;
  domainSlug?: string;
  publicDomain?: string;
  logoUrl?: string;
  carCount: number;
  startingPrice: number;
  heroImage?: string;
  carTypes: CarType[];
  firstCarId?: string;
};

export function buildShopSummaries(cars: Car[]) {
  const shops = new Map<
    string,
    Omit<ShopSummary, "carTypes"> & { carTypes: Set<CarType> }
  >();

  cars.forEach((car) => {
    const key =
      car.domainSlug ||
      car.tenantId ||
      car.shopName?.trim().toLowerCase() ||
      "rentflow";
    const current = shops.get(key);

    if (!current) {
      shops.set(key, {
        key,
        name: car.shopName || "RentFlow",
        domainSlug: car.domainSlug,
        publicDomain: car.publicDomain,
        logoUrl: car.logoUrl,
        carCount: 1,
        startingPrice: car.pricePerDay,
        heroImage: car.logoUrl || car.image || car.imageUrl || car.images?.[0],
        carTypes: new Set([car.type]),
        firstCarId: car.id,
      });
      return;
    }

    current.carCount += 1;
    current.startingPrice = Math.min(current.startingPrice, car.pricePerDay);
    current.logoUrl ||= car.logoUrl;
    current.heroImage ||= car.logoUrl || car.image || car.imageUrl || car.images?.[0];
    current.carTypes.add(car.type);
  });

  return Array.from(shops.values())
    .map((shop) => ({
      ...shop,
      carTypes: Array.from(shop.carTypes),
    }))
    .sort((a, b) => b.carCount - a.carCount || a.name.localeCompare(b.name));
}
