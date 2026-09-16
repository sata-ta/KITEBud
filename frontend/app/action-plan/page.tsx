"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Circle, Award } from "lucide-react";
import { useI18n, localize } from "@/i18n/I18nProvider";
import { api } from "@/lib/api";
import { getStoredSessionId } from "@/lib/session";
import type { ActionItem, Major } from "@/types";

export default function ActionPlanPage() {
  const { t, lang } = useI18n();
  const [items, setItems] = useState<ActionItem[]>([]);
  const [majorsById, setMajorsById] = useState<Record<string, Major>>({});
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sid = getStoredSessionId();
    setSessionId(sid);
    if (!sid) {
      setLoading(false);
      return;
    }
    Promise.all([api.getActionPlan(sid), api.getMajors()]).then(([plan, majors]) => {
      setItems(plan.items);
      setMajorsById(Object.fromEntries(majors.majors.map((m) => [m.id, m])));
      setLoading(false);
    });
  }, []);

  const resolveLabel = (item: ActionItem) => {
    const params = { ...item.params };
    if (typeof params.major1 === "string" && majorsById[params.major1]) params.major1 = localize(majorsById[params.major1].name, lang);
    if (typeof params.major2 === "string" && majorsById[params.major2]) params.major2 = localize(majorsById[params.major2].name, lang);
    return t(item.translation_key, params);
  };

  const toggle = async (itemId: string) => {
    if (!sessionId) return;
    const res = await api.toggleActionItem(sessionId, itemId);
    setItems(res.items);
  };

  if (loading) return <div className="max-w-2xl mx-auto px-5 py-20 text-center text-slate-400">{t("common.loading")}</div>;

  if (!sessionId) {
    return (
      <div className="max-w-xl mx-auto px-5 py-20 text-center">
        <p className="text-slate-500 mb-6 text-sm">{t("errors.incompleteAssessment")}</p>
        <a href="/assessment" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl inline-block">
          {t("nav.findMajor")}
        </a>
      </div>
    );
  }

  const completedCount = items.filter((i) => i.completed).length;

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 md:py-14">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{t("actionPlan.title")}</h1>
      <p className="text-slate-500 mb-6">{t("actionPlan.subtitle")}</p>

      <div className="bg-white border border-slate-100 rounded-2xl p-6 mb-3">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold text-slate-800">{t("actionPlan.progressLabel")}</span>
          <span className="text-slate-500">{t("actionPlan.progressCount", { completed: completedCount, total: items.length })}</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full bg-emerald-600 rounded-full transition-all duration-300" style={{ width: `${(completedCount / items.length) * 100}%` }} />
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-100">
        {items.map((item) => (
          <button key={item.id} onClick={() => toggle(item.id)} className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-slate-50 transition-colors">
            {item.completed ? <CheckCircle2 size={20} className="text-emerald-600 shrink-0" /> : <Circle size={20} className="text-slate-300 shrink-0" />}
            <span className={`text-sm ${item.completed ? "text-slate-400 line-through" : "text-slate-800"}`}>{resolveLabel(item)}</span>
          </button>
        ))}
      </div>

      {completedCount === items.length && items.length > 0 && (
        <div className="mt-5 bg-emerald-50 rounded-xl p-4 flex items-center gap-3">
          <Award size={22} className="text-emerald-600 shrink-0" />
          <p className="text-sm text-emerald-800 font-medium">{t("actionPlan.allDone")}</p>
        </div>
      )}
    </div>
  );
}
