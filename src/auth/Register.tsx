"use client";

import * as React from "react";
import Link from "next/link";
import AuthCard from "@/src/auth/AuthCard";

export default function RegisterPage() {
  return (
    <AuthCard
      title="สมัครสมาชิก"
      subtitle="ดำเนินการต่อด้วยบัญชี Google ของคุณ"
      successMessage="สมัครสมาชิกสำเร็จ กำลังพาไปหน้าหลัก..."
      authErrorMessage="สมัครหรือเข้าสู่ระบบด้วย Google ไม่สำเร็จ"
      submitErrorMessage="สมัครหรือเข้าสู่ระบบด้วย Google ไม่สำเร็จ"
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