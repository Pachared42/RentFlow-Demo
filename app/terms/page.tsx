"use client";

import * as React from "react";
import Link from "next/link";
import {
    Box,
    Container,
    Card,
    CardContent,
    Typography,
    Divider,
    Stack,
    Chip,
    Button,
} from "@mui/material";

const sections = [
    { id: "intro", title: "1) ข้อตกลงเบื้องต้น" },
    { id: "account", title: "2) บัญชีผู้ใช้" },
    { id: "booking", title: "3) การจองและการชำระเงิน" },
    { id: "cancel", title: "4) การยกเลิก / คืนเงิน" },
    { id: "use", title: "5) การใช้งานที่เหมาะสม" },
    { id: "liability", title: "6) ข้อจำกัดความรับผิด" },
    { id: "changes", title: "7) การเปลี่ยนแปลงเงื่อนไข" },
    { id: "contact", title: "8) ติดต่อเรา" },
];

export default function TermsPage() {
    const updatedAt = "22 กุมภาพันธ์ 2569";

    return (
        <Box className="min-h-screen bg-slate-50">
            {/* Background soft gradient */}
            <Box
                aria-hidden
                className="pointer-events-none fixed inset-0"
            />

            <Container maxWidth="md" className="relative py-10">
                {/* Header */}
                <Stack spacing={1} className="mb-6">
                    <Stack direction="row" className="items-center justify-between gap-3">
                        <Stack>
                            <Typography className="text-2xl font-extrabold text-slate-900">
                                เงื่อนไขการใช้งาน (Terms of Service)
                            </Typography>
                            <Stack direction="row" className="items-center gap-2">
                                <Chip size="small" label={`อัปเดตล่าสุด: ${updatedAt}`} />
                                <Typography className="text-xs text-slate-500">
                                    เอกสารนี้เป็นตัวอย่างสำหรับเว็บจองรถ สามารถปรับแก้ให้ตรงกับธุรกิจจริงได้
                                </Typography>
                            </Stack>
                        </Stack>

                        <Button
                            component={Link}
                            href="/"
                            variant="outlined"
                            className="rounded-xl!"
                            sx={{
                                borderColor: "rgba(203,213,225,0.9)",
                                color: "rgb(15 23 42)",
                                "&:hover": { borderColor: "rgb(148,163,184)" },
                                textTransform: "none",
                            }}
                        >
                            กลับหน้าแรก
                        </Button>
                    </Stack>
                </Stack>

                <Card
                    elevation={0}
                    className="rounded-2xl! border border-slate-200 bg-white"
                    sx={{ boxShadow: "0 20px 60px rgba(15,23,42,0.10)" }}
                >
                    <CardContent className="p-7">
                        {/* TOC */}
                        <Typography className="text-sm font-bold text-slate-900">
                            สารบัญ
                        </Typography>
                        <Stack className="mt-3 grid gap-2 sm:grid-cols-2">
                            {sections.map((s) => (
                                <a
                                    key={s.id}
                                    href={`#${s.id}`}
                                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                                >
                                    {s.title}
                                </a>
                            ))}
                        </Stack>

                        <Divider className="my-6! border-slate-200!" />

                        {/* Content */}
                        <Stack spacing={3} className="text-slate-700">
                            <section id="intro">
                                <Typography className="text-base font-bold text-slate-900">
                                    1) ข้อตกลงเบื้องต้น
                                </Typography>
                                <Typography className="mt-1 text-sm leading-relaxed">
                                    การใช้งานเว็บไซต์/แอปนี้หมายความว่าคุณยอมรับเงื่อนไขการใช้งานทั้งหมด
                                    หากคุณไม่เห็นด้วย โปรดหยุดใช้งานบริการ
                                </Typography>
                            </section>

                            <section id="account">
                                <Typography className="text-base font-bold text-slate-900">
                                    2) บัญชีผู้ใช้
                                </Typography>
                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                                    <li>คุณต้องให้ข้อมูลที่ถูกต้องและเป็นปัจจุบันในการสมัครสมาชิก</li>
                                    <li>คุณรับผิดชอบต่อความปลอดภัยของบัญชีและรหัสผ่านของคุณ</li>
                                    <li>หากสงสัยว่าบัญชีถูกใช้งานโดยไม่ได้รับอนุญาต โปรดติดต่อเรา</li>
                                </ul>
                            </section>

                            <section id="booking">
                                <Typography className="text-base font-bold text-slate-900">
                                    3) การจองและการชำระเงิน
                                </Typography>
                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                                    <li>รายละเอียดรถ ราคา และช่วงเวลาที่แสดง อาจเปลี่ยนแปลงตามเงื่อนไขผู้ให้บริการ</li>
                                    <li>การยืนยันการจองอาจขึ้นอยู่กับการตรวจสอบความพร้อมของรถ</li>
                                    <li>กรณีมีการชำระเงิน ระบบอาจใช้ผู้ให้บริการชำระเงินภายนอก</li>
                                </ul>
                            </section>

                            <section id="cancel">
                                <Typography className="text-base font-bold text-slate-900">
                                    4) การยกเลิก / คืนเงิน
                                </Typography>
                                <Typography className="mt-1 text-sm leading-relaxed">
                                    เงื่อนไขการยกเลิกและคืนเงินขึ้นกับนโยบายของผู้ให้บริการรถและช่องทางชำระเงิน
                                    โปรดตรวจสอบรายละเอียดก่อนยืนยันการจอง
                                </Typography>
                            </section>

                            <section id="use">
                                <Typography className="text-base font-bold text-slate-900">
                                    5) การใช้งานที่เหมาะสม
                                </Typography>
                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                                    <li>ห้ามใช้บริการในทางที่ผิดกฎหมาย หรือละเมิดสิทธิผู้อื่น</li>
                                    <li>ห้ามพยายามเจาะระบบ รบกวนระบบ หรือดึงข้อมูลโดยไม่ได้รับอนุญาต</li>
                                    <li>เราสามารถระงับ/ยุติการให้บริการ หากตรวจพบการใช้งานที่ผิดเงื่อนไข</li>
                                </ul>
                            </section>

                            <section id="liability">
                                <Typography className="text-base font-bold text-slate-900">
                                    6) ข้อจำกัดความรับผิด
                                </Typography>
                                <Typography className="mt-1 text-sm leading-relaxed">
                                    บริการนี้จัดให้ “ตามสภาพ” เราไม่รับประกันว่าจะไม่มีข้อผิดพลาดหรือหยุดชะงัก
                                    และไม่รับผิดชอบความเสียหายทางอ้อมที่อาจเกิดขึ้นจากการใช้งาน
                                </Typography>
                            </section>

                            <section id="changes">
                                <Typography className="text-base font-bold text-slate-900">
                                    7) การเปลี่ยนแปลงเงื่อนไข
                                </Typography>
                                <Typography className="mt-1 text-sm leading-relaxed">
                                    เราอาจปรับปรุงเงื่อนไขเป็นครั้งคราว โดยจะแสดง “วันที่อัปเดตล่าสุด” ไว้ด้านบน
                                    การใช้งานต่อหลังมีการเปลี่ยนแปลงถือว่าคุณยอมรับเงื่อนไขใหม่
                                </Typography>
                            </section>

                            <section id="contact">
                                <Typography className="text-base font-bold text-slate-900">
                                    8) ติดต่อเรา
                                </Typography>
                                <Typography className="mt-1 text-sm leading-relaxed">
                                    หากมีคำถามเกี่ยวกับเงื่อนไขการใช้งาน โปรดติดต่อผ่านหน้าช่วยเหลือหรืออีเมลของทีมงาน
                                    (ใส่อีเมล/เบอร์/ที่อยู่จริงของคุณตรงนี้)
                                </Typography>
                            </section>

                            <Divider className="my-2! border-slate-200!" />

                            <Typography className="text-xs text-slate-500">
                                หมายเหตุ: เนื้อหานี้เป็นตัวอย่างเชิงทั่วไป ไม่ใช่คำแนะนำทางกฎหมาย
                                หากใช้งานจริงในธุรกิจ แนะนำให้ให้ผู้เชี่ยวชาญตรวจทาน
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}