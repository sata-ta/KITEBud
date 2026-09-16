"use client";

import React from "react";

export function MatchBadge({ percent, size = "md" }: { percent: number; size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl bg-emerald-600 text-white shrink-0 ${big ? "w-20 h-20" : "w-16 h-16"}`}>
      <span className={`font-bold leading-none ${big ? "text-2xl" : "text-lg"}`}>{percent}%</span>
      <span className={`leading-none ${big ? "text-[10px] mt-1" : "text-[9px] mt-0.5"} opacity-90`}>match</span>
    </div>
  );
}
