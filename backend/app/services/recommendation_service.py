"""
Major recommendation logic.

Deterministic and explainable by design: given assessment answers, every
major gets a match score based on four transparent components:

- Interests: 40%
- Strengths: 30%
- Career: 20%
- Budget: 10%

The scoring also returns the raw matching signals so the frontend can
explain why a major was recommended.
"""

from app.services import data_store


def _score_major(major: dict, answers: dict) -> dict:
    """Calculate the match score between one major and the student's answers."""

    student_interests = answers.get("interests", [])
    student_strengths = answers.get("strengths", [])
    student_career = answers.get("career", "")
    student_budget = answers.get("budget", "")

    # Find matching interests.
    matched_interests = [
        interest
        for interest in major.get("interests", [])
        if interest in student_interests
    ]

    # Find matching strengths.
    matched_strengths = [
        strength
        for strength in major.get("strengths", [])
        if strength in student_strengths
    ]

    # Career match.
    career_match = (
        major.get("career", "") == student_career
        and bool(student_career)
    )

    # Budget match.
    budget_match = (
        student_budget in major.get("budget_friendly", [])
        and bool(student_budget)
    )

    # Calculate individual component scores.
    interest_score = (
        (len(matched_interests) / len(major.get("interests", []))) * 40
        if major.get("interests")
        else 0
    )

    strength_score = (
        (len(matched_strengths) / len(major.get("strengths", []))) * 30
        if major.get("strengths")
        else 0
    )

    career_score = 20 if career_match else 0

    budget_score = 10 if budget_match else 0

    # Total raw score.
    raw_score = (
        interest_score
        + strength_score
        + career_score
        + budget_score
    )

    # Keep the displayed score between 35 and 97.
    match = max(35, min(97, round(raw_score)))

    return {
        "major_id": major["id"],
        "match": match,
        "matched_interests": matched_interests,
        "matched_strengths": matched_strengths,
        "career_match": career_match,
        "budget_match": budget_match,
    }


def get_major_matches(answers: dict) -> list[dict]:
    """Score every major against the student's answers, best match first."""

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


def get_top_majors(answers: dict, n: int = 3) -> list[dict]:
    """Return the top N recommended majors."""

    return get_major_matches(answers)[:n]