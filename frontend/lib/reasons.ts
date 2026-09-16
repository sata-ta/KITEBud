import { joinWithAnd } from "@/lib/format";
import type { MajorMatch } from "@/types";

type Translate = (key: string, params?: Record<string, string | number>) => string;

export function buildMajorReasons(match: MajorMatch, careerKey: string, t: Translate): string[] {
  const reasons: string[] = [];
  const and = t("common.and");

  if (match.matched_interests.length) {
    const items = joinWithAnd(
      match.matched_interests.map((k) => t(`assessment.options.interests.${k}`)),
      and
    );
    reasons.push(t("reasons.interest", { items }));
  }
  if (match.matched_strengths.length) {
    const items = joinWithAnd(
      match.matched_strengths.map((k) => t(`assessment.options.strengths.${k}`)),
      and
    );
    reasons.push(t("reasons.strength", { items }));
  }
  if (match.career_match) {
    reasons.push(t("reasons.career", { career: t(`assessment.options.careers.${careerKey}`) }));
  }
  if (match.budget_match) {
    reasons.push(t("reasons.budget"));
  }
  if (!reasons.length) {
    reasons.push(t("reasons.fallback"));
  }
  return reasons;
}
