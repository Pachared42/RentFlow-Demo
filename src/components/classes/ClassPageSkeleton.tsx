import {
  Box,
  Container,
  Card,
  CardContent,
  CardActions,
  Skeleton,
} from "@mui/material";

function HeaderSkeleton() {
  return (
    <Box className="flex flex-col gap-2">
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: 150,
          height: 38,
          borderRadius: "8px",
          transform: "none",
        }}
      />
    </Box>
  );
}

function CarCardSkeleton() {
  return (
    <Card
      elevation={0}
      sx={{ boxShadow: "none" }}
      className="rounded-2xl! border border-slate-200 bg-white"
    >
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          width: "100%",
          height: 208,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      />

      <CardContent className="p-6">
        <Box className="flex flex-col gap-1.5">
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width: "68%",
              height: 24,
              borderRadius: "8px",
              transform: "none",
            }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width: "90%",
              height: 18,
              borderRadius: "8px",
              transform: "none",
            }}
          />
        </Box>

        <Box className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <Box className="flex items-end gap-2">
            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                width: 65,
                height: 18,
                borderRadius: "8px",
                transform: "none",
              }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                width: 100,
                height: 30,
                borderRadius: "8px",
                transform: "none",
              }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                width: 32,
                height: 18,
                borderRadius: "8px",
                transform: "none",
              }}
            />
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ p: "0px 16px 16px" }} className="gap-2">
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            width: "100%",
            height: 36,
            borderRadius: "12px",
            flex: 1,
          }}
        />
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            width: "100%",
            height: 36,
            borderRadius: "12px",
            flex: 1,
          }}
        />
      </CardActions>
    </Card>
  );
}

export default function ClassPageSkeleton() {
  return (
    <Box className="min-h-screen bg-white text-slate-900">
      <Container maxWidth="lg" className="py-10">
        <HeaderSkeleton />

        <Box className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CarCardSkeleton key={i} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
