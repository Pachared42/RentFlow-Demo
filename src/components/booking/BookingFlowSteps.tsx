import { Box, Typography } from "@mui/material";

export type BookingFlowStepKey =
  | "car"
  | "booking"
  | "payment"
  | "success";

const FLOW_STEPS: Array<{ key: BookingFlowStepKey; label: string }> = [
  { key: "car", label: "เลือกรถ" },
  { key: "booking", label: "กรอกรายละเอียด" },
  { key: "payment", label: "ชำระเงิน" },
  { key: "success", label: "จองสำเร็จ" },
];

const CURRENT_COLOR = "var(--rf-booking-step-current)";
const COMPLETE_COLOR = "var(--rf-booking-step-complete)";
const PENDING_BORDER = "#ececec";
const PENDING_TEXT = "#111827";

export default function BookingFlowSteps({
  currentStep,
  className = "",
}: {
  currentStep: BookingFlowStepKey;
  className?: string;
}) {
  const currentIndex = FLOW_STEPS.findIndex((step) => step.key === currentStep);
  const CIRCLE_SIZE = 50;
  const CONNECTOR_WIDTH = 92;
  const TRACK_COLUMNS = FLOW_STEPS.map((_, index) =>
    index === FLOW_STEPS.length - 1
      ? `${CIRCLE_SIZE}px`
      : `${CIRCLE_SIZE}px ${CONNECTOR_WIDTH}px`
  ).join(" ");

  return (
    <Box
      aria-label="ลำดับขั้นตอนการจอง"
      className={`relative left-1/2 w-screen -translate-x-1/2 ${className}`.trim()}
    >
      <Box className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Box className="mx-auto w-fit px-3">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: TRACK_COLUMNS,
              gridTemplateRows: "50px auto",
              alignItems: "center",
              justifyItems: "center",
              justifyContent: "center",
              rowGap: "12px",
            }}
          >
          {FLOW_STEPS.map((step, index) => {
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
                  className="relative z-[1] flex h-[50px] w-[50px] items-center justify-center rounded-full border text-[1.55rem] font-semibold leading-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  sx={{
                    ...circleStyle,
                    gridColumn: circleColumn,
                    gridRow: 1,
                  }}
                >
                  {index + 1}
                </Box>

                {index !== FLOW_STEPS.length - 1 ? (
                  <Box
                    className="h-[10px] self-center transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    sx={{
                      gridColumn: connectorColumn,
                      gridRow: 1,
                      justifySelf: "stretch",
                      width: "calc(100% + 8px)",
                      ml: "-4px",
                      ...connectorStyle,
                    }}
                  />
                ) : null}

                <Typography
                  className="whitespace-nowrap text-center text-[15px] font-semibold tracking-[-0.03em] text-[var(--rf-apple-ink)] md:text-[17px]"
                  sx={{
                    gridColumn: circleColumn,
                    gridRow: 2,
                    justifySelf: "center",
                    width: "max-content",
                    maxWidth: 180,
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
