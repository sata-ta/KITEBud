from pydantic import BaseModel
from app.schemas.major import LocalizedText


class Scholarship(BaseModel):
    id: str
    name: LocalizedText
    university_id: str
    coverage_percent: int
    requirement: LocalizedText
    deadline: str
