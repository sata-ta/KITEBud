"use client";

import React from "react";
import Link from "next/link";
import { Users, ClipboardList, BookOpen, Building2, Briefcase, Target, Wallet, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export default function LandingPage() {
  const { t } = useI18n();

  const pathSteps = [
    { icon: Users, label: t("landing.pathYou"), sub: t("landing.pathYouSub") },
    { icon: ClipboardList, label: t("landing.pathAssessment"), sub: t("landing.pathAssessmentSub") },
    { icon: BookOpen, label: t("landing.pathMajor"), sub: t("landing.pathMajorSub") },
    { icon: Building2, label: t("landing.pathUniversity"), sub: t("landing.pathUniversitySub") },
    { icon: Briefcase, label: t("landing.pathCareer"), sub: t("landing.pathCareerSub") },
  ];

  const steps = [
    { n: "1", title: t("landing.step1Title"), desc: t("landing.step1Desc") },
    { n: "2", title: t("landing.step2Title"), desc: t("landing.step2Desc") },
    { n: "3", title: t("landing.step3Title"), desc: t("landing.step3Desc") },
    { n: "4", title: t("landing.step4Title"), desc: t("landing.step4Desc") },
  ];

  const whyFeatures = [
    { icon: Target, title: t("landing.why1Title"), desc: t("landing.why1Desc") },
    { icon: Building2, title: t("landing.why2Title"), desc: t("landing.why2Desc") },
    { icon: Wallet, title: t("landing.why3Title"), desc: t("landing.why3Desc") },
    { icon: Briefcase, title: t("landing.why4Title"), desc: t("landing.why4Desc") },
    { icon: Users, title: t("landing.why5Title"), desc: t("landing.why5Desc") },
    { icon: TrendingUp, title: t("landing.why6Title"), desc: t("landing.why6Desc") },
  ];

  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 pt-14 pb-16 md:pt-20 md:pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 rounded-full px-3 py-1 text-xs font-semibold mb-5">
            <Sparkles size={13} /> {t("landing.badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-5">
            {t("landing.headline")}
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-md leading-relaxed">{t("landing.subheadline")}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/assessment"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              {t("landing.ctaPrimary")} <ArrowRight size={18} />
            </Link>
            <Link
              href="/universities"
              className="border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold px-6 py-3.5 rounded-xl text-center transition-colors"
            >
              {t("landing.ctaSecondary")}
            </Link>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 mb-5">{t("landing.pathTitle")}</p>
          <div className="flex flex-col gap-0">
            {pathSteps.map((s, i) => (
              <div key={s.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                    <s.icon size={18} className="text-white" />
                  </div>
                  {i < pathSteps.length - 1 && <div className="w-px flex-1 bg-slate-200 my-1" style={{ minHeight: 24 }} />}
                </div>
                <div className="pb-6">
                  <p className="font-semibold text-slate-900 text-sm">{s.label}</p>
                  <p className="text-xs text-slate-500">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-5 py-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">{t("landing.howItWorksTitle")}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {steps.map((step) => (
              <div key={step.n} className="bg-white rounded-xl p-5 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 font-bold text-sm flex items-center justify-center mb-4">
                  {step.n}
                </div>
                <h3 className="font-semibold text-slate-900 mb-1.5 text-[15px]">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">{t("landing.whyTitle")}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {whyFeatures.map((f) => (
            <div key={f.title} className="p-5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
              <f.icon size={22} className="text-emerald-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-1.5 text-[15px]">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-emerald-600">
        <div className="max-w-4xl mx-auto px-5 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t("landing.finalCtaTitle")}</h2>
          <p className="text-emerald-50 mb-8 max-w-lg mx-auto">{t("landing.finalCtaDesc")}</p>
          <Link
            href="/assessment"
            className="bg-white text-emerald-700 font-semibold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 hover:bg-emerald-50 transition-colors"
          >
            {t("landing.finalCtaButton")} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
