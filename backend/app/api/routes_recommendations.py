from fastapi import APIRouter, HTTPException, Query
from app.services import recommendation_service, session_store

router = APIRouter()


@router.get("/recommendations")
def get_recommendations(session_id: str = Query(...), limit: int = 3):
    """Return the top-N major matches for a session's stored answers."""
    answers = session_store.get_answers(session_id)
    if not answers.get("interests") or not answers.get("career") or not answers.get("budget") or not answers.get("location"):
        raise HTTPException(status_code=400, detail="Assessment is incomplete for this session.")
    return {"session_id": session_id, "matches": recommendation_service.get_top_majors(answers, n=limit)}
