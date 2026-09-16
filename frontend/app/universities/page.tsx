"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MapPin, Bookmark, Calculator } from "lucide-react";
import { useI18n, localize } from "@/i18n/I18nProvider";
import { MatchBadge } from "@/components/MatchBadge";
import { UniversityCard } from "@/components/UniversityCard";
import { api } from "@/lib/api";
import { getStoredSessionId } from "@/lib/session";
import type { University, Major } from "@/types";

export default function UniversitiesPage() {
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto px-5 py-20 text-center text-slate-400">Loading...</div>}>
      <UniversitiesPageInner />
    </Suspense>
  );
}

function UniversitiesPageInner() {
  const { t, lang } = useI18n();
  const searchParams = useSearchParams();
  const majorParam = searchParams.get("major");

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [majorId, setMajorId] = useState<string | null>(majorParam);
  const [topMajor, setTopMajor] = useState<Major | null>(null);
  const [universities, setUniversities] = useState<University[]>([]);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sid = getStoredSessionId();
    setSessionId(sid);

    async function load() {
      let resolvedMajorId = majorParam;

      if (sid) {
        api.getShortlist(sid).then((r) => setShortlist(r.university_ids)).catch(() => {});
        if (!resolvedMajorId) {
          try {
            const rec = await api.getRecommendations(sid, 1);
            resolvedMajorId = rec.matches[0]?.major_id || null;
          } catch {
            resolvedMajorId = null;
          }
        }
      }

      setMajorId(resolvedMajorId);

      if (resolvedMajorId) {
        const major = await api.getMajor(resolvedMajorId).catch(() => null);
        setTopMajor(major);
      }

      const res = sid && resolvedMajorId
        ? await api.getUniversities(sid, resolvedMajorId)
        : await api.getUniversities();
      setUniversities(res.universities);
      setLoading(false);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [majorParam]);

  const toggleShortlist = async (universityId: string) => {
    if (!sessionId) return;
    const isSaved = shortlist.includes(universityId);
    const res = isSaved ? await api.removeFromShortlist(sessionId, universityId) : await api.addToShortlist(sessionId, universityId);
    setShortlist(res.university_ids);
  };

  if (loading) return <div className="max-w-5xl mx-auto px-5 py-20 text-center text-slate-400">{t("common.loading")}</div>;

  const personalized = Boolean(sessionId && majorId && topMajor);

  return (
    <div className="max-w-5xl mx-auto px-5 py-10 md:py-14">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
        {personalized ? t("universities.title") : t("nav.universities")}
      </h1>
      <p className="text-slate-500 mb-8">
        {personalized ? t("universities.subtitle", { major: localize(topMajor!.name, lang) }) : t("explore.subtitle")}
      </p>

      {!personalized && (
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-8 text-sm text-slate-600 flex items-center justify-between gap-4 flex-wrap">
          <span>{t("errors.incompleteAssessment")}</span>
          <Link href="/assessment" className="text-emerald-700 font-semibold whitespace-nowrap">{t("nav.findMajor")}</Link>
        </div>
      )}

      {personalized ? (
        <div className="grid md:grid-cols-2 gap-5">
          {universities.map((uni) => {
            const info = uni.match_info!;
            const saved = shortlist.includes(uni.id);
            return (
              <div key={uni.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{localize(uni.name, lang)}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin size={12} /> {t(`assessment.options.location.${uni.location}`)}
                    </p>
                  </div>
                  <MatchBadge percent={info.match} />
                </div>

                {info.offers_major && (
                  <span className="inline-block text-xs bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full mb-3">
                    {t("universities.offers", { major: localize(topMajor!.name, lang) })}
                  </span>
                )}

                <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-0.5">{t("universities.tuition")}</p>
                    <p className="font-semibold text-slate-800">${uni.tuition_per_year.toLocaleString()}{t("universities.perYear")}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-0.5">{t("universities.scholarship")}</p>
                    <p className="font-semibold text-slate-800">{t("universities.upTo", { percent: uni.scholarship_max_percent })}</p>
                  </div>
                </div>

                <div className={`flex items-center gap-2 rounded-lg px-3 py-2.5 mb-4 text-sm font-medium ${info.fits_budget ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                  <Calculator size={15} />
                  {t("universities.estimatedCost", {
                    amount: `$${info.estimated_cost.toLocaleString()}`,
                    status: info.fits_budget ? t("universities.fitsBudget") : t("universities.aboveBudget"),
                  })}
                </div>

                <div className="flex gap-3">
                  <Link href={`/universities/${uni.id}${majorId ? `?major=${majorId}` : ""}`} className="flex-1 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold py-2.5 rounded-xl text-sm text-center">
                    {t("common.viewUniversity")}
                  </Link>
                  <button
                    onClick={() => toggleShortlist(uni.id)}
                    className={`flex-1 font-semibold py-2.5 rounded-xl text-sm flex items-center justify-center gap-1.5 ${saved ? "bg-slate-900 text-white" : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}
                  >
                    <Bookmark size={14} fill={saved ? "white" : "none"} /> {saved ? t("common.shortlisted") : t("common.addToShortlist")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {universities.map((u) => <UniversityCard key={u.id} university={u} />)}
        </div>
      )}
    </div>
  );
}
