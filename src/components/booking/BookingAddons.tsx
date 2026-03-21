"use client";

import { Box, Checkbox, Divider, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { ADDONS, type AddonKey } from "@/src/constants/booking.addons";
import { formatTHB } from "@/src/constants/money";

type Props = {
  addons: Record<AddonKey, boolean>;
  days: number;
  addonsTotal: number;
  onChange: (key: AddonKey, checked: boolean) => void;
};

export default function BookingAddons({
  addons,
  days,
  addonsTotal,
  onChange,
}: Props) {
  return (
    <Box>
      <Typography className="text-sm font-semibold text-slate-900">
        บริการเสริม
      </Typography>
      <Typography className="mt-1 text-xs text-slate-500">
        เลือกได้ตามต้องการ (คิดราคา {days > 0 ? `อิง ${days} วัน` : "ตามจำนวนวัน"})
      </Typography>

      <Box className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <FormGroup>
          {ADDONS.map((a) => {
            const priceText =
              a.pricing === "perDay"
                ? `${formatTHB(a.price)} / วัน`
                : `${formatTHB(a.price)} / ครั้ง`;

            return (
              <FormControlLabel
                key={a.key}
                control={
                  <Checkbox
                    checked={addons[a.key]}
                    onChange={(e) => onChange(a.key, e.target.checked)}
                  />
                }
                label={
                  <Box className="flex w-full items-start justify-between">
                    <Box>
                      <Typography className="text-sm font-semibold text-slate-900">
                        {a.title}
                      </Typography>
                      <Typography className="text-xs text-slate-500">
                        {a.desc}
                      </Typography>
                    </Box>

                    <Typography className="ml-auto whitespace-nowrap text-sm font-bold text-slate-900">
                      {priceText}
                    </Typography>
                  </Box>
                }
                sx={{
                  alignItems: "flex-start",
                  m: 0,
                  py: 0.75,
                  "& .MuiFormControlLabel-label": { width: "100%" },
                }}
              />
            );
          })}
        </FormGroup>

        <Divider className="my-4! border-slate-200!" />

        <Box className="flex items-center justify-between">
          <Typography className="text-sm text-slate-600">
            รวมค่าบริการเสริม
          </Typography>
          <Typography className="text-sm font-bold text-slate-900">
            {addonsTotal > 0 ? formatTHB(addonsTotal) : "-"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}