"use client";

import * as React from "react";
import Link from "next/link";
import {
    Box,
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    MenuItem,
    Chip,
    Divider,
    Button,
    Card,
    CardContent,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

import { FAQ, CATEGORIES, type FAQCategory, type FAQItem } from "@/constants/faq";

/** ===== Helpers: highlight ===== */
function escapeRegExp(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightText({
    text,
    query,
    className,
}: {
    text: string;
    query: string;
    className?: string;
}) {
    const q = query.trim();
    if (!q) return <span className={className}>{text}</span>;

    // split query into tokens (รองรับไทยแบบง่าย: แยกตามช่องว่าง + เอาทั้งคำ)
    const tokens = q
        .split(/\s+/)
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 5);

    if (!tokens.length) return <span className={className}>{text}</span>;

    const pattern = new RegExp(`(${tokens.map(escapeRegExp).join("|")})`, "gi");
    const parts = text.split(pattern);

    return (
        <span className={className}>
            {parts.map((p, i) => {
                const isHit = tokens.some((t) => p.toLowerCase() === t.toLowerCase());
                return isHit ? (
                    <mark
                        key={i}
                        className="rounded bg-amber-200/60 px-1 py-0.5 text-slate-900"
                    >
                        {p}
                    </mark>
                ) : (
                    <span key={i}>{p}</span>
                );
            })}
        </span>
    );
}

/** ===== Helpers: semantic-ish search for Thai (character n-gram cosine) ===== */
function normalize(s: string) {
    return s.toLowerCase().trim();
}

function charNgrams(s: string, n = 3) {
    const t = normalize(s).replace(/\s+/g, " ");
    const grams: string[] = [];
    if (t.length < n) return grams;
    for (let i = 0; i <= t.length - n; i++) grams.push(t.slice(i, i + n));
    return grams;
}

function vecFromNgrams(grams: string[]) {
    const m = new Map<string, number>();
    for (const g of grams) m.set(g, (m.get(g) ?? 0) + 1);
    return m;
}

function cosine(a: Map<string, number>, b: Map<string, number>) {
    let dot = 0;
    let na = 0;
    let nb = 0;

    for (const [, v] of a) na += v * v;
    for (const [, v] of b) nb += v * v;

    // dot
    for (const [k, va] of a) {
        const vb = b.get(k);
        if (vb) dot += va * vb;
    }

    if (na === 0 || nb === 0) return 0;
    return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

function scoreFAQ(item: FAQItem, q: string) {
    const query = normalize(q);
    if (!query) return 0;

    // keyword score
    const hay = normalize([item.q, item.a, item.category, ...(item.tags ?? [])].join(" "));
    let kw = 0;
    if (hay.includes(query)) kw += 0.65;

    // semantic-ish score via char n-gram
    const qVec = vecFromNgrams(charNgrams(query, 3));
    const iVec = vecFromNgrams(charNgrams(hay, 3));
    const sem = cosine(qVec, iVec); // 0..1

    // boost if match in question/title
    const qTitle = normalize(item.q);
    const titleVec = vecFromNgrams(charNgrams(qTitle, 3));
    const semTitle = cosine(qVec, titleVec);

    return Math.max(kw, sem * 0.8, semTitle * 0.95);
}

export default function HelpPage() {
    const [q, setQ] = React.useState("");
    const [category, setCategory] = React.useState<FAQCategory | "ทั้งหมด">("ทั้งหมด");

    // chatbot
    const [botQ, setBotQ] = React.useState("");
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const countsByCategory = React.useMemo(() => {
        const map = new Map<string, number>();
        FAQ.forEach((x) => map.set(x.category, (map.get(x.category) ?? 0) + 1));
        return map;
    }, []);

    const filtered = React.useMemo(() => {
        const query = normalize(q);

        let items = FAQ.filter((x) => (category === "ทั้งหมด" ? true : x.category === category));

        if (!query) return items;

        // semantic-ish ranking
        const ranked = items
            .map((it) => ({ it, s: scoreFAQ(it, query) }))
            .filter((x) => x.s > 0.08) // threshold กันหลวม ๆ
            .sort((a, b) => b.s - a.s)
            .map((x) => x.it);

        // fallback: ถ้าคะแนนไม่ถึง threshold เลย ให้ fallback keyword
        if (!ranked.length) {
            return items.filter((x) => {
                const hay = normalize([x.q, x.a, x.category, ...(x.tags ?? [])].join(" "));
                return hay.includes(query);
            });
        }

        return ranked;
    }, [q, category]);

    const botSuggestions = React.useMemo(() => {
        const query = normalize(botQ);
        if (!query) return [];
        return FAQ
            .map((it) => ({ it, s: scoreFAQ(it, query) }))
            .sort((a, b) => b.s - a.s)
            .slice(0, 3);
    }, [botQ]);

    return (
        <Container maxWidth="lg" className="py-12">
            <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Box className="flex flex-col gap-2">
                    <Typography variant="h5" className="text-2xl font-bold text-slate-900">ช่วยเหลือ & FAQ</Typography>
                    <Typography className="text-sm text-slate-600">
                        รวมคำถามที่พบบ่อยเกี่ยวกับการเช่ารถ การจอง การรับ-คืนรถ และเงื่อนไขสำคัญ
                    </Typography>
                </Box>

                <Button
                    component={Link}
                    href="/"
                    variant="outlined"
                    className="rounded-xl! border-slate-300! text-slate-900!"
                    sx={{ textTransform: "none" }}
                >
                    กลับหน้าแรก
                </Button>
            </Box>

            {/* Chatbot */}
            <Box className="mt-6">
                <Card elevation={0} className="rounded-2xl! border border-slate-200 bg-white">
                    <CardContent className="p-6">
                        <Box className="flex items-center gap-2">
                            <Box className="grid h-10 w-10 place-items-center rounded-xl! border border-slate-200 bg-slate-50">
                                <SmartToyRoundedIcon fontSize="small" />
                            </Box>
                            <Box>
                                <Typography className="text-sm font-semibold text-slate-900">ถามบอท (แนะนำคำตอบอัตโนมัติ)</Typography>
                                <Typography className="text-xs text-slate-500">
                                    ลองพิมพ์: “คืนช้า”, “เติมน้ำมัน”, “สัตว์เลี้ยง”, “มัดจำ”, “ยกเลิก”
                                </Typography>
                            </Box>
                        </Box>

                        <Box className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
                            <TextField
                                value={botQ}
                                onChange={(e) => setBotQ(e.target.value)}
                                placeholder="พิมพ์คำถามของคุณ…"
                                size="small"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <Box className="mr-2 text-slate-500">
                                            <SearchRoundedIcon fontSize="small" />
                                        </Box>
                                    ),
                                }}
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                            />
                            <Button
                                variant="outlined"
                                size="small"
                                className="rounded-xl! px-4!"
                                sx={{ textTransform: "none", minWidth: "auto" }}
                                onClick={() => setBotQ("")}
                                startIcon={<RestartAltRoundedIcon />}
                            >
                                ล้าง
                            </Button>
                        </Box>

                        {botQ.trim() ? (
                            <Box className="mt-4">
                                <Typography className="text-xs font-semibold text-slate-700">คำตอบที่น่าจะใช่</Typography>
                                <Box className="mt-2 grid gap-2 md:grid-cols-3">
                                    {botSuggestions.map(({ it, s }) => (
                                        <Button
                                            key={it.id}
                                            variant="outlined"
                                            className="rounded-xl! justify-start text-left!"
                                            sx={{ textTransform: "none" }}
                                            onClick={() => {
                                                setExpanded(it.id);
                                                setCategory("ทั้งหมด");
                                                setQ(it.q);
                                                setTimeout(() => {
                                                    const el = document.getElementById(`faq-${it.id}`);
                                                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                                                }, 50);
                                            }}
                                        >
                                            <Box className="flex flex-col items-start gap-1">
                                                <Typography className="text-xs text-slate-500">
                                                    {it.category} • {Math.round(s * 100)}%
                                                </Typography>
                                                <Typography className="text-sm font-semibold text-slate-900">
                                                    {it.q}
                                                </Typography>
                                            </Box>
                                        </Button>
                                    ))}
                                </Box>
                            </Box>
                        ) : null}
                    </CardContent>
                </Card>
            </Box>

            {/* Search + Filter */}
            <Box className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                <Box className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                    <TextField
                        label="ค้นหาคำถาม (พิมพ์คำสำคัญ)"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        size="small"
                        fullWidth
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                    />

                    <TextField
                        select
                        label="หมวดหมู่"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        size="small"
                        fullWidth
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                    >
                        {CATEGORIES.map((c) => (
                            <MenuItem key={c} value={c}>
                                {c === "ทั้งหมด" ? "ทั้งหมด" : `${c} (${countsByCategory.get(c) ?? 0})`}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box className="flex items-end justify-end">
                        <Button
                            variant="outlined"
                            size="small"
                            className="rounded-xl! px-3! py-2!"
                            sx={{ textTransform: "none", minWidth: "auto" }}
                            startIcon={<RestartAltRoundedIcon />}
                            onClick={() => {
                                setQ("");
                                setCategory("ทั้งหมด");
                                setExpanded(false);
                            }}
                        >
                            รีเซ็ต
                        </Button>
                    </Box>
                </Box>

                <Divider className="my-5! border-slate-200!" />

                <Box className="flex flex-wrap items-center gap-2">
                    <Chip
                        size="small"
                        label={`พบ ${filtered.length} รายการ`}
                        variant="outlined"
                        className="border! border-slate-200! bg-slate-900/5! text-slate-700!"
                    />
                    <Typography className="text-xs text-slate-500">
                        ระบบค้นหาแบบ “ใกล้เคียงความหมาย” รองรับภาษาไทย (พิมพ์คำใกล้เคียงก็หาเจอ)
                    </Typography>
                </Box>
            </Box>

            {/* FAQ list */}
            <Box className="mt-6 space-y-2">
                {filtered.length === 0 ? (
                    <Box className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
                        <Typography className="text-sm font-semibold text-slate-900">ไม่พบคำถามที่ตรงกับคำค้นหา</Typography>
                        <Typography className="mt-1 text-sm text-slate-600">ลองเปลี่ยนคำค้น หรือเปลี่ยนหมวดหมู่</Typography>
                    </Box>
                ) : (
                    filtered.map((x) => (
                        <Accordion
                            id={`faq-${x.id}`}
                            key={x.id}
                            expanded={expanded === x.id}
                            onChange={(_, isExpanded) => setExpanded(isExpanded ? x.id : false)}
                            elevation={0}
                            disableGutters
                            className="rounded-2xl! border border-slate-200! bg-white!"
                            sx={{ "&:before": { display: "none" } }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                                <Box className="flex flex-col gap-1">
                                    <Box className="flex flex-wrap items-center gap-2">
                                        <Chip
                                            size="small"
                                            label={x.category}
                                            variant="outlined"
                                            className="border! border-slate-200! bg-slate-900/5! text-slate-700!"
                                        />
                                        <Typography className="text-sm font-semibold text-slate-900">
                                            <HighlightText text={x.q} query={q} />
                                        </Typography>
                                    </Box>

                                    {x.tags?.length ? (
                                        <Typography className="text-xs text-slate-500">
                                            แท็ก: <HighlightText text={x.tags.join(", ")} query={q} />
                                        </Typography>
                                    ) : null}
                                </Box>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Typography className="text-sm text-slate-600 leading-relaxed">
                                    <HighlightText text={x.a} query={q} />
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
                )}
            </Box>

            {/* CTA */}
            <Box className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <Typography className="text-sm font-semibold text-slate-900">ยังต้องการความช่วยเหลือ?</Typography>
                <Typography className="mt-1 text-sm text-slate-600">
                    ไปที่หน้า “ติดต่อเรา” เพื่อส่งข้อความหาเรา พร้อมรายละเอียด (วันรับ-คืนรถ/รหัสการจองถ้ามี) เพื่อให้ช่วยได้เร็วขึ้น
                </Typography>

                <Box className="mt-4 flex flex-wrap gap-2">
                    <Button
                        component={Link}
                        href="/contact"
                        variant="contained"
                        className="rounded-xl! font-semibold!"
                        sx={{ textTransform: "none", backgroundColor: "rgb(15 23 42)" }}
                    >
                        ติดต่อเรา
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}