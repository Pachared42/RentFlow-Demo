import { Stack, Typography } from "@mui/material";

type Section = {
  id: string;
  title: string;
};

export default function PrivacyTableOfContents({
  sections,
}: {
  sections: Section[];
}) {
  return (
    <>
      <Typography className="text-sm font-bold text-slate-900">
        สารบัญ
      </Typography>

      <Stack className="mt-3 grid gap-2 sm:grid-cols-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:border-slate-300 hover:bg-slate-50"
          >
            {section.title}
          </a>
        ))}
      </Stack>
    </>
  );
}
