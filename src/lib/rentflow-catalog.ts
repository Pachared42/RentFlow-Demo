import type { Branch } from "@/src/services/branches/branches.types";
import type { Grade, Car } from "@/src/services/cars/cars.types";

export type LocationOption = {
  label: string;
  value: string;
};

export type CatalogCarClass = {
  slug: string;
  title: string;
  desc: string;
  tag: string;
  grade: Grade;
  image: string;
  count: number;
};

const PRESENTATION_ORDER = ["Economy", "Sedan", "SUV", "Van"] as const;
const CLASS_GRADES: Grade[] = [1, 2, 3, 4];
const LOCATION_LABEL_MAP: Record<string, string> = {
  bangkok: "กรุงเทพฯ",
  pattaya: "พัทยา",
  phuket: "ภูเก็ต",
  chiangmai: "เชียงใหม่",
  "chiang-mai": "เชียงใหม่",
  khonkaen: "ขอนแก่น",
  "khon-kaen": "ขอนแก่น",
  korat: "นครราชสีมา",
  nakhonratchasima: "นครราชสีมา",
  "nakhon-ratchasima": "นครราชสีมา",
  udonthani: "อุดรธานี",
  "udon-thani": "อุดรธานี",
  suratthani: "สุราษฎร์ธานี",
  "surat-thani": "สุราษฎร์ธานี",
  huahin: "หัวหิน",
  "hua-hin": "หัวหิน",
};

const CLASS_META: Record<
  Grade,
  Omit<CatalogCarClass, "count" | "image">
> = {
  1: {
    slug: "premium",
    title: "คลาส Premium",
    desc: "กลุ่มรถพรีเมียมสำหรับการเดินทางที่ต้องการความสบาย",
    tag: "Premium",
    grade: 1,
  },
  2: {
    slug: "comfort",
    title: "คลาส Comfort",
    desc: "กลุ่มรถสมดุลระหว่างความสบายและราคา",
    tag: "Comfort",
    grade: 2,
  },
  3: {
    slug: "value",
    title: "คลาส Value",
    desc: "กลุ่มรถคุ้มค่าที่พร้อมใช้งานทุกวัน",
    tag: "Value",
    grade: 3,
  },
  4: {
    slug: "budget",
    title: "คลาส Budget",
    desc: "กลุ่มรถเริ่มต้นสำหรับการเดินทางประจำวัน",
    tag: "Budget",
    grade: 4,
  },
};

export function buildCarTypes(cars: Car[]): Car["type"][] {
  const seen = new Set<Car["type"]>();

  for (const car of cars) {
    if (car.type) {
      seen.add(car.type);
    }
  }

  return [...seen].sort((a, b) => {
    const aIndex = PRESENTATION_ORDER.indexOf(a as (typeof PRESENTATION_ORDER)[number]);
    const bIndex = PRESENTATION_ORDER.indexOf(b as (typeof PRESENTATION_ORDER)[number]);

    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
}

export function formatLocationLabel(value: string) {
  const normalized = value.trim().toLowerCase();

  if (LOCATION_LABEL_MAP[normalized]) {
    return LOCATION_LABEL_MAP[normalized];
  }

  return value
    .split("-")
    .filter(Boolean)
    .map((part) => LOCATION_LABEL_MAP[part.toLowerCase()] || (part.charAt(0).toUpperCase() + part.slice(1)))
    .join(" ");
}

export function buildLocationOptions(branches: Branch[]): LocationOption[] {
  const byValue = new Map<string, LocationOption>();
  const byBranchId = new Map<string, LocationOption>();

  branches
    .filter((branch) => branch.name || branch.locationId || branch.id)
    .forEach((branch) => {
      const branchId = branch.id?.trim();
      const locationId = branch.locationId?.trim();
      const branchName = branch.name?.trim() || "";
      const rawName = branch.rawName?.trim() || "";
      const looksGeneratedName =
        /^brn[_-]/i.test(branchName) || /^brn[_-]/i.test(rawName);
      const looksGeneratedLocation = /^brn[_-]/i.test(locationId || "");
      const label =
        branchName && !looksGeneratedName
          ? branchName
          : locationId && !looksGeneratedLocation
            ? formatLocationLabel(locationId)
            : branch.address?.trim()
              ? branch.address.trim()
            : "สาขาหลัก";
      const value = locationId || branchId || branchName || rawName;
      if (!value || byValue.has(value)) return;

      const option = { label, value };
      byValue.set(value, option);
      if (branchId) {
        byBranchId.set(branchId, option);
      }
    });

  for (const option of byBranchId.values()) {
    byValue.set(option.value, option);
  }

  return Array.from(byValue.values()).sort((a, b) =>
    a.label.localeCompare(b.label)
  );
}

export function buildCarClasses(cars: Car[]): CatalogCarClass[] {
  const byGrade = new Map<Grade, Car[]>();

  for (const car of cars) {
    if (!car.grade) continue;

    const list = byGrade.get(car.grade) ?? [];
    list.push(car);
    byGrade.set(car.grade, list);
  }

  return CLASS_GRADES
    .filter((grade) => (byGrade.get(grade) ?? []).length > 0)
    .map((grade) => {
      const items = byGrade.get(grade) ?? [];
      const lead = items[0];

      return {
        ...CLASS_META[grade],
        image: lead?.image || lead?.imageUrl || "/RentFlow.png",
        count: items.length,
      };
    });
}

export function getCarClassBySlug(cars: Car[], slug: string) {
  const classes = buildCarClasses(cars);
  const meta = classes.find((item) => item.slug === slug) ?? null;

  return {
    meta,
    cars: meta ? cars.filter((car) => car.grade === meta.grade) : [],
  };
}
