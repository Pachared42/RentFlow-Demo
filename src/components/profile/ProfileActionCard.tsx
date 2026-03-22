"use client";

import * as React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function ProfileActionCard({
  isEditing,
  emailVerified,
  onStartEdit,
  onSave,
  onCancel,
}: {
  isEditing: boolean;
  emailVerified: boolean;
  onStartEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const router = useRouter();

  return (
    <Box className="rounded-3xl border border-slate-200 bg-white p-5">
      <Typography className="text-base font-bold text-slate-900">
        จัดการบัญชี
      </Typography>

      <Box className="mt-4 grid gap-3">
        {!isEditing ? (
          <Button
            fullWidth
            variant="contained"
            startIcon={<EditRoundedIcon />}
            className="rounded-xl! py-2.5! font-semibold!"
            sx={{
              textTransform: "none",
              backgroundColor: "rgb(15 23 42)",
            }}
            onClick={onStartEdit}
          >
            แก้ไขข้อมูล
          </Button>
        ) : (
          <>
            <Button
              fullWidth
              variant="contained"
              startIcon={<SaveRoundedIcon />}
              className="rounded-xl! py-2.5! font-semibold!"
              sx={{
                textTransform: "none",
                backgroundColor: "rgb(15 23 42)",
              }}
              onClick={onSave}
            >
              บันทึกข้อมูล
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<CloseRoundedIcon />}
              className="rounded-xl! py-2.5!"
              sx={{ textTransform: "none" }}
              onClick={onCancel}
            >
              ยกเลิก
            </Button>
          </>
        )}

        <Button
          fullWidth
          variant="outlined"
          startIcon={<HomeRoundedIcon />}
          className="rounded-xl! py-2.5!"
          sx={{ textTransform: "none" }}
          onClick={() => router.push("/")}
        >
          กลับหน้าหลัก
        </Button>
      </Box>

      <Divider className="my-4! border-slate-200!" />

      <Box className="space-y-3">
        <Box className="flex items-center justify-between">
          <Typography className="text-sm text-slate-500">อีเมล</Typography>
          <Typography
            className={`text-sm font-semibold ${
              emailVerified ? "text-emerald-600" : "text-amber-600"
            }`}
          >
            {emailVerified ? "ยืนยันแล้ว" : "ยังไม่ยืนยัน"}
          </Typography>
        </Box>

        <Box className="flex items-center justify-between">
          <Typography className="text-sm text-slate-500">บัญชี</Typography>
          <Typography className="text-sm font-semibold text-slate-900">
            ใช้งานได้
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}