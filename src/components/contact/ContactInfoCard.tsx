"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { formatLocationLabel } from "@/src/lib/rentflow-catalog";
import type { Branch } from "@/src/services/branches/branches.types";

function formatBranchHours(branch: Branch) {
  if (branch.openTime && branch.closeTime) {
    return `${branch.openTime} - ${branch.closeTime}`;
  }

  if (branch.openTime) return `เปิด ${branch.openTime}`;
  if (branch.closeTime) return `ปิด ${branch.closeTime}`;

  return "โปรดติดต่อสาขาเพื่อยืนยันเวลาเปิด-ปิด";
}

export default function ContactInfoCard({
  branches,
  title = "ช่องทางติดต่อ",
  description = "เลือกสาขาที่สะดวกสำหรับการรับบริการ",
}: {
  branches: Branch[];
  title?: string;
  description?: string;
}) {
  return (
    <Card
      elevation={0}
      sx={{ boxShadow: "none" }}
      className="apple-card"
    >
      <CardContent className="p-4!">
        <Typography className="text-base font-bold tracking-[-0.03em] text-[var(--rf-apple-ink)]">
          {title}
        </Typography>
        <Typography className="mt-1 text-sm text-[var(--rf-apple-muted)]">
          {description}
        </Typography>

        <Divider className="my-5! border-black/10!" />

        {branches.length ? (
          <Box className="space-y-4">
            {branches.map((branch) => (
              <Box
                key={branch.id}
                className="apple-card apple-card-no-hover rounded-[18px] bg-[var(--rf-apple-surface-soft)] p-4"
              >
                <Box className="flex flex-wrap items-start justify-between gap-3">
                  <Box>
                    <Typography className="text-sm font-semibold text-[var(--rf-apple-ink)]">
                      {branch.name}
                    </Typography>
                    <Typography className="mt-1 text-xs text-[var(--rf-apple-muted)]">
                      รหัสสาขา: {branch.id}
                    </Typography>
                  </Box>

                  <Box className="flex flex-wrap gap-2">
                    {branch.locationId ? (
                      <Chip
                        size="small"
                        label={formatLocationLabel(branch.locationId)}
                        className="border! border-slate-200! bg-white! text-slate-700!"
                      />
                    ) : null}
                    <Chip
                      size="small"
                      label={branch.isActive ? "พร้อมให้บริการ" : "ปิดใช้งาน"}
                      className={
                        branch.isActive
                          ? "border! border-emerald-200! bg-emerald-50! text-emerald-700!"
                          : "border! border-slate-200! bg-white! text-slate-500!"
                      }
                    />
                  </Box>
                </Box>

                <Box className="mt-4 space-y-3">
                  <Box className="flex items-start gap-3">
                    <Box className="grid h-9 w-9 place-items-center rounded-full bg-white text-[var(--rf-apple-blue)]">
                      <PlaceRoundedIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography className="text-xs font-semibold text-[var(--rf-apple-ink)]">
                        ที่อยู่
                      </Typography>
                      <Typography className="text-sm text-[var(--rf-apple-muted)]">
                        {branch.address || "-"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="flex items-start gap-3">
                    <Box className="grid h-9 w-9 place-items-center rounded-full bg-white text-[var(--rf-apple-blue)]">
                      <PhoneRoundedIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography className="text-xs font-semibold text-[var(--rf-apple-ink)]">
                        โทรศัพท์
                      </Typography>
                      <Typography className="text-sm text-[var(--rf-apple-muted)]">
                        {branch.phone || "ยังไม่มีเบอร์โทร"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="flex items-start gap-3">
                    <Box className="grid h-9 w-9 place-items-center rounded-full bg-white text-[var(--rf-apple-blue)]">
                      <AccessTimeRoundedIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography className="text-xs font-semibold text-[var(--rf-apple-ink)]">
                        เวลาเปิด-ปิด
                      </Typography>
                      <Typography className="text-sm text-[var(--rf-apple-muted)]">
                        {formatBranchHours(branch)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Box className="rounded-[18px] border border-dashed border-black/10 bg-[var(--rf-apple-surface-soft)] p-5 text-sm text-[var(--rf-apple-muted)]">
            ยังไม่พบสาขาให้ติดต่อในตอนนี้
          </Box>
        )}

        <Divider className="my-5! border-black/10!" />

        <Box className="apple-card apple-card-no-hover rounded-[18px] bg-[var(--rf-apple-surface-soft)] p-4">
          <Typography className="text-xs font-semibold text-[var(--rf-apple-ink)]">
            ทิป
          </Typography>
          <Typography className="mt-1 text-xs text-[var(--rf-apple-muted)]">
            หากติดต่อเรื่องการจอง แนะนำแนบรหัสการจอง วันรับ-คืนรถ
            และสาขาที่เกี่ยวข้อง จะช่วยให้ทีมงานดูแลได้เร็วขึ้น
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
