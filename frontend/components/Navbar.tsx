"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Compass, Bookmark } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getStoredSessionId } from "@/lib/session";
import { api } from "@/lib/api";

export function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [shortlistCount, setShortlistCount] = useState(0);

  useEffect(() => {
    const sessionId = getStoredSessionId();
    if (!sessionId) return;
    api
      .getShortlist(sessionId)
      .then((res) => setShortlistCount(res.university_ids.length))
      .catch(() => setShortlistCount(0));
  }, [pathname]);

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${pathname === href ? "text-emerald-700" : "text-slate-600 hover:text-slate-900"}`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
            <Compass size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">KITEBud</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          <Link href="/explore" className={linkClass("/explore")}>{t("nav.explore")}</Link>
          <Link href="/universities" className={linkClass("/universities")}>{t("nav.universities")}</Link>
          <Link href="/majors" className={linkClass("/majors")}>{t("nav.majors")}</Link>
          <Link href="/scholarships" className={linkClass("/scholarships")}>{t("nav.scholarships")}</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <Link href="/shortlist" className="relative text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5">
            <Bookmark size={17} />
            {t("nav.shortlist")}
            {shortlistCount > 0 && (
              <span className="absolute -top-2 -right-3 w-4 h-4 rounded-full bg-sky-600 text-white text-[10px] flex items-center justify-center">
                {shortlistCount}
              </span>
            )}
          </Link>
          <Link href="/sign-in" className="text-sm font-medium text-slate-600 hover:text-slate-900">{t("common.signIn")}</Link>
          <Link
            href="/assessment"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            {t("nav.findMajor")}
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 px-5 py-4 flex flex-col gap-4 bg-white">
          <Link href="/explore" onClick={() => setOpen(false)} className={linkClass("/explore")}>{t("nav.explore")}</Link>
          <Link href="/universities" onClick={() => setOpen(false)} className={linkClass("/universities")}>{t("nav.universities")}</Link>
          <Link href="/majors" onClick={() => setOpen(false)} className={linkClass("/majors")}>{t("nav.majors")}</Link>
          <Link href="/scholarships" onClick={() => setOpen(false)} className={linkClass("/scholarships")}>{t("nav.scholarships")}</Link>
          <Link href="/shortlist" onClick={() => setOpen(false)} className={linkClass("/shortlist")}>
            {t("nav.shortlist")}{shortlistCount ? ` (${shortlistCount})` : ""}
          </Link>
          <Link href="/sign-in" onClick={() => setOpen(false)} className={linkClass("/sign-in")}>{t("common.signIn")}</Link>
          <LanguageSwitcher />
          <Link
            href="/assessment"
            onClick={() => setOpen(false)}
            className="bg-emerald-600 text-white text-sm font-semibold px-4 py-3 rounded-xl text-center"
          >
            {t("nav.findMajor")}
          </Link>
        </div>
      )}
    </header>
  );
}
