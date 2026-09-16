"""
Minimal in-memory "session" store standing in for real auth/persistence.

The MVP has no login, so a lightweight session id (returned once the student
submits the assessment) is used to remember their answers, shortlist, and
action-plan progress for the rest of their visit. This is intentionally a
plain dict — swapping it for a real `student_profiles` / `assessments` /
`shortlists` table in Postgres later only means changing this file.
"""
import uuid

_sessions: dict[str, dict] = {}

DEFAULT_ANSWERS = {"interests": [], "strengths": [], "career": "", "budget": "", "location": ""}


def create_session() -> str:
    session_id = str(uuid.uuid4())
    _sessions[session_id] = {"answers": dict(DEFAULT_ANSWERS), "shortlist": [], "completed_items": []}
    return session_id


def _ensure(session_id: str) -> dict:
    if session_id not in _sessions:
        _sessions[session_id] = {"answers": dict(DEFAULT_ANSWERS), "shortlist": [], "completed_items": []}
    return _sessions[session_id]


def save_answers(session_id: str, answers: dict) -> dict:
    session = _ensure(session_id)
    session["answers"] = answers
    return session["answers"]


def get_answers(session_id: str) -> dict:
    return _ensure(session_id)["answers"]


def add_to_shortlist(session_id: str, university_id: str) -> list[str]:
    session = _ensure(session_id)
    if university_id not in session["shortlist"]:
        session["shortlist"].append(university_id)
    return session["shortlist"]


def remove_from_shortlist(session_id: str, university_id: str) -> list[str]:
    session = _ensure(session_id)
    session["shortlist"] = [u for u in session["shortlist"] if u != university_id]
    return session["shortlist"]


def get_shortlist(session_id: str) -> list[str]:
    return _ensure(session_id)["shortlist"]


def toggle_action_item(session_id: str, item_id: str) -> list[str]:
    session = _ensure(session_id)
    if item_id in session["completed_items"]:
        session["completed_items"].remove(item_id)
    else:
        session["completed_items"].append(item_id)
    return session["completed_items"]


def get_completed_items(session_id: str) -> list[str]:
    return _ensure(session_id)["completed_items"]
