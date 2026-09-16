"""
University matching + student-specific budget affordability logic.
"""
from app.services import data_store

BUDGET_CAPS = {
    "lt1000": 1000,
    "1000_2000": 2000,
    "2000_4000": 4000,
    "4000_plus": float("inf"),
}


def budget_cap(budget_key: str) -> float:
    return BUDGET_CAPS.get(budget_key, float("inf"))


def estimated_cost(university: dict) -> int:
    tuition = university["tuition_per_year"]
    scholarship = university["scholarship_max_percent"]
    return round(tuition * (1 - scholarship / 100))


def _score_university(university: dict, major_id: str, answers: dict) -> dict:
    offers_major = major_id in university["majors"]
    cost = estimated_cost(university)
    fits_budget = cost <= budget_cap(answers.get("budget", ""))
    location = answers.get("location", "")
    location_match = location == "anywhere" or university["location"] == location
    has_scholarship = university["scholarship_max_percent"] > 0

    match = 0
    if offers_major:
        match += 40
    if fits_budget:
        match += 30
    if location_match:
        match += 15
    if has_scholarship:
        match += 15
    match = max(20, min(100, match))

    return {
        "university_id": university["id"],
        "match": match,
        "offers_major": offers_major,
        "fits_budget": fits_budget,
        "location_match": location_match,
        "has_scholarship": has_scholarship,
        "estimated_cost": cost,
    }


def get_university_matches(major_id: str, answers: dict) -> list[dict]:
    universities = data_store.get_all_universities()
    scored = [_score_university(u, major_id, answers) for u in universities]
    scored.sort(key=lambda s: s["match"], reverse=True)
    return scored
