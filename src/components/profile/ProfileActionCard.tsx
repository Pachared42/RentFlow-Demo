"use client";

import * as React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { logout as logoutRequest } from "@/src/services/auth/auth.service";

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

  const handleLogout = React.useCallback(async () => {
    try {
      await logoutRequest();
    } catch {
      // ปล่อยให้กลับหน้าหลักได้แม้คำขอออกจากระบบไม่สำเร็จ
    }

    router.push("/");
    router.refresh();
  }, [router]);

  return (
    <Box className="apple-card p-5 md:p-6">
      <Typography className="text-lg font-bold tracking-[-0.03em] text-[var(--rf-apple-ink)]">
        จัดการบัญชี
      </Typography>

      <Box className="mt-5 grid gap-3">
        {!isEditing ? (
          <Button
            fullWidth
            variant="contained"
            startIcon={<EditRoundedIcon />}
            className="rounded-full! py-2.5! font-semibold!"
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
              className="rounded-full! py-2.5! font-semibold!"
              onClick={onSave}
            >
              บันทึกข้อมูล
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<CloseRoundedIcon />}
              className="rounded-full! py-2.5!"
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
          className="rounded-full! py-2.5!"
          onClick={() => router.push("/")}
        >
          กลับหน้าหลัก
        </Button>
      </Box>

      <Divider className="my-4! border-black/10!" />

      <Box className="space-y-3">
        <Box className="flex items-center justify-between">
          <Typography className="text-sm text-[var(--rf-apple-muted)]">อีเมล</Typography>
          <Typography
            className={`text-sm font-semibold ${
              emailVerified ? "text-emerald-600" : "text-amber-600"
            }`}
          >
            {emailVerified ? "ยืนยันแล้ว" : "ยังไม่ยืนยัน"}
          </Typography>
        </Box>

        <Box className="flex items-center justify-between">
          <Typography className="text-sm text-[var(--rf-apple-muted)]">บัญชี</Typography>
          <Typography className="text-sm font-semibold text-[var(--rf-apple-ink)]">
            ใช้งานได้
          </Typography>
        </Box>
      </Box>

      <Divider className="my-4! border-black/10!" />

      <Button
        fullWidth
        variant="contained"
        startIcon={<LogoutRoundedIcon />}
        className="rounded-full! py-2.5! font-semibold!"
        sx={{
          backgroundColor: "rgb(220 38 38) !important",
          "&:hover": {
            backgroundColor: "rgb(185 28 28) !important",
          },
        }}
        onClick={handleLogout}
      >
        ออกจากระบบ
      </Button>
    </Box>
  );
}
