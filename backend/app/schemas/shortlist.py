from pydantic import BaseModel


class ShortlistAddRequest(BaseModel):
    session_id: str
    university_id: str


class ShortlistResponse(BaseModel):
    session_id: str
    university_ids: list[str]
