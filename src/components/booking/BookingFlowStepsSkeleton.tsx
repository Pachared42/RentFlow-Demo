import { Box, Skeleton } from "@mui/material";

export default function BookingFlowStepsSkeleton({
  className = "",
}: {
  className?: string;
}) {
  const CIRCLE_SIZE = 50;
  const CONNECTOR_WIDTH = 92;
  const TRACK_COLUMNS = Array.from({ length: 4 }, (_, index) =>
    index === 3 ? `${CIRCLE_SIZE}px` : `${CIRCLE_SIZE}px ${CONNECTOR_WIDTH}px`
  ).join(" ");

  return (
    <Box
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
          {Array.from({ length: 4 }).map((_, index) => (
            <Box
              key={`booking-flow-step-skeleton-${index}`}
              sx={{ display: "contents" }}
            >
              <Skeleton
                variant="circular"
                animation="wave"
                sx={{
                  width: 50,
                  height: 50,
                  gridColumn: index * 2 + 1,
                  gridRow: 1,
                }}
              />
              {index !== 3 ? (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  sx={{
                    gridColumn: index * 2 + 2,
                    gridRow: 1,
                    justifySelf: "stretch",
                    width: "calc(100% + 8px)",
                    ml: "-4px",
                    height: 10,
                    borderRadius: 0,
                  }}
                />
              ) : null}
              <Skeleton
                variant="text"
                animation="wave"
                sx={{
                  width: 120,
                  height: 20,
                  borderRadius: "8px",
                  transform: "none",
                  gridColumn: index * 2 + 1,
                  gridRow: 2,
                  justifySelf: "center",
                }}
              />
            </Box>
          ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
