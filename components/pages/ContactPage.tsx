"use client";

import * as React from "react";
import Link from "next/link";
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Stack,
    Alert,
    Divider,
    Chip,
    MenuItem,
} from "@mui/material";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";

type Topic =
    | "สอบถามการจอง"
    | "ชำระเงิน"
    | "รับรถ-คืนรถ"
    | "มัดจำ/ประกัน"
    | "ปัญหาการใช้งาน"
    | "อื่นๆ";

const TOPICS: Topic[] = [
    "สอบถามการจอง",
    "ชำระเงิน",
    "รับรถ-คืนรถ",
    "มัดจำ/ประกัน",
    "ปัญหาการใช้งาน",
    "อื่นๆ",
];

function isEmailLike(v: string) {
    const s = v.trim();
    return s.includes("@") && s.includes(".");
}

function isBookingIdLike(v: string) {
    // ยอมให้ว่างได้ ถ้าไม่ว่างต้อง 4 ตัวขึ้นไป
    const s = v.trim();
    if (!s) return true;
    return s.length >= 4;
}

export default function ContactPage() {
    const [topic, setTopic] = React.useState<Topic>("สอบถามการจอง");
    const [bookingId, setBookingId] = React.useState("");

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");

    const [ok, setOk] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const canSubmit =
        name.trim().length >= 2 &&
        isEmailLike(email) &&
        message.trim().length >= 10 &&
        isBookingIdLike(bookingId);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;

        setLoading(true);

        // mock delay
        await new Promise((r) => setTimeout(r, 700));

        setLoading(false);
        setOk(true);

        // reset form
        setTopic("สอบถามการจอง");
        setBookingId("");
        setName("");
        setEmail("");
        setMessage("");
    };

    const fieldSX = {
        "& .MuiOutlinedInput-root": { borderRadius: "10px" },
    };

    return (
        <Container maxWidth="lg" className="py-12">

            <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Box className="flex flex-col gap-2">
                    <Typography variant="h5" className="text-2xl font-bold text-slate-900">ติดต่อเรา</Typography>
                    <Typography className="text-sm text-slate-600">
                        ส่งข้อความถึงทีมงานเพื่อขอความช่วยเหลือ เราจะตอบกลับในเวลาทำการ
                    </Typography>
                </Box>

                <Button
                    component={Link}
                    href="/"
                    variant="outlined"
                    className="rounded-xl! border-slate-300! text-slate-900!"
                    sx={{ textTransform: "none" }}
                >
                    กลับหน้าแรก
                </Button>
            </Box>


            <Box className="mt-2 flex flex-wrap gap-2">
                <Chip
                    icon={<SupportAgentRoundedIcon fontSize="small" className="text-emerald-500! ml-2!" />}
                    label="ซัพพอร์ต"
                    variant="outlined"
                    className="bg-slate-900/5! text-slate-700!"
                />
                <Chip
                    icon={<AccessTimeRoundedIcon fontSize="small" className="text-emerald-500! ml-2!" />}
                    label="ตอบกลับในเวลาทำการ"
                    variant="outlined"
                    className="bg-slate-900/5! text-slate-700!"
                />
                <Chip
                    icon={<LocalOfferRoundedIcon fontSize="small" className="text-emerald-500! ml-2!" />}
                    label="แนบรหัสการจอง (ถ้ามี) จะช่วยได้เร็วขึ้น"
                    variant="outlined"
                    className="bg-slate-900/5! text-slate-700!"
                />
            </Box>

            <Box className="mt-6 grid gap-6 lg:grid-cols-12">
                {/* Left: Contact info */}
                <Box className="lg:col-span-5">
                    <Card elevation={0} sx={{ boxShadow: "none" }} className="rounded-2xl! border border-slate-200 bg-white">
                        <CardContent className="p-6">
                            <Typography className="text-sm font-semibold text-slate-900">ช่องทางติดต่อ</Typography>
                            <Typography className="mt-1 text-sm text-slate-600">
                                เลือกช่องทางที่สะดวก หรือส่งฟอร์มด้านขวา
                            </Typography>

                            <Divider className="my-5! border-slate-200!" />

                            <Box className="space-y-4">
                                <Box className="flex items-start gap-3">
                                    <Box className="grid h-10 w-10 place-items-center rounded-xl! border border-slate-200 bg-slate-50">
                                        <EmailRoundedIcon fontSize="small" />
                                    </Box>
                                    <Box>
                                        <Typography className="text-sm font-semibold text-slate-900">Email</Typography>
                                        <Typography className="text-sm text-slate-600">support@rentflow.com</Typography>
                                        <Typography className="text-xs text-slate-500">เหมาะสำหรับแนบรายละเอียด/รูปภาพ</Typography>
                                    </Box>
                                </Box>

                                <Box className="flex items-start gap-3">
                                    <Box className="grid h-10 w-10 place-items-center rounded-xl! border border-slate-200 bg-slate-50">
                                        <PhoneRoundedIcon fontSize="small" />
                                    </Box>
                                    <Box>
                                        <Typography className="text-sm font-semibold text-slate-900">Phone</Typography>
                                        <Typography className="text-sm text-slate-600">099-999-9999</Typography>
                                        <Typography className="text-xs text-slate-500">เหมาะสำหรับเรื่องเร่งด่วน</Typography>
                                    </Box>
                                </Box>

                                <Box className="flex items-start gap-3">
                                    <Box className="grid h-10 w-10 place-items-center rounded-xl! border border-slate-200 bg-slate-50">
                                        <AccessTimeRoundedIcon fontSize="small" />
                                    </Box>
                                    <Box>
                                        <Typography className="text-sm font-semibold text-slate-900">เวลาทำการ</Typography>
                                        <Typography className="text-sm text-slate-600">จันทร์–ศุกร์ 09:00–18:00</Typography>
                                        <Typography className="text-xs text-slate-500">* ข้อมูลตัวอย่าง (ปรับเป็นของจริงได้)</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Divider className="my-5! border-slate-200!" />

                            <Box className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <Typography className="text-xs font-semibold text-slate-900">ทิป</Typography>
                                <Typography className="mt-1 text-xs text-slate-600">
                                    หากติดต่อเรื่องการจอง แนะนำแนบรหัสการจอง + วันรับ-คืนรถ + ปัญหาที่พบ จะช่วยให้ตรวจสอบได้เร็วขึ้น
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Right: Form */}
                <Box className="lg:col-span-7">
                    <Card elevation={0} sx={{ boxShadow: "none" }} className="rounded-2xl! border border-slate-200 bg-white">
                        <CardContent className="p-6">
                            {ok ? (
                                <Alert
                                    className="mb-4"
                                    severity="success"
                                    onClose={() => setOk(false)}
                                >
                                    ส่งข้อความเรียบร้อย (mock) — ทีมงานจะตอบกลับในเวลาทำการ
                                </Alert>
                            ) : null}

                            <Typography className="text-sm font-semibold text-slate-900">ส่งข้อความหาเรา</Typography>
                            <Typography className="mt-1 text-sm text-slate-600">
                                กรุณากรอกข้อมูลให้ครบ เพื่อให้ช่วยได้เร็วขึ้น
                            </Typography>

                            <Divider className="my-5! border-slate-200!" />

                            <Box component="form" onSubmit={onSubmit} className="grid gap-4">
                                <Box className="grid gap-4 sm:grid-cols-2">
                                    <TextField
                                        select
                                        label="หัวข้อ"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value as Topic)}
                                        fullWidth
                                        size="small"
                                        sx={fieldSX}
                                    >
                                        {TOPICS.map((t) => (
                                            <MenuItem key={t} value={t}>
                                                {t}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                        label="รหัสการจอง (ถ้ามี)"
                                        value={bookingId}
                                        onChange={(e) => setBookingId(e.target.value)}
                                        fullWidth
                                        size="small"
                                        sx={fieldSX}
                                        helperText={
                                            bookingId.trim() && bookingId.trim().length < 4
                                                ? "รหัสการจองสั้นเกินไป"
                                                : "เว้นว่างได้"
                                        }
                                        error={!!bookingId.trim() && bookingId.trim().length < 4}
                                    />
                                </Box>

                                <Box className="grid gap-4 sm:grid-cols-2">
                                    <TextField
                                        label="ชื่อ"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        fullWidth
                                        size="small"
                                        sx={fieldSX}
                                    />
                                    <TextField
                                        label="อีเมล"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        fullWidth
                                        size="small"
                                        sx={fieldSX}
                                        error={!!email.trim() && !isEmailLike(email)}
                                        helperText={
                                            email.trim() && !isEmailLike(email) ? "รูปแบบอีเมลไม่ถูกต้อง" : " "
                                        }
                                    />
                                </Box>

                                <TextField
                                    label="ข้อความ"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    fullWidth
                                    multiline
                                    minRows={5}
                                    sx={fieldSX}
                                    placeholder="เช่น ต้องการเปลี่ยนวันรับรถ / คืนรถช้า / ชำระเงินแล้วสถานะไม่ขึ้น ฯลฯ"
                                    helperText={
                                        message.trim().length > 0 && message.trim().length < 10
                                            ? "อย่างน้อย 10 ตัวอักษร"
                                            : " "
                                    }
                                    error={message.trim().length > 0 && message.trim().length < 10}
                                />

                                <Stack direction="row" spacing={1.5} className="flex-wrap items-center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={!canSubmit || loading}
                                        className="rounded-xl! px-5! py-2.5! font-semibold!"
                                        sx={{ textTransform: "none", backgroundColor: "rgb(15 23 42)" }}
                                    >
                                        {loading ? "กำลังส่ง..." : "ส่งข้อความ"}
                                    </Button>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Container >
    );
}