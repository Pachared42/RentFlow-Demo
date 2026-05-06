"use client";

import { Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export type BookingFlowStepKey =
  | "car"
  | "booking"
  | "payment"
  | "success";

type BookingFlowMode = "payment" | "chat";

const PAYMENT_FLOW_STEPS: Array<{ key: BookingFlowStepKey; label: string }> = [
  { key: "car", label: "เลือกรถ" },
  { key: "booking", label: "กรอกรายละเอียด" },
  { key: "payment", label: "ชำระเงิน" },
  { key: "success", label: "จองสำเร็จ" },
];

const CHAT_FLOW_STEPS: Array<{ key: BookingFlowStepKey; label: string }> = [
  { key: "car", label: "เลือกรถ" },
  { key: "booking", label: "กรอกรายละเอียด" },
];

const CURRENT_COLOR = "var(--rf-booking-step-current)";
const COMPLETE_COLOR = "var(--rf-booking-step-complete)";
const PENDING_BORDER = "#ececec";
const PENDING_TEXT = "#111827";

export default function BookingFlowSteps({
  currentStep,
  mode = "chat",
  className = "",
}: {
  currentStep: BookingFlowStepKey;
  mode?: BookingFlowMode;
  className?: string;
}) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const steps = mode === "chat" ? CHAT_FLOW_STEPS : PAYMENT_FLOW_STEPS;
  const currentIndex = Math.max(
    0,
    currentStep === "success" && mode === "chat"
      ? steps.length - 1
      : steps.findIndex((step) => step.key === currentStep)
  );
  const CIRCLE_SIZE = isMobile ? 42 : 50;
  const CONNECTOR_WIDTH =
    mode === "chat" ? (isMobile ? 110 : 220) : isMobile ? 44 : 92;
  const TRACK_COLUMNS = steps
    .map((_, index) =>
      index === steps.length - 1
        ? `${CIRCLE_SIZE}px`
        : `${CIRCLE_SIZE}px ${CONNECTOR_WIDTH}px`
    )
    .join(" ");

  return (
    <Box
      aria-label="ลำดับขั้นตอนการจอง"
      className={`relative left-1/2 w-screen -translate-x-1/2 ${className}`.trim()}
    >
      <Box className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Box className="mx-auto w-fit px-4">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: TRACK_COLUMNS,
              gridTemplateRows: `${CIRCLE_SIZE}px auto`,
              alignItems: "center",
              justifyItems: "center",
              justifyContent: "center",
              rowGap: isMobile ? "10px" : "12px",
            }}
          >
            {steps.map((step, index) => {
              const isCompleted =
                index < currentIndex ||
                (currentStep === "success" && index === currentIndex);
              const isCurrent = index === currentIndex && !isCompleted;
              const circleColumn = index * 2 + 1;
              const connectorColumn = circleColumn + 1;

              const circleStyle = isCompleted
                ? {
                    backgroundColor: COMPLETE_COLOR,
                    borderColor: COMPLETE_COLOR,
                    color: "#fff",
                    boxShadow:
                      "0 10px 24px color-mix(in srgb, var(--rf-booking-step-complete) 16%, transparent)",
                  }
                : isCurrent
                  ? {
                      backgroundColor: CURRENT_COLOR,
                      borderColor: CURRENT_COLOR,
                      color: "#fff",
                      boxShadow: "0 10px 24px rgba(79, 70, 229, 0.16)",
                    }
                  : {
                      backgroundColor: PENDING_BORDER,
                      borderColor: PENDING_BORDER,
                      color: PENDING_TEXT,
                      boxShadow: "none",
                    };

              const connectorStyle =
                index === currentIndex - 1 && currentStep !== "success"
                  ? {
                      background: `linear-gradient(90deg, ${COMPLETE_COLOR} 0%, ${COMPLETE_COLOR} 50%, ${CURRENT_COLOR} 50%, ${CURRENT_COLOR} 100%)`,
                    }
                  : currentIndex > index
                    ? { backgroundColor: COMPLETE_COLOR }
                    : { backgroundColor: PENDING_BORDER };

              return (
                <Box key={step.key} sx={{ display: "contents" }}>
                  <Box
                    className="relative z-[1] flex items-center justify-center rounded-full border font-semibold leading-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    sx={{
                      ...circleStyle,
                      width: CIRCLE_SIZE,
                      height: CIRCLE_SIZE,
                      fontSize: isMobile ? "1.3rem" : "1.55rem",
                      gridColumn: circleColumn,
                      gridRow: 1,
                    }}
                  >
                    {index + 1}
                  </Box>

                  {index !== steps.length - 1 ? (
                    <Box
                      className="self-center transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      sx={{
                        gridColumn: connectorColumn,
                        gridRow: 1,
                        justifySelf: "stretch",
                        height: isMobile ? "8px" : "10px",
                        width: "calc(100% + 8px)",
                        ml: "-4px",
                        ...connectorStyle,
                      }}
                    />
                  ) : null}

                  <Typography
                    className="text-center font-semibold tracking-[-0.03em] text-[var(--rf-apple-ink)]"
                    sx={{
                      gridColumn: circleColumn,
                      gridRow: 2,
                      justifySelf: "center",
                      width: isMobile ? CIRCLE_SIZE + 36 : "max-content",
                      maxWidth: isMobile ? CIRCLE_SIZE + 36 : 180,
                      fontSize: isMobile ? 13 : 17,
                      lineHeight: 1.2,
                    }}
                  >
                    {step.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
