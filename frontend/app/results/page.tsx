"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, ArrowRight } from "lucide-react";
import { useI18n, localize } from "@/i18n/I18nProvider";
import { MatchBadge } from "@/components/MatchBadge";
import { api } from "@/lib/api";
import { getStoredSessionId } from "@/lib/session";
import { buildMajorReasons } from "@/lib/reasons";
import type { Major, MajorMatch } from "@/types";

export default function ResultsPage() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [matches, setMatches] = useState<MajorMatch[]>([]);
  const [majorsById, setMajorsById] = useState<Record<string, Major>>({});

  useEffect(() => {
    const sessionId = getStoredSessionId();
    if (!sessionId) {
      router.push("/assessment");
      return;
    }
    Promise.all([api.getRecommendations(sessionId, 3), api.getMajors()])
      .then(([rec, allMajors]) => {
        setMatches(rec.matches);
        setMajorsById(Object.fromEntries(allMajors.majors.map((m) => [m.id, m])));
      })
      .catch(() => {
        setError(t("errors.incompleteAssessment"));
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className="max-w-4xl mx-auto px-5 py-20 text-center text-slate-400">{t("common.loading")}</div>;
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto px-5 py-20 text-center">
        <p className="text-slate-600 mb-5">{error}</p>
        <Link href="/assessment" className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl inline-block">
          {t("assessment.continue")}
        </Link>
      </div>
    );
  }

  const topMajorId = matches[0]?.major_id;

  return (
    <div className="max-w-4xl mx-auto px-5 py-10 md:py-14">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{t("results.title")}</h1>
      <p className="text-slate-500 mb-10">{t("results.subtitle")}</p>

      <h2 className="text-lg font-bold text-slate-900 mb-5">{t("results.topMajorsTitle")}</h2>
      <div className="flex flex-col gap-5">
        {matches.map((m, idx) => {
          const major = majorsById[m.major_id];
          if (!major) return null;
          const reasons = buildMajorReasons(m, major.career, t);
          return (
            <div key={m.major_id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400">#{idx + 1} match</span>
                  <h3 className="text-xl font-bold text-slate-900">{localize(major.name, lang)}</h3>
                  <p className="text-sm text-slate-500">{localize(major.tagline, lang)}</p>
                </div>
                <MatchBadge percent={m.match} />
              </div>

              <div className="bg-emerald-50 rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold text-emerald-800 mb-2">{t("results.whyMatches")}</p>
                <ul className="space-y-1.5">
                  {reasons.map((r) => (
                    <li key={r} className="text-sm text-emerald-900 flex items-start gap-2">
                      <Check size={15} className="mt-0.5 shrink-0" /> {r}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs font-semibold text-slate-500 mb-2">{t("results.possibleCareers")}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {major.careers.map((c) => (
                  <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{c}</span>
                ))}
              </div>

              <Link href={`/majors/${major.id}`} className="text-sm font-semibold text-emerald-700 flex items-center gap-1">
                {t("common.exploreMajor")} <ChevronRight size={16} />
              </Link>
            </div>
          );
        })}
      </div>

      {topMajorId && (
        <div className="mt-10 bg-slate-900 rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-white font-bold text-lg">{t("results.readyTitle")}</p>
            <p className="text-slate-300 text-sm">{t("results.readyDesc")}</p>
          </div>
          <Link
            href={`/universities?major=${topMajorId}`}
            className="bg-white text-slate-900 font-semibold px-5 py-3 rounded-xl flex items-center gap-2 whitespace-nowrap"
          >
            {t("results.findUniversities")} <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
