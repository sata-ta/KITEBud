"""
Major recommendation logic.

Deterministic and explainable by design.

Each major receives a score from four transparent components:

- Interests: 40%
- Strengths: 30%
- Career: 20%
- Budget: 10%

The backend uses canonical English keys internally.
The frontend is responsible for translating those keys into
English or Khmer based on the selected language.
"""

from app.services import data_store


def _score_major(major: dict, answers: dict) -> dict:
    """Calculate the match score between one major and the student's answers."""

    # Student answers
    student_interests = answers.get("interests", [])
    student_strengths = answers.get("strengths", [])
    student_career = answers.get("career", "")
    student_budget = answers.get("budget", "")

    # Major data
    major_interests = major.get("interests", [])
    major_strengths = major.get("strengths", [])
    major_career = major.get("career", "")
    major_budget = major.get("budget_friendly", [])

    # ---------------------------------------------------------
    # 1. Interest matching - 40%
    # ---------------------------------------------------------

    matched_interests = [
        interest
        for interest in student_interests
        if interest in major_interests
    ]

    interest_score = (
        (len(matched_interests) / len(student_interests)) * 40
        if student_interests
        else 0
    )

    # ---------------------------------------------------------
    # 2. Strength matching - 30%
    # ---------------------------------------------------------

    matched_strengths = [
        strength
        for strength in student_strengths
        if strength in major_strengths
    ]

    strength_score = (
        (len(matched_strengths) / len(student_strengths)) * 30
        if student_strengths
        else 0
    )

    # ---------------------------------------------------------
    # 3. Career matching - 20%
    # ---------------------------------------------------------

    career_match = (
        bool(student_career)
        and student_career == major_career
    )

    career_score = 20 if career_match else 0

    # ---------------------------------------------------------
    # 4. Budget matching - 10%
    # ---------------------------------------------------------

    budget_match = (
        bool(student_budget)
        and student_budget in major_budget
    )

    budget_score = 10 if budget_match else 0

    # ---------------------------------------------------------
    # Final score
    # ---------------------------------------------------------

    raw_score = (
        interest_score
        + strength_score
        + career_score
        + budget_score
    )

    # Keep the score between 0 and 100
    match = max(0, min(100, round(raw_score)))

    return {
        "major_id": major["id"],
        "match": match,

        # Raw matching signals
        "matched_interests": matched_interests,
        "matched_strengths": matched_strengths,
        "career_match": career_match,
        "budget_match": budget_match,
    }


def get_major_matches(answers: dict) -> list[dict]:
    """
    Score every major against the student's answers
    and return them from highest to lowest match.
    """

    majors = data_store.get_all_majors()

    scored = [
        _score_major(major, answers)
        for major in majors
    ]

    scored.sort(
        key=lambda score: score["match"],
        reverse=True,
    )

    return scored


def get_top_majors(
    answers: dict,
    n: int = 3,
) -> list[dict]:
    """Return the top N recommended majors."""

    return get_major_matches(answers)[:n]