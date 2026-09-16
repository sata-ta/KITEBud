"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Check, Briefcase, ArrowRight, MapPin } from "lucide-react";
import { useI18n, localize } from "@/i18n/I18nProvider";
import { MatchBadge } from "@/components/MatchBadge";
import { api } from "@/lib/api";
import { getStoredSessionId } from "@/lib/session";
import { buildMajorReasons } from "@/lib/reasons";
import type { Major, MajorMatch, University } from "@/types";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h2 className="text-base font-bold text-slate-900 mb-3">{title}</h2>
      {children}
    </div>
  );
}

export default function MajorDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { t, lang } = useI18n();
  const [major, setMajor] = useState<Major | null>(null);
  const [match, setMatch] = useState<MajorMatch | null>(null);
  const [relatedUnis, setRelatedUnis] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const majorId = params.id;
    const sessionId = getStoredSessionId();

    const loadMatch = sessionId
      ? api.getRecommendations(sessionId, 10).then((r) => r.matches.find((m) => m.major_id === majorId) || null).catch(() => null)
      : Promise.resolve(null);

    Promise.all([api.getMajor(majorId), loadMatch, api.getUniversities()])
      .then(([m, matchResult, unis]) => {
        setMajor(m);
        setMatch(matchResult);
        setRelatedUnis(unis.universities.filter((u) => u.majors.includes(majorId)).slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="max-w-3xl mx-auto px-5 py-20 text-center text-slate-400">{t("common.loading")}</div>;
  if (!major) return <div className="max-w-3xl mx-auto px-5 py-20 text-center text-slate-500">{t("errors.notFound")}</div>;

  const reasons = match ? buildMajorReasons(match, major.career, t) : null;

  return (
    <div className="max-w-3xl mx-auto px-5 py-10 md:py-14">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-6">
        <ChevronLeft size={16} /> {t("majorDetail.backToResults")}
      </button>

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">{localize(major.name, lang)}</h1>
          <p className="text-slate-500 mt-1">{localize(major.tagline, lang)}</p>
        </div>
        {match && <MatchBadge percent={match.match} size="lg" />}
      </div>

      <Section title={t("majorDetail.whatIs", { name: localize(major.name, lang) })}>
        <p className="text-slate-600 leading-relaxed">{localize(major.description, lang)}</p>
      </Section>

      {reasons && (
        <Section title={t("majorDetail.whyFit")}>
          <ul className="space-y-2">
            {reasons.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm text-slate-700">
                <Check size={16} className="text-emerald-600 mt-0.5 shrink-0" /> {r}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title={t("majorDetail.skills")}>
        <div className="flex flex-wrap gap-2">
          {major.skills.map((s) => (
            <span key={s} className="text-sm bg-sky-50 text-sky-700 px-3 py-1.5 rounded-full">{s}</span>
          ))}
        </div>
      </Section>

      <Section title={t("majorDetail.careers")}>
        <div className="grid sm:grid-cols-2 gap-2">
          {major.careers.map((c) => (
            <div key={c} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2.5">
              <Briefcase size={14} className="text-slate-400" /> {c}
            </div>
          ))}
        </div>
      </Section>

      <Section title={t("majorDetail.duration")}>
        <p className="text-sm text-slate-700">{major.duration_years} {major.duration_years === 1 ? "year" : "years"}</p>
      </Section>

      <Section title={t("majorDetail.pathway")}>
        <div className="flex items-center gap-2 flex-wrap text-sm">
          <span className="bg-slate-100 px-3 py-1.5 rounded-full text-slate-600">{t("majorDetail.grade12")}</span>
          <ArrowRight size={14} className="text-slate-300" />
          <span className="bg-slate-100 px-3 py-1.5 rounded-full text-slate-600">
            {localize(major.name, lang)} ({major.duration_years} {lang === "km" ? "ឆ្នាំ" : "yrs"})
          </span>
          <ArrowRight size={14} className="text-slate-300" />
          <span className="bg-emerald-100 px-3 py-1.5 rounded-full text-emerald-700">{major.careers[0]}</span>
        </div>
      </Section>

      <Section title={t("majorDetail.recommendedUniversities")}>
        <div className="grid sm:grid-cols-3 gap-3">
          {relatedUnis.map((u) => (
            <Link key={u.id} href={`/universities/${u.id}`} className="text-left border border-slate-100 rounded-xl p-4 hover:border-emerald-300 transition-colors block">
              <p className="font-semibold text-sm text-slate-900">{localize(u.name, lang)}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin size={12} /> {t(`assessment.options.location.${u.location}`)}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Link
        href={`/universities?major=${major.id}`}
        className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2"
      >
        {t("majorDetail.seeUniversities")} <ArrowRight size={18} />
      </Link>
    </div>
  );
}
