from pydantic import BaseModel


class ActionItem(BaseModel):
    id: str
    translation_key: str  # frontend looks this up in locales for the label
    params: dict = {}      # values to interpolate into the translated label
    completed: bool = False


class ActionPlanResponse(BaseModel):
    session_id: str
    items: list[ActionItem]
    completed_count: int
    total_count: int


class ActionItemToggleRequest(BaseModel):
    session_id: str
    item_id: str
