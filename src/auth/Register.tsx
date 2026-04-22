"use client";

import * as React from "react";
import Link from "next/link";
import AuthCard from "@/src/auth/AuthCard";

export default function RegisterPage() {
  return (
    <AuthCard
      mode="register"
      title="สมัครสมาชิก"
      subtitle="สร้างบัญชีด้วยชื่อผู้ใช้ รหัสผ่าน ชื่อจริง และนามสกุล"
      successMessage="สมัครสมาชิกสำเร็จ กำลังพาไปหน้าหลัก..."
      submitErrorMessage="สมัครสมาชิกไม่สำเร็จ"
      agreementText={
        <>
          เมื่อดำเนินการต่อ ถือว่าคุณยอมรับ{" "}
          <Link
            href="/terms"
            className="font-semibold text-slate-900 underline-offset-2 hover:underline"
          >
            เงื่อนไขการใช้งาน
          </Link>{" "}
          และ{" "}
          <Link
            href="/privacy"
            className="font-semibold text-slate-900 underline-offset-2 hover:underline"
          >
            นโยบายความเป็นส่วนตัว
          </Link>
        </>
      }
    />
  );
}
