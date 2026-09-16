"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 px-2 py-1.5 rounded-lg"
        aria-label="Change language"
      >
        {lang === "en" ? "🇬🇧 English" : "🇰🇭 ខ្មែរ"}
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute left-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden z-50 min-w-[140px]">
          <button
            onClick={() => { setLang("en"); setOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 ${lang === "en" ? "font-semibold text-emerald-700" : "text-slate-700"}`}
          >
            🇬🇧 English
          </button>
          <button
            onClick={() => { setLang("km"); setOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 ${lang === "km" ? "font-semibold text-emerald-700" : "text-slate-700"}`}
          >
            🇰🇭 ខ្មែរ
          </button>
        </div>
      )}
    </div>
  );
}
