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
import PrivacyTableOfContents from "@/src/components/privacy/PrivacyTableOfContents";
import PrivacyContent from "@/src/components/privacy/PrivacyContent";

const sections = [
  { id: "overview", title: "1) ภาพรวม" },
  { id: "collect", title: "2) ข้อมูลที่เราเก็บ" },
  { id: "use", title: "3) วัตถุประสงค์การใช้ข้อมูล" },
  { id: "share", title: "4) การเปิดเผยข้อมูล" },
  { id: "cookies", title: "5) คุกกี้และการติดตาม" },
  { id: "security", title: "6) ความปลอดภัย" },
  { id: "rights", title: "7) สิทธิของเจ้าของข้อมูล" },
  { id: "retain", title: "8) ระยะเวลาการเก็บรักษา" },
  { id: "contact", title: "9) ติดต่อเรา" },
];

export default function PrivacyPage() {
  const updatedAt = "22 กุมภาพันธ์ 2569";

  return (
    <Box className="min-h-screen">
      <Box aria-hidden className="pointer-events-none fixed inset-0" />

      <Container maxWidth="md" className="relative py-10">
        <Stack spacing={1} className="mb-6">
          <Stack direction="row" className="items-center justify-between gap-3">
            <Stack>
              <Typography className="text-2xl font-extrabold text-slate-900">
                นโยบายความเป็นส่วนตัว (Privacy Policy)
              </Typography>

              <Stack direction="row" className="items-center gap-2">
                <Chip size="small" label={`อัปเดตล่าสุด: ${updatedAt}`} />
                <Typography className="text-xs text-slate-500">
                  ตัวอย่างเอกสาร Privacy สำหรับเว็บจองรถ — ปรับตามข้อมูลจริงและ PDPA ได้
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
            <PrivacyTableOfContents sections={sections} />

            <Divider className="my-6! border-slate-200!" />

            <PrivacyContent />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}