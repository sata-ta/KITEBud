"use client";

import React from "react";

export function ProgressBar({ value, total, label }: { value: number; total: number; label?: React.ReactNode }) {
  const pct = Math.round((value / total) * 100);
  return (
    <div className="w-full">
      {label && <div className="flex justify-between text-xs text-slate-500 mb-1.5">{label}</div>}
      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full rounded-full bg-emerald-600 transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
