from fastapi import APIRouter, HTTPException, Query
from app.services import data_store, matching_service, session_store

router = APIRouter()


@router.get("/universities")
def list_universities(
    session_id: str | None = Query(default=None),
    major_id: str | None = Query(default=None, description="Recommended major to match against"),
):
    """List universities.

    If session_id and major_id are provided, each university includes a
    personalized match score (major fit, budget fit, location fit,
    scholarship availability). Otherwise, returns the plain catalog for
    the Explore page.
    """
    if session_id and major_id:
        answers = session_store.get_answers(session_id)
        matches = matching_service.get_university_matches(major_id, answers)
        by_id = {u["id"]: u for u in data_store.get_all_universities()}
        return {
            "universities": [
                {**by_id[m["university_id"]], "match_info": m}
                for m in matches
                if m["university_id"] in by_id
            ]
        }
    return {"universities": data_store.get_all_universities()}


@router.get("/universities/{university_id}")
def get_university(
    university_id: str,
    session_id: str | None = Query(default=None),
    major_id: str | None = Query(default=None),
):
    university = data_store.get_university(university_id)
    if not university:
        raise HTTPException(status_code=404, detail="University not found.")
    if session_id and major_id:
        answers = session_store.get_answers(session_id)
        match_info = next(
            (m for m in matching_service.get_university_matches(major_id, answers) if m["university_id"] == university_id),
            None,
        )
        return {**university, "match_info": match_info}
    return university
