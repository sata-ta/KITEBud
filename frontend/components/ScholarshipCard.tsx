"use client";

import React from "react";
import { useI18n, localize } from "@/i18n/I18nProvider";
import type { Scholarship, University } from "@/types";

export function ScholarshipCard({ scholarship, university }: { scholarship: Scholarship; university?: University }) {
  const { t, lang } = useI18n();
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-5">
      <h3 className="font-bold text-slate-900">{localize(scholarship.name, lang)}</h3>
      {university && <p className="text-xs text-slate-500 mt-1 mb-3">{localize(university.name, lang)}</p>}
      <p className="text-sm text-slate-600 mb-2">{localize(scholarship.requirement, lang)}</p>
      <div className="flex justify-between text-sm">
        <span className="font-semibold text-emerald-700">{scholarship.coverage_percent}%</span>
        <span className="text-slate-400">{t("explore.deadline")}: {scholarship.deadline}</span>
      </div>
    </div>
  );
}
