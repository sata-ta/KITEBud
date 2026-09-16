from fastapi import APIRouter, Query
from app.schemas.shortlist import ShortlistAddRequest, ShortlistResponse
from app.services import session_store

router = APIRouter()


@router.get("/shortlist", response_model=ShortlistResponse)
def get_shortlist(session_id: str = Query(...)):
    return ShortlistResponse(session_id=session_id, university_ids=session_store.get_shortlist(session_id))


@router.post("/shortlist", response_model=ShortlistResponse)
def add_to_shortlist(payload: ShortlistAddRequest):
    ids = session_store.add_to_shortlist(payload.session_id, payload.university_id)
    return ShortlistResponse(session_id=payload.session_id, university_ids=ids)


@router.delete("/shortlist/{university_id}", response_model=ShortlistResponse)
def remove_from_shortlist(university_id: str, session_id: str = Query(...)):
    ids = session_store.remove_from_shortlist(session_id, university_id)
    return ShortlistResponse(session_id=session_id, university_ids=ids)
