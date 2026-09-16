"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, ArrowRight } from "lucide-react";
import { useI18n, localize } from "@/i18n/I18nProvider";
import { api } from "@/lib/api";
import { getStoredSessionId } from "@/lib/session";
import type { University } from "@/types";

export default function ShortlistPage() {
  const { t, lang } = useI18n();
  const [universities, setUniversities] = useState<University[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sid = getStoredSessionId();
    setSessionId(sid);
    if (!sid) {
      setLoading(false);
      return;
    }

    async function load() {
      const shortlistRes = await api.getShortlist(sid!);
      const ids = shortlistRes.university_ids;
      if (ids.length === 0) {
        setUniversities([]);
        setLoading(false);
        return;
      }

      let majorId: string | null = null;
      try {
        const rec = await api.getRecommendations(sid!, 1);
        majorId = rec.matches[0]?.major_id || null;
      } catch {
        majorId = null;
      }

      const all = majorId ? await api.getUniversities(sid!, majorId) : await api.getUniversities();
      setUniversities(all.universities.filter((u) => ids.includes(u.id)));
      setLoading(false);
    }
    load();
  }, []);

  const removeFromShortlist = async (universityId: string) => {
    if (!sessionId) return;
    await api.removeFromShortlist(sessionId, universityId);
    setUniversities((prev) => prev.filter((u) => u.id !== universityId));
  };

  if (loading) return <div className="max-w-5xl mx-auto px-5 py-20 text-center text-slate-400">{t("common.loading")}</div>;

  if (universities.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-5 py-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
          <Bookmark size={24} className="text-slate-400" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">{t("shortlist.empty")}</h1>
        <p className="text-slate-500 mb-6 text-sm">{t("shortlist.emptyDesc")}</p>
        <Link href="/universities" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl inline-block">
          {t("shortlist.exploreButton")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-5 py-10 md:py-14">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{t("shortlist.title")}</h1>
      <p className="text-slate-500 mb-8">{t("shortlist.subtitle")}</p>

      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full min-w-[640px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="text-left text-xs font-semibold text-slate-400 pb-3 pr-4">{t("shortlist.colUniversity")}</th>
              <th className="text-left text-xs font-semibold text-slate-400 pb-3 pr-4">{t("shortlist.colTuition")}</th>
              <th className="text-left text-xs font-semibold text-slate-400 pb-3 pr-4">{t("shortlist.colScholarship")}</th>
              <th className="text-left text-xs font-semibold text-slate-400 pb-3 pr-4">{t("shortlist.colLocation")}</th>
              <th className="text-left text-xs font-semibold text-slate-400 pb-3 pr-4">{t("shortlist.colAffordability")}</th>
              <th className="text-left text-xs font-semibold text-slate-400 pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {universities.map((u) => (
              <tr key={u.id} className="bg-white">
                <td className="py-3 pr-4 border-t border-slate-100 font-semibold text-slate-800 text-sm rounded-l-xl pl-3">{localize(u.name, lang)}</td>
                <td className="py-3 pr-4 border-t border-slate-100 text-sm text-slate-600">${u.tuition_per_year.toLocaleString()}{t("universities.perYear")}</td>
                <td className="py-3 pr-4 border-t border-slate-100 text-sm text-slate-600">{t("universities.upTo", { percent: u.scholarship_max_percent })}</td>
                <td className="py-3 pr-4 border-t border-slate-100 text-sm text-slate-600">{t(`assessment.options.location.${u.location}`)}</td>
                <td className="py-3 pr-4 border-t border-slate-100 text-sm">
                  {u.match_info ? (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${u.match_info.fits_budget ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {u.match_info.fits_budget ? t("universities.fitsBudget") : t("universities.aboveBudget")} (${u.match_info.estimated_cost.toLocaleString()})
                    </span>
                  ) : "—"}
                </td>
                <td className="py-3 border-t border-slate-100 text-sm rounded-r-xl pr-3">
                  <button onClick={() => removeFromShortlist(u.id)} className="text-slate-400 hover:text-red-500 text-xs font-semibold">
                    {t("common.remove")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link href="/action-plan" className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3.5 rounded-xl flex items-center gap-2 w-fit">
        {t("shortlist.goToActionPlan")} <ArrowRight size={18} />
      </Link>
    </div>
  );
}
