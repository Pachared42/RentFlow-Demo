"use client";

import Link from "next/link";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import TermsTableOfContents from "@/src/components/terms/TermsTableOfContents";
import TermsContent from "@/src/components/terms/TermsContent";
import TermsPageSkeleton from "@/src/components/terms/TermsPageSkeleton";
import usePageReady from "@/src/hooks/usePageReady";

const sections = [
  { id: "intro", title: "1) ข้อตกลงเบื้องต้น" },
  { id: "account", title: "2) บัญชีผู้ใช้" },
  { id: "booking", title: "3) การจองและการชำระเงิน" },
  { id: "cancel", title: "4) การยกเลิก / คืนเงิน" },
  { id: "use", title: "5) การใช้งานที่เหมาะสม" },
  { id: "liability", title: "6) ข้อจำกัดความรับผิด" },
  { id: "changes", title: "7) การเปลี่ยนแปลงเงื่อนไข" },
  { id: "contact", title: "8) ติดต่อเรา" },
];

export default function TermsPage() {
  const ready = usePageReady();
  const updatedAt = "22 กุมภาพันธ์ 2569";

  if (!ready) {
    return <TermsPageSkeleton />;
  }

  return (
    <Box className="min-h-screen bg-slate-50">
      <Box aria-hidden className="pointer-events-none fixed inset-0" />

      <Container maxWidth="md" className="relative py-10">
        <Stack spacing={1} className="mb-6">
          <Stack direction="row" className="items-center justify-between gap-3">
            <Stack>
              <Typography className="text-2xl font-extrabold text-slate-900">
                เงื่อนไขการใช้งาน (Terms of Service)
              </Typography>

              <Stack direction="row" className="items-center gap-2">
                <Chip size="small" label={`อัปเดตล่าสุด: ${updatedAt}`} />
                <Typography className="text-xs text-slate-500">
                  ข้อกำหนดสำหรับการใช้บริการ RentFlow
                </Typography>
              </Stack>
            </Stack>

            <Link href="/" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                className="rounded-xl!"
                sx={{
                  borderColor: "rgba(203,213,225,0.9)",
                  color: "rgb(15 23 42)",
                  "&:hover": { borderColor: "rgb(148,163,184)" },
                  textTransform: "none",
                }}
              >
                กลับหน้าแรก
              </Button>
            </Link>
          </Stack>
        </Stack>

        <Card
          elevation={0}
          className="rounded-2xl! border border-slate-200 bg-white"
          sx={{ boxShadow: "0 20px 60px rgba(15,23,42,0.10)" }}
        >
          <CardContent className="p-7">
            <TermsTableOfContents sections={sections} />

            <Divider className="my-6! border-slate-200!" />

            <TermsContent />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
