import type {
  AssessmentAnswers,
  Major,
  University,
  Scholarship,
  MajorMatch,
  ActionPlanResponse,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Request to ${path} failed (${res.status})`);
  }
  return res.json();
}

export const api = {
  submitAssessment: (answers: AssessmentAnswers, sessionId?: string | null) =>
    request<{ session_id: string; answers: AssessmentAnswers }>("/api/assessment", {
      method: "POST",
      body: JSON.stringify({ session_id: sessionId || null, answers }),
    }),

  getRecommendations: (sessionId: string, limit = 3) =>
    request<{ session_id: string; matches: MajorMatch[] }>(
      `/api/recommendations?session_id=${encodeURIComponent(sessionId)}&limit=${limit}`
    ),

  getMajors: () => request<{ majors: Major[] }>("/api/majors"),

  getMajor: (majorId: string) => request<Major>(`/api/majors/${encodeURIComponent(majorId)}`),

  getUniversities: (sessionId?: string, majorId?: string) => {
    const params = new URLSearchParams();
    if (sessionId) params.set("session_id", sessionId);
    if (majorId) params.set("major_id", majorId);
    const qs = params.toString();
    return request<{ universities: University[] }>(`/api/universities${qs ? `?${qs}` : ""}`);
  },

  getUniversity: (universityId: string, sessionId?: string, majorId?: string) => {
    const params = new URLSearchParams();
    if (sessionId) params.set("session_id", sessionId);
    if (majorId) params.set("major_id", majorId);
    const qs = params.toString();
    return request<University>(`/api/universities/${encodeURIComponent(universityId)}${qs ? `?${qs}` : ""}`);
  },

  getScholarships: () => request<{ scholarships: Scholarship[] }>("/api/scholarships"),

  getShortlist: (sessionId: string) =>
    request<{ session_id: string; university_ids: string[] }>(`/api/shortlist?session_id=${encodeURIComponent(sessionId)}`),

  addToShortlist: (sessionId: string, universityId: string) =>
    request<{ session_id: string; university_ids: string[] }>("/api/shortlist", {
      method: "POST",
      body: JSON.stringify({ session_id: sessionId, university_id: universityId }),
    }),

  removeFromShortlist: (sessionId: string, universityId: string) =>
    request<{ session_id: string; university_ids: string[] }>(
      `/api/shortlist/${encodeURIComponent(universityId)}?session_id=${encodeURIComponent(sessionId)}`,
      { method: "DELETE" }
    ),

  getActionPlan: (sessionId: string) => request<ActionPlanResponse>(`/api/action-plan?session_id=${encodeURIComponent(sessionId)}`),

  toggleActionItem: (sessionId: string, itemId: string) =>
    request<ActionPlanResponse>("/api/action-plan/toggle", {
      method: "POST",
      body: JSON.stringify({ session_id: sessionId, item_id: itemId }),
    }),
};
