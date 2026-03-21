import {
  Box,
  Container,
  Card,
  CardContent,
  Divider,
  Skeleton,
  Stack,
} from "@mui/material";

function HeaderSkeleton() {
  return (
    <Stack spacing={1} className="mb-6">
      <Stack direction="row" className="items-center justify-between gap-3">
        <Stack className="min-w-0 flex-1">
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width: { xs: "100%", sm: 360 },
              maxWidth: "100%",
              height: 38,
              borderRadius: "8px",
              transform: "none",
            }}
          />
          <Box className="mt-1 flex flex-wrap items-center gap-2">
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{
                width: 150,
                height: 28,
                borderRadius: "999px",
              }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                width: { xs: "100%", sm: 300 },
                maxWidth: "100%",
                height: 16,
                borderRadius: "8px",
                transform: "none",
              }}
            />
          </Box>
        </Stack>

        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            width: 110,
            height: 36,
            borderRadius: "12px",
            flexShrink: 0,
          }}
        />
      </Stack>
    </Stack>
  );
}

function TocSkeleton() {
  return (
    <>
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: 55,
          height: 20,
          borderRadius: "8px",
          transform: "none",
        }}
      />

      <Box className="mt-3 grid gap-2 sm:grid-cols-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            animation="wave"
            sx={{
              width: "100%",
              height: 40,
              borderRadius: "12px",
            }}
          />
        ))}
      </Box>
    </>
  );
}

function ContentSectionSkeleton({
  lines = 2,
  titleWidth = 120,
}: {
  lines?: number;
  titleWidth?: number;
}) {
  return (
    <Box>
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: titleWidth,
          height: 22,
          borderRadius: "8px",
          transform: "none",
        }}
      />

      <Box className="mt-2 flex flex-col gap-1.5">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            variant="text"
            animation="wave"
            sx={{
              width: i === lines - 1 ? "78%" : "100%",
              height: 18,
              borderRadius: "8px",
              transform: "none",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default function PrivacyPageSkeleton() {
  return (
    <Box className="min-h-screen bg-slate-50">
      <Container maxWidth="md" className="relative py-10">
        <HeaderSkeleton />

        <Card
          elevation={0}
          className="rounded-2xl! border border-slate-200 bg-white"
          sx={{ boxShadow: "0 20px 60px rgba(15,23,42,0.10)" }}
        >
          <CardContent className="p-7">
            <TocSkeleton />

            <Divider className="my-6! border-slate-200!" />

            <Stack spacing={3}>
              <ContentSectionSkeleton titleWidth={90} lines={2} />
              <ContentSectionSkeleton titleWidth={120} lines={4} />
              <ContentSectionSkeleton titleWidth={150} lines={4} />
              <ContentSectionSkeleton titleWidth={130} lines={2} />
              <ContentSectionSkeleton titleWidth={155} lines={2} />
              <ContentSectionSkeleton titleWidth={105} lines={2} />
              <ContentSectionSkeleton titleWidth={145} lines={4} />
              <ContentSectionSkeleton titleWidth={150} lines={2} />
              <ContentSectionSkeleton titleWidth={95} lines={2} />

              <Divider className="my-2! border-slate-200!" />

              <Skeleton
                variant="text"
                animation="wave"
                sx={{
                  width: "100%",
                  height: 16,
                  borderRadius: "8px",
                  transform: "none",
                }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                sx={{
                  width: "84%",
                  height: 16,
                  borderRadius: "8px",
                  transform: "none",
                }}
              />
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
