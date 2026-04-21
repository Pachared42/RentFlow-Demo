"use client";

import { Alert, Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import BookingLocation from "./BookingLocation";
import BookingDateTime from "./BookingDateTime";
import BookingAddons from "./BookingAddons";
import type { AddonKey } from "@/src/constants/booking.addons";

type Props = {
  fieldSX: object;
  error: string | null;
  setError: (value: string | null) => void;
  onSubmit: (e: React.FormEvent) => void;

  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;

  merchantBranchesEnabled: boolean;
  pickupBranch: string;
  setPickupBranch: (value: string) => void;
  returnBranch: string;
  setReturnBranch: (value: string) => void;
  pickupOther: string;
  setPickupOther: (value: string) => void;
  returnOther: string;
  setReturnOther: (value: string) => void;
  pickupFreeText: string;
  setPickupFreeText: (value: string) => void;
  returnFreeText: string;
  setReturnFreeText: (value: string) => void;

  pickupDate: string;
  setPickupDate: (value: string) => void;
  pickupTime: string;
  setPickupTime: (value: string) => void;
  returnDate: string;
  setReturnDate: (value: string) => void;
  returnTime: string;
  setReturnTime: (value: string) => void;

  addons: Record<AddonKey, boolean>;
  addonsTotal: number;
  handleAddonChange: (key: AddonKey, checked: boolean) => void;

  startDT: Date | null;
  endDT: Date | null;
  timeInvalid: boolean;

  showChatBooking: boolean;
  chatHref: string;
  canSubmit: boolean;
  loading: boolean;
  carExists: boolean;
};

export default function BookingForm({
  fieldSX,
  error,
  setError,
  onSubmit,
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  merchantBranchesEnabled,
  pickupBranch,
  setPickupBranch,
  returnBranch,
  setReturnBranch,
  pickupOther,
  setPickupOther,
  returnOther,
  setReturnOther,
  pickupFreeText,
  setPickupFreeText,
  returnFreeText,
  setReturnFreeText,
  pickupDate,
  setPickupDate,
  pickupTime,
  setPickupTime,
  returnDate,
  setReturnDate,
  returnTime,
  setReturnTime,
  addons,
  addonsTotal,
  handleAddonChange,
  startDT,
  endDT,
  timeInvalid,
  showChatBooking,
  chatHref,
  canSubmit,
  loading,
  carExists,
}: Props) {
  return (
    <Box component="form" onSubmit={onSubmit} className="grid gap-4">
      <Box className="grid gap-4 lg:grid-cols-3">
        <TextField
          label="ชื่อ-นามสกุล"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
        />
        <TextField
          label="เบอร์โทร"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          size="small"
          sx={fieldSX}
        />
      </Box>

      <BookingLocation
        merchantBranchesEnabled={merchantBranchesEnabled}
        fieldSX={fieldSX}
        pickupBranch={pickupBranch}
        setPickupBranch={setPickupBranch}
        returnBranch={returnBranch}
        setReturnBranch={setReturnBranch}
        pickupOther={pickupOther}
        setPickupOther={setPickupOther}
        returnOther={returnOther}
        setReturnOther={setReturnOther}
        pickupFreeText={pickupFreeText}
        setPickupFreeText={setPickupFreeText}
        returnFreeText={returnFreeText}
        setReturnFreeText={setReturnFreeText}
      />

      <BookingDateTime
        fieldSX={fieldSX}
        pickupDate={pickupDate}
        setPickupDate={setPickupDate}
        pickupTime={pickupTime}
        setPickupTime={setPickupTime}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
        returnTime={returnTime}
        setReturnTime={setReturnTime}
        timeInvalid={timeInvalid}
      />

      <Divider className="border-slate-200!" />

      <BookingAddons
        addons={addons}
        addonsTotal={addonsTotal}
        onChange={handleAddonChange}
      />

      {error ? (
        <Alert severity="error" className="mt-1" onClose={() => setError(null)}>
          {error}
        </Alert>
      ) : null}

      {startDT && endDT && endDT.getTime() < startDT.getTime() ? (
        <Alert severity="warning">
          วัน/เวลาคืนรถต้องไม่ก่อนวัน/เวลารับรถ
        </Alert>
      ) : null}

      <Box className="mt-6 space-y-4">
        {showChatBooking ? (
          <Box
            className="rounded-2xl border border-amber-200 bg-amber-50 p-4"
            sx={{
              backgroundImage:
                "radial-gradient(520px 160px at 18% 0%, rgba(251,191,36,0.22), transparent 60%)",
            }}
          >
            <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Box className="min-w-0">
                <Typography className="text-sm font-bold text-amber-900">
                  ยอดรวมค่อนข้างสูง — แนะนำจองผ่านแชท
                </Typography>
                <Typography className="mt-1 text-xs text-amber-800">
                  ต่อรองราคา/ขอเงื่อนไขพิเศษ หรือประเมินค่าส่งเพิ่มเติมได้
                </Typography>
                <Typography className="mt-2 text-[11px] text-amber-700">
                  * ระบบจะส่งรายละเอียดการจองแบบย่อให้แอดมินอัตโนมัติ
                </Typography>
              </Box>

              <Button
                component="a"
                href={chatHref}
                target="_blank"
                rel="noreferrer"
                variant="contained"
                className="rounded-xl! font-semibold!"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#f59e0b",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#d97706",
                    boxShadow: "none",
                  },
                  minWidth: { sm: 220 },
                  py: 1.25,
                }}
              >
                จองผ่านแชท (แนะนำ)
              </Button>
            </Box>
          </Box>
        ) : null}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          className="items-stretch sm:items-center"
        >
          <Button
            type="submit"
            variant="contained"
            disabled={!canSubmit || loading}
            className="rounded-xl! px-6! py-3! font-semibold!"
            sx={{
              textTransform: "none",
              backgroundColor: "#059669",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#047857",
                boxShadow: "none",
              },
              "&:disabled": {
                backgroundColor: "#e5e7eb",
                color: "#9ca3af",
                boxShadow: "none",
              },
            }}
          >
            {loading ? "กำลังไปหน้าชำระเงิน..." : "จองและไปชำระเงินทันที"}
          </Button>

          <Typography className="text-xs text-slate-500 sm:pl-1">
            * เลือกข้อมูลให้ถูกต้องก่อนดำเนินการต่อ
          </Typography>
        </Stack>
      </Box>

      {!carExists ? (
        <Alert severity="info">
          ยังไม่ได้เลือกรถ — ไปที่หน้า “รถทั้งหมด” เพื่อเลือกคันที่ต้องการ
        </Alert>
      ) : null}
    </Box>
  );
}
