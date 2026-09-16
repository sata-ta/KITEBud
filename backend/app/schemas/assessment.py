from typing import Optional
from pydantic import BaseModel, Field


class AssessmentAnswers(BaseModel):
    """
    Answers submitted by the student from the 5-step assessment.

    Values must be canonical keys defined by the frontend options,
    not the displayed English or Khmer labels.
    """

    # Step 1: Interests
    interests: list[str] = Field(
        default_factory=list,
        description="Selected interest keys",
    )

    # Step 2: Strengths
    strengths: list[str] = Field(
        default_factory=list,
        description="Selected strength keys",
    )

    # Step 3: Career
    career: str = Field(
        default="",
        description="Selected career-interest key",
    )

    # Step 4: Budget
    budget: str = Field(
        default="",
        description="Selected budget key",
    )

    # Step 5: Context / Location
    location: str = Field(
        default="",
        description="Selected preferred-location key",
    )


class AssessmentSubmitRequest(BaseModel):
    """
    Request body sent by the frontend when submitting the assessment.
    """

    session_id: Optional[str] = Field(
        default=None,
        description="Existing session ID, if available",
    )

    answers: AssessmentAnswers


class AssessmentSubmitResponse(BaseModel):
    """
    Response returned after successfully submitting the assessment.
    """

    session_id: str
    answers: AssessmentAnswers