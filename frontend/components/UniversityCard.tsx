"use client";

import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useI18n, localize } from "@/i18n/I18nProvider";
import type { University } from "@/types";

export function UniversityCard({ university }: { university: University }) {
  const { t, lang } = useI18n();
  return (
    <Link
      href={`/universities/${university.id}`}
      className="text-left bg-white border border-slate-100 rounded-xl p-5 hover:border-emerald-300 transition-colors block"
    >
      <h3 className="font-bold text-slate-900">{localize(university.name, lang)}</h3>
      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 mb-3">
        <MapPin size={12} /> {t(`assessment.options.location.${university.location}`)}
      </p>
      <p className="text-sm text-slate-500">
        ${university.tuition_per_year.toLocaleString()}
        {t("universities.perYear")} · {t("universities.upTo", { percent: university.scholarship_max_percent })}
      </p>
    </Link>
  );
}
