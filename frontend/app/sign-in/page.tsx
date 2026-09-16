"use client";

import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export default function SignInPage() {
  const { t } = useI18n();
  return (
    <div className="max-w-sm mx-auto px-5 py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
        <Lock size={22} className="text-slate-400" />
      </div>
      <h1 className="text-xl font-bold text-slate-900 mb-2">{t("signIn.title")}</h1>
      <p className="text-slate-500 mb-6 text-sm">{t("signIn.desc")}</p>
      <Link href="/" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl inline-block">
        {t("signIn.backHome")}
      </Link>
    </div>
  );
}
