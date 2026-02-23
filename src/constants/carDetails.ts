import { CARS, type Car } from "./cars";

export type Policy = {
  deposit: number; // มัดจำ
  mileageLimitPerDay?: number; // จำกัดระยะ/วัน (ถ้าไม่จำกัดไม่ต้องใส่)
  fuelPolicy: "Full-to-Full" | "Same-to-Same";
  lateFeePerHour: number; // ค่าปรับคืนช้า/ชั่วโมง
  minAge: number; // อายุขั้นต่ำผู้เช่า
  licenseRequiredYears: number; // ต้องมีใบขับขี่มาแล้วกี่ปี
  idDocs: string[]; // เอกสารที่ต้องใช้
  insurance: string[]; // ประกัน/ความคุ้มครอง
};

export type CarSpecs = {
  year: number;
  engine?: string; // ถ้ามี (รถ EV อาจไม่ใส่)
  power?: string; // แรงม้า/กำลัง
  torque?: string;
  drive: "RWD" | "FWD" | "AWD";
  consumption?: string; // L/100km หรือ km/L หรือ kWh/100km
  trunkLiters?: number;
  colorOptions: string[];
};

export type CarDetail = Car & {
  description: string;
  highlights: string[]; // จุดเด่นสั้น ๆ
  features: string[]; // ฟีเจอร์/ออปชัน
  images: string[]; // หลายรูป
  pickupLocations: string[]; // จุดรับรถ
  policy: Policy;
  specs: CarSpecs;
  ratingAvg: number; // 0-5
  reviewsCount: number;
};

function base(id: string) {
  const car = CARS.find((c) => c.id === id);
  if (!car) throw new Error(`Car not found: ${id}`);
  return car;
}

