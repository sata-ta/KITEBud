"use client";

import React from "react";
import Link from "next/link";
import { useI18n, localize } from "@/i18n/I18nProvider";
import type { Major } from "@/types";

export function MajorCard({ major }: { major: Major }) {
  const { lang } = useI18n();
  return (
    <Link
      href={`/majors/${major.id}`}
      className="text-left bg-white border border-slate-100 rounded-xl p-5 hover:border-emerald-300 transition-colors block"
    >
      <h3 className="font-bold text-slate-900">{localize(major.name, lang)}</h3>
      <p className="text-sm text-slate-500 mt-1">{localize(major.tagline, lang)}</p>
    </Link>
  );
}
