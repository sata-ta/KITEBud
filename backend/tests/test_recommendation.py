from app.services import recommendation_service, matching_service


def test_data_science_scores_high_for_tech_math_student():
    answers = {
        "interests": ["mathematics", "technology"],
        "strengths": ["problem_solving"],
        "career": "technology",
        "budget": "1000_2000",
        "location": "phnom_penh",
    }
    matches = recommendation_service.get_major_matches(answers)
    top_ids = [m["major_id"] for m in matches[:3]]

    assert "data-science" in top_ids
    assert matches[0]["match"] >= matches[-1]["match"]
    top_match = next(m for m in matches if m["major_id"] == "data-science")
    assert "mathematics" in top_match["matched_interests"]
    assert top_match["career_match"] is True


def test_matches_are_sorted_descending():
    answers = {"interests": ["business"], "strengths": ["leadership"], "career": "business", "budget": "lt1000", "location": "anywhere"}
    matches = recommendation_service.get_major_matches(answers)
    scores = [m["match"] for m in matches]
    assert scores == sorted(scores, reverse=True)


def test_university_budget_affordability():
    answers = {"interests": [], "strengths": [], "career": "", "budget": "lt1000", "location": "anywhere"}
    matches = matching_service.get_university_matches("computer-science", answers)
    ubb = next(m for m in matches if m["university_id"] == "ubb")
    paragon = next(m for m in matches if m["university_id"] == "paragon")

    # UBB tuition ($650) with a 20% scholarship is well under $1,000/year.
    assert ubb["fits_budget"] is True
    # Paragon's estimated cost after its 70% scholarship is still $1,080/year.
    assert paragon["fits_budget"] is False


def test_estimated_cost_applies_scholarship_discount():
    from app.services import data_store
    paragon = data_store.get_university("paragon")
    cost = matching_service.estimated_cost(paragon)
    assert cost == round(3600 * 0.30)
