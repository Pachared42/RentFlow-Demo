// src/constants/features.tsx
import React from "react";
import type { ReactNode } from "react";

import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";

export const HERO_BADGES = [
  "รถใหม่",
  "โปรแรง",
  "บริการดี",
  "รับรถเร็ว",
  "ปลอดภัย",
] as const;
export type HeroBadge = (typeof HERO_BADGES)[number];

export type FeatureItem = {
  icon: ReactNode;
  title: string;
  desc: string;
};

export type HowItWorksItem = {
  step: string;
  title: string;
  desc: string;
};

export type TrustPoint = {
  title: string;
  desc: string;
};

export const FEATURES: FeatureItem[] = [
  {
    icon: <DirectionsCarRoundedIcon fontSize="small" />,
    title: "รถหลากหลาย รุ่นยอดนิยม",
    desc: "มีรถหลายประเภทให้เลือก เช่น Eco / Sedan / SUV พร้อมข้อมูลสเปคชัดเจนก่อนตัดสินใจ",
  },
  {
    icon: <PaymentsRoundedIcon fontSize="small" />,
    title: "ราคาชัดเจน โปร่งใส",
    desc: "แสดงราคาเริ่มต้นและยอดรวมตามวันรับ-คืนรถ ลดความสับสน ไม่มีบวกเพิ่มแบบไม่แจ้ง",
  },
  {
    icon: <ScheduleRoundedIcon fontSize="small" />,
    title: "จองง่ายในไม่กี่ขั้นตอน",
    desc: "เลือกวัน-เวลา → เลือกรถ → ยืนยันการจอง → ชำระเงิน ใช้งานได้ลื่นไหลทั้งมือถือและเดสก์ท็อป",
  },
  {
    icon: <VerifiedUserRoundedIcon fontSize="small" />,
    title: "มาตรฐานความปลอดภัย",
    desc: "รถได้รับการตรวจเช็คก่อนส่งมอบ และมีแนวทางการใช้งาน/เงื่อนไขที่อ่านง่าย",
  },
  {
    icon: <SupportAgentRoundedIcon fontSize="small" />,
    title: "ซัพพอร์ตไว",
    desc: "มีช่องทางช่วยเหลือ และคำแนะนำการแก้ปัญหาพื้นฐาน พร้อมรหัสการจองเพื่อให้ตรวจสอบได้เร็ว",
  },
  {
    icon: <LocalOfferRoundedIcon fontSize="small" />,
    title: "โปรโมชัน/แบดจ์บอกรถเด่น",
    desc: "มีป้ายกำกับ เช่น Popular / New ช่วยให้เลือกคันที่เหมาะกับคุณได้เร็วขึ้น",
  },
];

export const HOW_IT_WORKS: HowItWorksItem[] = [
  {
    step: "1",
    title: "ค้นหาและกรองรถ",
    desc: "ใช้ช่องค้นหา + เลือกประเภทรถ + เรียงตามราคา/คะแนน เพื่อเจอรถที่ใช่ไวขึ้น",
  },
  {
    step: "2",
    title: "ดูรายละเอียดรถ",
    desc: "ดูรูป สเปค (ที่นั่ง/เกียร์/เชื้อเพลิง) และราคาเริ่มต้น เพื่อเปรียบเทียบก่อนจอง",
  },
  {
    step: "3",
    title: "จองรถ",
    desc: "เลือกวันรับ-คืนรถ กรอกข้อมูลผู้จอง และตรวจสอบยอดรวมอีกครั้งก่อนยืนยัน",
  },
  {
    step: "4",
    title: "ชำระเงินและติดตามสถานะ",
    desc: "เลือกวิธีชำระเงินและติดตามสถานะในหน้า “การจองของฉัน”",
  },
];

export const TRUST_POINTS: TrustPoint[] = [
  {
    title: "ข้อมูลชัด",
    desc: "ระบุวันรับ-คืนรถ และยอดรวมก่อนชำระเงินทุกครั้ง",
  },
  {
    title: "ตรวจเช็คก่อนส่งมอบ",
    desc: "รถสะอาด พร้อมใช้งาน ลดปัญหาระหว่างเดินทาง",
  },
  {
    title: "มีช่องทางช่วยเหลือ",
    desc: "ติดต่อทีมงานพร้อมรหัสการจอง เพื่อให้ตรวจสอบได้ไว",
  },
  {
    title: "เหมาะกับทุกอุปกรณ์",
    desc: "ออกแบบ responsive ใช้งานง่ายทั้งมือถือ/แท็บเล็ต/คอม",
  },
];
