"use client";

import React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-slate-100 bg-slate-50 mt-16">
      <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
            <Compass size={15} className="text-white" />
          </div>
          <span className="font-bold text-slate-900">KITEBud</span>
        </div>
        <div className="flex gap-6 text-sm text-slate-500">
          <Link href="/explore" className="hover:text-slate-800">{t("nav.explore")}</Link>
          <Link href="/universities" className="hover:text-slate-800">{t("nav.universities")}</Link>
          <Link href="/majors" className="hover:text-slate-800">{t("nav.majors")}</Link>
          <Link href="/scholarships" className="hover:text-slate-800">{t("nav.scholarships")}</Link>
        </div>
      </div>
      <div className="text-center text-xs text-slate-400 pb-6">
        KITEBud MVP · All university and scholarship data is sample data for demonstration only.
      </div>
    </footer>
  );
}
