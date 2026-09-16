export interface LocalizedText {
  en: string;
  km?: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  website: string;
}

export interface Major {
  id: string;
  name: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  interests: string[];
  strengths: string[];
  career: string;
  budget_friendly: string[];
  careers: string[];
  skills: string[];
  duration_years: number;
}

export interface University {
  id: string;
  name: LocalizedText;
  location: string;
  description: LocalizedText;
  majors: string[];
  tuition_per_year: number;
  scholarship_max_percent: number;
  admission_requirements: LocalizedText[];
  contact: ContactInfo;
  match_info?: UniversityMatch;
}

export interface Scholarship {
  id: string;
  name: LocalizedText;
  university_id: string;
  coverage_percent: number;
  requirement: LocalizedText;
  deadline: string;
}

export interface MajorMatch {
  major_id: string;
  match: number;
  matched_interests: string[];
  matched_strengths: string[];
  career_match: boolean;
  budget_match: boolean;
}

export interface UniversityMatch {
  university_id: string;
  match: number;
  offers_major: boolean;
  fits_budget: boolean;
  location_match: boolean;
  has_scholarship: boolean;
  estimated_cost: number;
}

export interface AssessmentAnswers {
  interests: string[];
  strengths: string[];
  career: string;
  budget: string;
  location: string;
}

export interface ActionItem {
  id: string;
  translation_key: string;
  params: Record<string, string | number>;
  completed: boolean;
}

export interface ActionPlanResponse {
  session_id: string;
  items: ActionItem[];
  completed_count: number;
  total_count: number;
}
