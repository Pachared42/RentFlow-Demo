"use client";

import * as React from "react";
import { FAQ, type FAQCategory, type FAQItem } from "@/src/constants/faq";
import { normalize, scoreFAQ } from "@/src/components/help/HelpSearchUtils";

export default function useHelpPage() {
  const [q, setQ] = React.useState("");
  const [category, setCategory] = React.useState<FAQCategory | "ทั้งหมด">(
    "ทั้งหมด"
  );
  const [botQ, setBotQ] = React.useState("");
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const countsByCategory = React.useMemo(() => {
    const map = new Map<string, number>();
    FAQ.forEach((x) => map.set(x.category, (map.get(x.category) ?? 0) + 1));
    return map;
  }, []);

  const filtered = React.useMemo(() => {
    const query = normalize(q);

    let items = FAQ.filter((x) =>
      category === "ทั้งหมด" ? true : x.category === category
    );

    if (!query) return items;

    const ranked = items
      .map((it) => ({ it, s: scoreFAQ(it, query) }))
      .filter((x) => x.s > 0.08)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.it);

    if (!ranked.length) {
      return items.filter((x) => {
        const hay = normalize(
          [x.q, x.a, x.category, ...(x.tags ?? [])].join(" ")
        );
        return hay.includes(query);
      });
    }

    return ranked;
  }, [q, category]);

  const botSuggestions = React.useMemo(() => {
    const query = normalize(botQ);
    if (!query) return [];

    return FAQ.map((it) => ({ it, s: scoreFAQ(it, query) }))
      .sort((a, b) => b.s - a.s)
      .slice(0, 3);
  }, [botQ]);

  const handleSelectSuggestion = React.useCallback((item: FAQItem) => {
    setExpanded(item.id);
    setCategory("ทั้งหมด");
    setQ(item.q);

    setTimeout(() => {
      const el = document.getElementById(`faq-${item.id}`);
      el?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }, []);

  const handleReset = React.useCallback(() => {
    setQ("");
    setCategory("ทั้งหมด");
    setExpanded(false);
  }, []);

  return {
    q,
    setQ,
    category,
    setCategory,
    botQ,
    setBotQ,
    expanded,
    setExpanded,
    countsByCategory,
    filtered,
    botSuggestions,
    handleSelectSuggestion,
    handleReset,
  };
}
