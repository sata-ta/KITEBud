"use client";

import React from "react";
import { Lock } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export function PremiumModal({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 mb-4 sm:mb-0" onClick={(e) => e.stopPropagation()}>
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
          <Lock size={22} className="text-amber-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">{t("premium.title")}</h3>
        <p className="text-sm text-slate-600 mb-5">{t("premium.desc")}</p>
        <button onClick={onClose} className="w-full bg-slate-900 text-white rounded-xl py-3 font-semibold text-sm">
          {t("common.gotIt")}
        </button>
      </div>
    </div>
  );
}
