from pydantic import BaseModel


class LocalizedText(BaseModel):
    en: str
    km: str = ""

    def resolve(self, lang: str) -> str:
        """Return the requested language, falling back to English."""
        if lang == "km" and self.km:
            return self.km
        return self.en


class Major(BaseModel):
    id: str
    name: LocalizedText
    tagline: LocalizedText
    description: LocalizedText
    interests: list[str]
    strengths: list[str]
    career: str
    budget_friendly: list[str]
    careers: list[str]
    skills: list[str]
    duration_years: float


class MajorMatch(BaseModel):
    major_id: str
    match: int
    matched_interests: list[str]
    matched_strengths: list[str]
    career_match: bool
    budget_match: bool
