"use client";

import * as React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Divider,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

export default function ContactInfoCard() {
    return (
        <Card
            elevation={0}
            sx={{ boxShadow: "none" }}
            className="rounded-2xl! border border-slate-200 bg-white"
        >
            <CardContent className="p-4!">
                <Typography className="text-sm font-semibold text-slate-900">
                    ช่องทางติดต่อ
                </Typography>
                <Typography className="mt-1 text-sm text-slate-600">
                    เลือกช่องทางที่สะดวก หรือส่งฟอร์มด้านขวา
                </Typography>

                <Divider className="my-5! border-slate-200!" />

                <Box className="space-y-4">
                    <Box className="flex items-start gap-4">
                        <Box className="grid h-10 w-10 place-items-center rounded-xl! border border-slate-200 bg-slate-50">
                            <EmailRoundedIcon fontSize="small" />
                        </Box>
                        <Box>
                            <Typography className="text-sm font-semibold text-slate-900">
                                Email
                            </Typography>
                            <Typography className="text-sm text-slate-600">
                                support@rentflow.com
                            </Typography>
                            <Typography className="text-xs text-slate-500">
                                เหมาะสำหรับแนบรายละเอียด/รูปภาพ
                            </Typography>
                        </Box>
                    </Box>

                    <Box className="flex items-start gap-4">
                        <Box className="grid h-10 w-10 place-items-center rounded-xl! border border-slate-200 bg-slate-50">
                            <PhoneRoundedIcon fontSize="small" />
                        </Box>
                        <Box>
                            <Typography className="text-sm font-semibold text-slate-900">
                                Phone
                            </Typography>
                            <Typography className="text-sm text-slate-600">
                                099-999-9999
                            </Typography>
                            <Typography className="text-xs text-slate-500">
                                เหมาะสำหรับเรื่องเร่งด่วน
                            </Typography>
                        </Box>
                    </Box>

                    <Box className="flex items-start gap-4">
                        <Box className="grid h-10 w-10 place-items-center rounded-xl! border border-slate-200 bg-slate-50">
                            <AccessTimeRoundedIcon fontSize="small" />
                        </Box>
                        <Box>
                            <Typography className="text-sm font-semibold text-slate-900">
                                เวลาทำการ
                            </Typography>
                            <Typography className="text-sm text-slate-600">
                                จันทร์–ศุกร์ 09:00–18:00
                            </Typography>
                            <Typography className="text-xs text-slate-500">
                                * ข้อมูลตัวอย่าง (ปรับเป็นของจริงได้)
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider className="my-5! border-slate-200!" />

                <Box className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <Typography className="text-xs font-semibold text-slate-900">
                        ทิป
                    </Typography>
                    <Typography className="mt-1 text-xs text-slate-600">
                        หากติดต่อเรื่องการจอง แนะนำแนบรหัสการจอง + วันรับ-คืนรถ +
                        ปัญหาที่พบ จะช่วยให้ตรวจสอบได้เร็วขึ้น
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}