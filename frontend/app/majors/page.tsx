"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { MajorCard } from "@/components/MajorCard";
import { api } from "@/lib/api";
import type { Major } from "@/types";

export default function MajorsListPage() {
  const { t } = useI18n();
  const [majors, setMajors] = useState<Major[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMajors().then((res) => setMajors(res.majors)).finally(() => setLoading(false));
  }, []);

  const filtered = majors.filter((m) => m.name.en.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="max-w-5xl mx-auto px-5 py-10 md:py-14">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{t("nav.majors")}</h1>
      <p className="text-slate-500 mb-6">{t("explore.subtitle")}</p>

      <div className="relative mb-7">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("explore.searchPlaceholder", { tab: t("explore.tabMajors").toLowerCase() })}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {loading ? (
        <p className="text-center text-slate-400 py-14">{t("common.loading")}</p>
      ) : filtered.length ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((m) => <MajorCard key={m.id} major={m} />)}
        </div>
      ) : (
        <p className="text-center text-slate-400 py-14 text-sm">{t("explore.noResults", { tab: t("explore.tabMajors").toLowerCase() })}</p>
      )}
    </div>
  );
}
