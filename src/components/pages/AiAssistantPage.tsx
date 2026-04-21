"use client";

import * as React from "react";
import { Box, Container } from "@mui/material";

import StorefrontAiAssistantPanel from "@/src/components/ai/StorefrontAiAssistantPanel";

export default function AiAssistantPage() {
  return (
    <Box className="min-h-screen bg-white">
      <Container maxWidth="lg" className="py-8 md:py-12">
        <StorefrontAiAssistantPanel />
      </Container>
    </Box>
  );
}
