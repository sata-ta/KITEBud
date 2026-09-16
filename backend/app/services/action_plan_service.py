"""
Turns a student's recommendation + shortlist into a concrete checklist.

Each item carries a translation_key (looked up in the frontend's locale
files) plus any params to interpolate, so the plan renders correctly in
English or Khmer without the backend needing to know any UI copy.
"""
from app.services import recommendation_service, session_store


def build_action_plan(session_id: str, answers: dict) -> list[dict]:
    top_majors = recommendation_service.get_top_majors(answers, n=2)
    shortlist = session_store.get_shortlist(session_id)
    completed = session_store.get_completed_items(session_id)

    items_def = [
        {
            "id": "decide",
            "translation_key": "actionPlan.items.decide",
            "params": {
                "major1": top_majors[0]["major_id"] if len(top_majors) > 0 else "",
                "major2": top_majors[1]["major_id"] if len(top_majors) > 1 else "",
            },
        },
        {
            "id": "shortlist3",
            "translation_key": "actionPlan.items.shortlist3",
            "params": {"count": len(shortlist)},
        },
        {"id": "scholarships", "translation_key": "actionPlan.items.scholarships", "params": {}},
        {"id": "certificate", "translation_key": "actionPlan.items.certificate", "params": {}},
        {"id": "id_documents", "translation_key": "actionPlan.items.idDocuments", "params": {}},
        {"id": "submit", "translation_key": "actionPlan.items.submit", "params": {}},
    ]

    for item in items_def:
        item["completed"] = item["id"] in completed

    return items_def
