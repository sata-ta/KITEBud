from pydantic import BaseModel
from app.schemas.major import LocalizedText


class ContactInfo(BaseModel):
    phone: str
    email: str
    website: str


class University(BaseModel):
    id: str
    name: LocalizedText
    location: str  # canonical location key, e.g. "phnom_penh"
    description: LocalizedText
    majors: list[str]  # major ids offered
    tuition_per_year: int
    scholarship_max_percent: int
    admission_requirements: list[LocalizedText]
    contact: ContactInfo


class UniversityMatch(BaseModel):
    university_id: str
    match: int
    offers_major: bool
    fits_budget: bool
    location_match: bool
    has_scholarship: bool
    estimated_cost: int
