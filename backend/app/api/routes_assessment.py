from fastapi import APIRouter
from app.schemas.assessment import AssessmentSubmitRequest, AssessmentSubmitResponse
from app.services import session_store

router = APIRouter()


@router.post("/assessment", response_model=AssessmentSubmitResponse)
def submit_assessment(payload: AssessmentSubmitRequest):
    """Store a student's assessment answers and return a session id.

    If no session_id is provided, a new one is created. The frontend
    persists this id (e.g. in localStorage) and sends it with every
    subsequent request so recommendations, shortlist, and the action plan
    all refer back to the same student.
    """
    session_id = payload.session_id or session_store.create_session()
    answers = session_store.save_answers(session_id, payload.answers.model_dump())
    return AssessmentSubmitResponse(session_id=session_id, answers=answers)
