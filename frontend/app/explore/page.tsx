"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useI18n, localize } from "@/i18n/I18nProvider";
import { MajorCard } from "@/components/MajorCard";
import { UniversityCard } from "@/components/UniversityCard";
import { ScholarshipCard } from "@/components/ScholarshipCard";
import { api } from "@/lib/api";
import type { Major, University, Scholarship } from "@/types";

type Tab = "universities" | "majors" | "scholarships";

export default function ExplorePage() {
  const { t, lang } = useI18n();
  const [tab, setTab] = useState<Tab>("universities");
  const [query, setQuery] = useState("");
  const [majors, setMajors] = useState<Major[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getMajors(), api.getUniversities(), api.getScholarships()]).then(([m, u, s]) => {
      setMajors(m.majors);
      setUniversities(u.universities);
      setScholarships(s.scholarships);
      setLoading(false);
    });
  }, []);

  const uniById = Object.fromEntries(universities.map((u) => [u.id, u]));
  const q = query.toLowerCase();
  const filteredUnis = universities.filter((u) => localize(u.name, lang).toLowerCase().includes(q) || t(`assessment.options.location.${u.location}`).toLowerCase().includes(q));
  const filteredMajors = majors.filter((m) => localize(m.name, lang).toLowerCase().includes(q));
  const filteredScholarships = scholarships.filter((s) => localize(s.name, lang).toLowerCase().includes(q));

  const tabs: { key: Tab; label: string }[] = [
    { key: "universities", label: t("explore.tabUniversities") },
    { key: "majors", label: t("explore.tabMajors") },
    { key: "scholarships", label: t("explore.tabScholarships") },
  ];

  return (
    <div className="max-w-5xl mx-auto px-5 py-10 md:py-14">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{t("explore.title")}</h1>
      <p className="text-slate-500 mb-6">{t("explore.subtitle")}</p>

      <div className="flex gap-2 mb-5 border-b border-slate-100">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${tab === key ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative mb-7">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("explore.searchPlaceholder", { tab: tabs.find((x) => x.key === tab)!.label.toLowerCase() })}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {loading ? (
        <p className="text-center text-slate-400 py-14">{t("common.loading")}</p>
      ) : (
        <>
          {tab === "universities" && (
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredUnis.length ? filteredUnis.map((u) => <UniversityCard key={u.id} university={u} />) : (
                <p className="col-span-full text-center py-14 text-slate-400 text-sm">{t("explore.noResults", { tab: tabs[0].label.toLowerCase() })}</p>
              )}
            </div>
          )}
          {tab === "majors" && (
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredMajors.length ? filteredMajors.map((m) => <MajorCard key={m.id} major={m} />) : (
                <p className="col-span-full text-center py-14 text-slate-400 text-sm">{t("explore.noResults", { tab: tabs[1].label.toLowerCase() })}</p>
              )}
            </div>
          )}
          {tab === "scholarships" && (
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredScholarships.length ? filteredScholarships.map((s) => <ScholarshipCard key={s.id} scholarship={s} university={uniById[s.university_id]} />) : (
                <p className="col-span-full text-center py-14 text-slate-400 text-sm">{t("explore.noResults", { tab: tabs[2].label.toLowerCase() })}</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
