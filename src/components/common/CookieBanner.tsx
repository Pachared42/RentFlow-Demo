"use client";

import * as React from "react";
import Link from "next/link";
import {
  Snackbar,
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CookieRoundedIcon from "@mui/icons-material/CookieRounded";

const KEY = "rf_cookie_consent_v1";

export default function CookieBanner() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(KEY);
    if (!saved) setOpen(true);
  }, []);

  const accept = () => {
    window.localStorage.setItem(KEY, "accepted");
    setOpen(false);
  };

  const reject = () => {
    window.localStorage.setItem(KEY, "rejected");
    setOpen(false);
  };

  const close = () => setOpen(false);

  if (!open) return null;

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={null}
      disableWindowBlurListener
      onClose={(event, reason) => {
        if (reason === "clickaway" || reason === "escapeKeyDown") {
          return;
        }
        setOpen(false);
      }}
      sx={{
        "& .MuiSnackbarContent-root": {
          p: 0,
          bgcolor: "transparent",
          boxShadow: "none",
        },
        mb: { xs: 1.5, sm: 2.5 },
      }}
    >
      <Box
        role="dialog"
        aria-label="Cookie consent"
        className="rounded-2xl border border-slate-200 bg-white"
        sx={{
          width: { xs: "calc(100vw - 24px)", sm: 720 },
          boxShadow:
            "0 10px 30px rgba(2,6,23,0.12), 0 2px 10px rgba(2,6,23,0.06)",
          overflow: "hidden",
        }}
      >
        <Box className="p-4 sm:p-5">
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Box
              className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-slate-50"
              sx={{ flex: "0 0 auto" }}
            >
              <CookieRoundedIcon fontSize="small" />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography className="text-sm font-semibold text-slate-900">
                  การตั้งค่าคุกกี้
                </Typography>
              </Stack>

              <Typography className="mt-1 text-xs leading-relaxed text-slate-600">
                เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์ใช้งาน
                และช่วยวิเคราะห์การใช้งานเว็บไซต์ คุณสามารถอ่านรายละเอียดได้ที่{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-slate-700 underline-offset-2 hover:underline"
                >
                  นโยบายความเป็นส่วนตัว
                </Link>
                .
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                className="mt-3"
                justifyContent="flex-end"
              >
                <Button
                  variant="outlined"
                  size="small"
                  onClick={reject}
                  sx={{
                    textTransform: "none",
                    borderColor: "rgb(226 232 240)",
                    color: "rgb(15 23 42)",
                    borderRadius: "10px",
                    "&:hover": {
                      borderColor: "rgb(203 213 225)",
                      bgcolor: "rgb(248 250 252)",
                    },
                  }}
                >
                  ปฏิเสธ
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  onClick={accept}
                  sx={{
                    textTransform: "none",
                    bgcolor: "rgb(15 23 42)",
                    borderRadius: "10px",
                    boxShadow: "none",
                    "&:hover": { bgcolor: "rgb(2 6 23)", boxShadow: "none" },
                  }}
                >
                  ยอมรับทั้งหมด
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Snackbar>
  );
}
