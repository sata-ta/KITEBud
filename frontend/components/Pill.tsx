"use client";

import React from "react";
import { CheckCircle2, Circle } from "lucide-react";

export function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-colors font-medium text-[15px] ${
        active ? "border-emerald-600 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
      }`}
    >
      <span className="flex items-center justify-between">
        {children}
        {active ? <CheckCircle2 size={18} className="text-emerald-600 shrink-0" /> : <Circle size={18} className="text-slate-300 shrink-0" />}
      </span>
    </button>
  );
}
