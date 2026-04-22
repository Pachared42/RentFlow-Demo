"use client";

import { Box, TextField } from "@mui/material";

type Props = {
  fieldSX: object;
  pickupDate: string;
  setPickupDate: (value: string) => void;
  pickupTime: string;
  setPickupTime: (value: string) => void;
  returnDate: string;
  setReturnDate: (value: string) => void;
  returnTime: string;
  setReturnTime: (value: string) => void;
  timeInvalid: boolean;
};

export default function BookingDateTime({
  fieldSX,
  pickupDate,
  setPickupDate,
  pickupTime,
  setPickupTime,
  returnDate,
  setReturnDate,
  returnTime,
  setReturnTime,
  timeInvalid,
}: Props) {
  return (
    <Box className="grid gap-4 sm:grid-cols-2">
      {(() => {
        const now = new Date();
        const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
        const minReturnDate = pickupDate && pickupDate > today ? pickupDate : today;

        return (
          <>
      <TextField
        label="วันรับรถ"
        type="date"
        value={pickupDate}
        onChange={(e) => setPickupDate(e.target.value)}
        fullWidth
        size="small"
        sx={fieldSX}
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: today }}
      />

      <TextField
        label="เวลารับรถ"
        type="time"
        value={pickupTime}
        onChange={(e) => setPickupTime(e.target.value)}
        fullWidth
        size="small"
        sx={fieldSX}
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 300 }}
      />

      <TextField
        label="วันคืนรถ"
        type="date"
        value={returnDate}
        onChange={(e) => setReturnDate(e.target.value)}
        fullWidth
        size="small"
        sx={fieldSX}
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: minReturnDate }}
        error={!!pickupDate && !!returnDate && timeInvalid}
        helperText={
          pickupDate && returnDate && timeInvalid
            ? "วัน/เวลาคืนรถต้องไม่ก่อนวัน/เวลารับรถ"
            : " "
        }
      />

      <TextField
        label="เวลาคืนรถ"
        type="time"
        value={returnTime}
        onChange={(e) => setReturnTime(e.target.value)}
        fullWidth
        size="small"
        sx={fieldSX}
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 300 }}
        error={!!pickupDate && !!returnDate && timeInvalid}
      />
          </>
        );
      })()}
    </Box>
  );
}
