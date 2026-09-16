"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, MapPin, Check, Bookmark } from "lucide-react";
import { useI18n, localize } from "@/i18n/I18nProvider";
import { MatchBadge } from "@/components/MatchBadge";
import { PremiumModal } from "@/components/PremiumModal";
import { api } from "@/lib/api";
import { getStoredSessionId } from "@/lib/session";
import type { University, Scholarship, Major } from "@/types";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h2 className="text-base font-bold text-slate-900 mb-3">{title}</h2>
      {children}
    </div>
  );
}

export default function UniversityDetailPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-5 py-20 text-center text-slate-400">Loading...</div>}>
      <UniversityDetailPageInner />
    </Suspense>
  );
}

function UniversityDetailPageInner() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const majorId = searchParams.get("major");
  const router = useRouter();
  const { t, lang } = useI18n();

  const [uni, setUni] = useState<University | null>(null);
  const [topMajor, setTopMajor] = useState<Major | null>(null);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPremium, setShowPremium] = useState(false);

  useEffect(() => {
    const sid = getStoredSessionId();
    setSessionId(sid);

    Promise.all([
      api.getUniversity(params.id, sid || undefined, majorId || undefined),
      api.getScholarships(),
      majorId ? api.getMajor(majorId).catch(() => null) : Promise.resolve(null),
      sid ? api.getShortlist(sid).catch(() => ({ university_ids: [] })) : Promise.resolve({ university_ids: [] }),
    ]).then(([u, sch, major, sl]) => {
      setUni(u);
      setScholarships(sch.scholarships.filter((s) => s.university_id === params.id));
      setTopMajor(major);
      setShortlist(sl.university_ids);
      setLoading(false);
    });
  }, [params.id, majorId]);

  const toggleShortlist = async () => {
    if (!sessionId || !uni) return;
    const saved = shortlist.includes(uni.id);
    const res = saved ? await api.removeFromShortlist(sessionId, uni.id) : await api.addToShortlist(sessionId, uni.id);
    setShortlist(res.university_ids);
  };

  if (loading) return <div className="max-w-3xl mx-auto px-5 py-20 text-center text-slate-400">{t("common.loading")}</div>;
  if (!uni) return <div className="max-w-3xl mx-auto px-5 py-20 text-center text-slate-500">{t("errors.notFound")}</div>;

  const info = uni.match_info;
  const saved = shortlist.includes(uni.id);

  const whyMatches: string[] = [];
  if (info?.offers_major && topMajor) whyMatches.push(t("universityDetail.offersRecommended", { major: localize(topMajor.name, lang) }));
  if (info?.fits_budget) whyMatches.push(t("universityDetail.fitsBudgetAfterScholarship"));
  if (info?.location_match) whyMatches.push(t("universityDetail.locationMatch"));
  if (info?.has_scholarship) whyMatches.push(t("universityDetail.scholarshipAvailable", { percent: uni.scholarship_max_percent }));

  return (
    <div className="max-w-3xl mx-auto px-5 py-10 md:py-14">
      {showPremium && <PremiumModal onClose={() => setShowPremium(false)} />}
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-6">
        <ChevronLeft size={16} /> {t("universityDetail.backToUniversities")}
      </button>

      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">{localize(uni.name, lang)}</h1>
          <p className="text-slate-500 flex items-center gap-1 mt-1">
            <MapPin size={14} /> {t(`assessment.options.location.${uni.location}`)}
          </p>
        </div>
        {info && <MatchBadge percent={info.match} size="lg" />}
      </div>

      <p className="text-slate-600 leading-relaxed my-6">{localize(uni.description, lang)}</p>

      {whyMatches.length > 0 && (
        <div className="bg-emerald-50 rounded-xl p-4 mb-7">
          <p className="text-xs font-semibold text-emerald-800 mb-2">{t("universityDetail.whyMatches")}</p>
          <ul className="space-y-1.5">
            {whyMatches.map((w) => (
              <li key={w} className="text-sm text-emerald-900 flex items-start gap-2"><Check size={15} className="mt-0.5 shrink-0" /> {w}</li>
            ))}
          </ul>
        </div>
      )}

      <Section title={t("universityDetail.tuitionAndScholarships")}>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-1">{t("universities.tuition")}</p>
            <p className="font-bold text-slate-800">${uni.tuition_per_year.toLocaleString()}{t("universities.perYear")}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-1">{t("universities.scholarship")}</p>
            <p className="font-bold text-slate-800">{t("universities.upTo", { percent: uni.scholarship_max_percent })}</p>
          </div>
          {info && (
            <div className={`rounded-lg p-4 ${info.fits_budget ? "bg-emerald-50" : "bg-amber-50"}`}>
              <p className="text-xs text-slate-400 mb-1">{t("universityDetail.estimatedCost")}</p>
              <p className={`font-bold ${info.fits_budget ? "text-emerald-700" : "text-amber-700"}`}>${info.estimated_cost.toLocaleString()}{t("universities.perYear")}</p>
            </div>
          )}
        </div>
      </Section>

      <Section title={t("universityDetail.scholarshipsHere")}>
        <div className="flex flex-col gap-2">
          {scholarships.length ? scholarships.map((s) => (
            <div key={s.id} className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3 text-sm">
              <div>
                <p className="font-medium text-slate-800">{localize(s.name, lang)}</p>
                <p className="text-xs text-slate-500">{localize(s.requirement, lang)} · {t("explore.deadline")} {s.deadline}</p>
              </div>
              <span className="font-semibold text-emerald-700 shrink-0 ml-3">{s.coverage_percent}%</span>
            </div>
          )) : <p className="text-sm text-slate-500">{t("universityDetail.noScholarships")}</p>}
        </div>
      </Section>

      <Section title={t("universityDetail.admissionRequirements")}>
        <ul className="space-y-1.5">
          {uni.admission_requirements.map((a) => (
            <li key={a.en} className="text-sm text-slate-700 flex items-start gap-2"><Check size={15} className="text-slate-400 mt-0.5 shrink-0" /> {localize(a, lang)}</li>
          ))}
        </ul>
      </Section>

      <Section title={t("universityDetail.contactInformation")}>
        <div className="text-sm text-slate-600 space-y-1">
          <p>{uni.contact.phone}</p>
          <p>{uni.contact.email}</p>
          <p>{uni.contact.website}</p>
        </div>
      </Section>

      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <button
          onClick={toggleShortlist}
          className={`flex-1 font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 ${saved ? "bg-slate-900 text-white" : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}
        >
          <Bookmark size={16} fill={saved ? "white" : "none"} /> {saved ? t("common.shortlisted") : t("common.addToShortlist")}
        </button>
        <button onClick={() => setShowPremium(true)} className="flex-1 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold py-3.5 rounded-xl">
          {t("universityDetail.viewApplicationInfo")}
        </button>
      </div>
    </div>
  );
}
