"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useI18n, localize } from "@/i18n/I18nProvider";
import { ScholarshipCard } from "@/components/ScholarshipCard";
import { api } from "@/lib/api";
import type { Scholarship, University } from "@/types";

export default function ScholarshipsListPage() {
  const { t, lang } = useI18n();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getScholarships(), api.getUniversities()]).then(([sch, uni]) => {
      setScholarships(sch.scholarships);
      setUniversities(uni.universities);
      setLoading(false);
    });
  }, []);

  const uniById = Object.fromEntries(universities.map((u) => [u.id, u]));
  const filtered = scholarships.filter((s) => localize(s.name, lang).toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="max-w-5xl mx-auto px-5 py-10 md:py-14">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{t("nav.scholarships")}</h1>
      <p className="text-slate-500 mb-6">{t("explore.subtitle")}</p>

      <div className="relative mb-7">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("explore.searchPlaceholder", { tab: t("explore.tabScholarships").toLowerCase() })}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {loading ? (
        <p className="text-center text-slate-400 py-14">{t("common.loading")}</p>
      ) : filtered.length ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((s) => <ScholarshipCard key={s.id} scholarship={s} university={uniById[s.university_id]} />)}
        </div>
      ) : (
        <p className="text-center text-slate-400 py-14 text-sm">{t("explore.noResults", { tab: t("explore.tabScholarships").toLowerCase() })}</p>
      )}
    </div>
  );
}
