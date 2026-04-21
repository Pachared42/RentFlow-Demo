"use client";

import {
  Alert,
  Box,
  Container,
  Typography,
  Chip,
} from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import ContactInfoCard from "@/src/components/contact/ContactInfoCard";
import ContactFormCard from "@/src/components/contact/ContactFormCard";
import ContactPageSkeleton from "@/src/components/contact/ContactPageSkeleton";
import { useBranchDirectory } from "@/src/hooks/branches/useBranchDirectory";

export default function ContactPage() {
  const { branches, loading, error } = useBranchDirectory();
  const phoneReadyCount = branches.filter((branch) => branch.phone).length;

  if (loading) {
    return <ContactPageSkeleton />;
  }

  return (
    <Container maxWidth="lg" className="py-12">
      <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Box className="flex flex-col gap-2">
          <Typography
            variant="h5"
            className="text-2xl font-bold text-slate-900"
          >
            ติดต่อเรา
          </Typography>
          <Typography className="text-sm text-slate-600">
            เลือกช่องทางที่สะดวกสำหรับติดต่อทีมงาน
          </Typography>
        </Box>
      </Box>

      <Box className="mt-2 flex flex-wrap gap-4">
        <Chip
          icon={
            <SupportAgentRoundedIcon
              fontSize="small"
              className="text-emerald-500! ml-2!"
            />
          }
          label={`${branches.length} สาขาในระบบ`}
          variant="outlined"
          className="bg-slate-900/5! text-slate-700!"
        />
        <Chip
          icon={
            <AccessTimeRoundedIcon
              fontSize="small"
              className="text-emerald-500! ml-2!"
            />
          }
          label={`${phoneReadyCount} เบอร์โทรพร้อมติดต่อ`}
          variant="outlined"
          className="bg-slate-900/5! text-slate-700!"
        />
        <Chip
          icon={
            <LocalOfferRoundedIcon
              fontSize="small"
              className="text-emerald-500! ml-2!"
            />
          }
          label="แนบรหัสการจองจะช่วยให้ตรวจสอบได้เร็วขึ้น"
          variant="outlined"
          className="bg-slate-900/5! text-slate-700!"
        />
      </Box>

      {error ? (
        <Alert severity="warning" className="mt-6 rounded-2xl!">
          {error}
        </Alert>
      ) : null}

      <Box className="mt-6 grid gap-4 lg:grid-cols-12">
        <Box className="lg:col-span-5">
          <ContactInfoCard branches={branches} />
        </Box>

        <Box className="lg:col-span-7">
          <ContactFormCard />
        </Box>
      </Box>
    </Container>
  );
}
