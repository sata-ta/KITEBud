"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import en from "./locales/en.json";
import km from "./locales/km.json";

export type Lang = "en" | "km";

const DICTIONARIES: Record<Lang, any> = { en, km };
const STORAGE_KEY = "kitebud_lang";

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function lookup(dict: any, key: string): unknown {
  return key.split(".").reduce((acc, part) => (acc && typeof acc === "object" ? (acc as any)[part] : undefined), dict);
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return Object.entries(params).reduce(
    (str, [k, v]) => str.replaceAll(`{{${k}}}`, String(v)),
    template
  );
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (window.localStorage.getItem(STORAGE_KEY) as Lang | null) : null;
    if (stored === "en" || stored === "km") setLangState(stored);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const value = lookup(DICTIONARIES[lang], key);
      if (typeof value === "string") return interpolate(value, params);
      // Graceful fallback to English, then to the raw key so missing
      // translations are visible during development rather than silently blank.
      const fallback = lookup(DICTIONARIES.en, key);
      if (typeof fallback === "string") return interpolate(fallback, params);
      return key;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}

/** Resolve a bilingual { en, km } field from the API in the active language, falling back to English. */
export function localize(field: { en: string; km?: string } | undefined, lang: Lang): string {
  if (!field) return "";
  if (lang === "km" && field.km) return field.km;
  return field.en;
}
