"use client";

import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";

import type { StorefrontBlock } from "@/src/services/storefront/storefront.types";

type Props = {
  blocks?: StorefrontBlock[];
};

export default function StorefrontBlocksSection({ blocks = [] }: Props) {
  const visibleBlocks = blocks.filter((block) => block.title || block.description);
  if (visibleBlocks.length === 0) return null;

  return (
    <Box className="mx-auto grid w-full max-w-[1320px] gap-5 px-6 pb-10 md:grid-cols-2 xl:grid-cols-3">
      {visibleBlocks.map((block, index) => {
        const isCta = block.type === "cta" || block.buttonLabel;
        return (
          <Box
            key={block.id || `${block.type || "block"}-${index}`}
            className="rf-card apple-hover flex min-h-[220px] flex-col justify-between rounded-[34px] bg-white p-8 shadow-[var(--rf-apple-shadow)]"
          >
            <Box>
              {block.subtitle ? (
                <Typography className="mb-3 text-sm font-semibold text-[var(--rf-apple-muted)]">
                  {block.subtitle}
                </Typography>
              ) : null}
              <Typography className="text-3xl font-black tracking-[-0.04em] text-[var(--rf-apple-ink)] md:text-4xl">
                {block.title}
              </Typography>
              {block.description ? (
                <Typography className="mt-4 text-base leading-7 text-[var(--rf-apple-muted)] md:text-lg">
                  {block.description}
                </Typography>
              ) : null}
            </Box>
            {isCta && block.href ? (
              <Button
                component={Link}
                href={block.href}
                className="mt-8 h-12 rounded-full! bg-[var(--rf-apple-blue)]! px-7! text-base! font-bold! text-white!"
              >
                {block.buttonLabel || "ดูเพิ่มเติม"}
              </Button>
            ) : null}
          </Box>
        );
      })}
    </Box>
  );
}
