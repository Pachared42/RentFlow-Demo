export type AddonKey = "carSeat" | "mountainDrive" | "returnOtherBranch";

export type Addon = {
  key: AddonKey;
  title: string;
  desc: string;
  pricing: "perDay" | "perTrip";
  price: number;
};

export const ADDONS: Addon[] = [
  {
    key: "carSeat",
    title: "เพิ่มคาร์ซีท",
    desc: "สำหรับเด็กเล็ก/เด็กโต (ขึ้นกับสต็อก)",
    pricing: "perDay",
    price: 150,
  },
  {
    key: "mountainDrive",
    title: "อนุญาตขับขึ้นเขา/ขึ้นดอย",
    desc: "คุ้มครองเงื่อนไขเส้นทางพิเศษ",
    pricing: "perTrip",
    price: 300,
  },
  {
    key: "returnOtherBranch",
    title: "คืนรถต่างสาขา",
    desc: "เลือกสาขาคืนรถคนละสาขารับรถ",
    pricing: "perTrip",
    price: 500,
  },
];

export const DEFAULT_ADDONS: Record<AddonKey, boolean> = {
  carSeat: false,
  mountainDrive: false,
  returnOtherBranch: false,
};