export const CAR_DETAILS: Record<string, CarDetail> = {
  c1: {
    ...base("c1"),
    description:
      "ซีดานขับสนุก นุ่มเงียบ เหมาะทั้งเดินทางไกลและใช้งานในเมือง มาพร้อมโหมดการขับขี่และระบบช่วยจอดที่ใช้งานง่าย",
    highlights: ["รับรถไว", "ขับนุ่ม", "เหมาะเที่ยว/ทำงาน"],
    features: [
      "Apple CarPlay/Android Auto",
      "กล้องถอยหลัง",
      "Cruise Control",
      "ระบบช่วยจอด",
      "Bluetooth/USB",
      "ถุงลมนิรภัย",
    ],
    images: ["/cosySec.webp", "/cosySec1.webp", "/cosySec2.webp"],
    pickupLocations: [
      "กรุงเทพฯ (ดอนเมือง)",
      "กรุงเทพฯ (สุวรรณภูมิ)",
      "สุพรรณบุรี (ตัวเมือง)",
    ],
    policy: {
      deposit: 5000,
      mileageLimitPerDay: 300,
      fuelPolicy: "Full-to-Full",
      lateFeePerHour: 200,
      minAge: 20,
      licenseRequiredYears: 1,
      idDocs: ["บัตรประชาชน/พาสปอร์ต", "ใบขับขี่"],
      insurance: [
        "ประกันชั้น 1",
        "คุ้มครองอุบัติเหตุ",
        "บริการช่วยเหลือฉุกเฉิน 24/7",
      ],
    },
    specs: {
      year: 2022,
      engine: "2.0L Turbo Diesel",
      power: "190 hp",
      torque: "400 Nm",
      drive: "RWD",
      consumption: "ประมาณ 16-18 km/L",
      trunkLiters: 480,
      colorOptions: ["Black", "White", "Blue"],
    },
    ratingAvg: 4.7,
    reviewsCount: 128,
  },

  c2: {
    ...base("c2"),
    description:
      "รุ่นปลั๊กอินไฮบริด ประหยัดน้ำมัน ใช้งานในเมืองได้ดี มีโหมด EV สำหรับระยะสั้น ๆ ขับสบายและเงียบ",
    highlights: ["ประหยัด", "โหมด EV", "ยอดนิยม"],
    features: [
      "ระบบ Hybrid/EV Mode",
      "Apple CarPlay",
      "กล้องถอย",
      "Lane Assist",
      "Adaptive Cruise",
      "Keyless Start",
    ],
    images: ["/cosySec1.webp", "/cosySec.webp", "/cosySec3.webp"],
    pickupLocations: ["กรุงเทพฯ (ดอนเมือง)", "กรุงเทพฯ (พระราม 9)"],
    policy: {
      deposit: 6000,
      mileageLimitPerDay: 250,
      fuelPolicy: "Same-to-Same",
      lateFeePerHour: 250,
      minAge: 20,
      licenseRequiredYears: 1,
      idDocs: ["บัตรประชาชน/พาสปอร์ต", "ใบขับขี่"],
      insurance: ["ประกันชั้น 1", "คุ้มครองกระจก/ยาง", "ช่วยเหลือฉุกเฉิน 24/7"],
    },
    specs: {
      year: 2023,
      engine: "2.0L Plug-in Hybrid",
      power: "รวมประมาณ 292 hp",
      torque: "420 Nm",
      drive: "RWD",
      consumption: "Hybrid ประหยัดมาก (ขึ้นกับการชาร์จ)",
      trunkLiters: 375,
      colorOptions: ["White", "Silver", "Gray"],
    },
    ratingAvg: 4.8,
    reviewsCount: 214,
  },

  c3: {
    ...base("c3"),
    description:
      "สายแรงสำหรับคนชอบสมรรถนะ ช่วงล่างแน่น การตอบสนองไว เหมาะทริปพิเศษและคนอยากได้รถที่มีคาแรกเตอร์",
    highlights: ["แรงจัด", "หล่อ", "ฟีลสปอร์ต"],
    features: [
      "Sport Mode",
      "เบาะสปอร์ต",
      "Apple CarPlay",
      "กล้อง 360",
      "Brembo (สไตล์)",
      "ระบบเตือนมุมอับ",
    ],
    images: ["/cosySec2.webp", "/cosySec.webp", "/cosySec1.webp"],
    pickupLocations: ["กรุงเทพฯ (พระราม 9)", "กรุงเทพฯ (สุขุมวิท)"],
    policy: {
      deposit: 12000,
      mileageLimitPerDay: 200,
      fuelPolicy: "Full-to-Full",
      lateFeePerHour: 400,
      minAge: 23,
      licenseRequiredYears: 2,
      idDocs: ["บัตรประชาชน/พาสปอร์ต", "ใบขับขี่"],
      insurance: [
        "ประกันชั้น 1",
        "ความรับผิดต่อบุคคลภายนอก",
        "ช่วยเหลือฉุกเฉิน 24/7",
      ],
    },
    specs: {
      year: 2021,
      engine: "3.0L Twin Turbo",
      power: "503 hp",
      torque: "650 Nm",
      drive: "AWD",
      consumption: "ประมาณ 7-9 km/L",
      trunkLiters: 550,
      colorOptions: ["Black", "Blue", "Red"],
    },
    ratingAvg: 4.6,
    reviewsCount: 76,
  },

  c4: {
    ...base("c4"),
    description:
      "ไฟฟ้าล้วน ขับเงียบ นุ่มนวล เทคโนโลยีล้ำ เหมาะกับคนอยากลอง EV ใช้ในเมืองและทางไกลแบบสบาย ๆ",
    highlights: ["EV เงียบ", "เทคโนโลยี", "รถใหม่"],
    features: [
      "ชาร์จเร็ว (ตามสถานี)",
      "จอใหญ่",
      "กล้องรอบคัน",
      "Lane Assist",
      "Adaptive Cruise",
      "Keyless",
    ],
    images: ["/cosySec3.webp", "/cosySec4.webp", "/cosySec1.webp"],
    pickupLocations: ["กรุงเทพฯ (สุวรรณภูมิ)", "กรุงเทพฯ (บางนา)"],
    policy: {
      deposit: 8000,
      mileageLimitPerDay: 300,
      fuelPolicy: "Same-to-Same",
      lateFeePerHour: 300,
      minAge: 20,
      licenseRequiredYears: 1,
      idDocs: ["บัตรประชาชน/พาสปอร์ต", "ใบขับขี่"],
      insurance: [
        "ประกันชั้น 1",
        "คุ้มครองแบตเตอรี่ (เงื่อนไข)",
        "ช่วยเหลือฉุกเฉิน 24/7",
      ],
    },
    specs: {
      year: 2024,
      power: "340 hp",
      torque: "430 Nm",
      drive: "RWD",
      consumption: "ประมาณ 16-20 kWh/100km",
      trunkLiters: 490,
      colorOptions: ["White", "Gray", "Black"],
    },
    ratingAvg: 4.7,
    reviewsCount: 92,
  },

  c5: {
    ...base("c5"),
    description:
      "รุ่นแรงของ i5 ขับสบายแต่พละกำลังจัด เหมาะทริปครอบครัว/เพื่อน พร้อมพื้นที่ใช้สอยเยอะและออปชันแน่น",
    highlights: ["แรง", "หรู", "พื้นที่เยอะ"],
    features: [
      "กล้อง 360",
      "จอผู้โดยสาร",
      "ระบบช่วยจอด",
      "Adaptive Cruise",
      "ไฟ Ambient",
      "เครื่องเสียงพรีเมียม",
    ],
    images: ["/cosySec4.webp", "/cosySec3.webp", "/cosySec5.webp"],
    pickupLocations: ["กรุงเทพฯ (พระราม 9)", "สุพรรณบุรี (ตัวเมือง)"],
    policy: {
      deposit: 9000,
      mileageLimitPerDay: 250,
      fuelPolicy: "Same-to-Same",
      lateFeePerHour: 350,
      minAge: 21,
      licenseRequiredYears: 1,
      idDocs: ["บัตรประชาชน/พาสปอร์ต", "ใบขับขี่"],
      insurance: ["ประกันชั้น 1", "ช่วยเหลือฉุกเฉิน 24/7"],
    },
    specs: {
      year: 2024,
      power: "601 hp",
      torque: "820 Nm",
      drive: "AWD",
      consumption: "ประมาณ 18-22 kWh/100km",
      trunkLiters: 520,
      colorOptions: ["Black", "White", "Gray"],
    },
    ratingAvg: 4.8,
    reviewsCount: 64,
  },

  c6: {
    ...base("c6"),
    description:
      "แฟลกชิประดับผู้บริหาร นั่งสบายสุด ๆ เงียบ หรู ฟีเจอร์เต็ม เหมาะรับแขก/งานสำคัญ/ทริปพรีเมียม",
    highlights: ["หรูมาก", "นั่งสบาย", "พรีเมียม"],
    features: [
      "เบาะหลังปรับไฟฟ้า",
      "ม่านบังแดด",
      "กล้อง 360",
      "ระบบช่วยจอด",
      "เครื่องเสียงพรีเมียม",
      "ไฟ Ambient",
    ],
    images: ["/cosySec5.webp", "/cosySec4.webp", "/cosySec3.webp"],
    pickupLocations: ["กรุงเทพฯ (สุขุมวิท)", "กรุงเทพฯ (สาทร)"],
    policy: {
      deposit: 15000,
      mileageLimitPerDay: 200,
      fuelPolicy: "Same-to-Same",
      lateFeePerHour: 500,
      minAge: 25,
      licenseRequiredYears: 3,
      idDocs: ["บัตรประชาชน/พาสปอร์ต", "ใบขับขี่"],
      insurance: ["ประกันชั้น 1", "คุ้มครองผู้โดยสาร", "ช่วยเหลือฉุกเฉิน 24/7"],
    },
    specs: {
      year: 2024,
      power: "544 hp",
      torque: "745 Nm",
      drive: "AWD",
      consumption: "ประมาณ 19-23 kWh/100km",
      trunkLiters: 500,
      colorOptions: ["Black", "White", "Blue"],
    },
    ratingAvg: 4.9,
    reviewsCount: 38,
  },
};

export function getCarDetail(id: string) {
  const key = decodeURIComponent(String(id ?? "")).trim();
  return CAR_DETAILS[key];
}

// (optional debug)
export const __CAR_DETAIL_KEYS__ = Object.keys(CAR_DETAILS);
