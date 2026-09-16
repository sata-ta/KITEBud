from fastapi import APIRouter, Query
from app.schemas.action_plan import ActionPlanResponse, ActionItemToggleRequest
from app.services import action_plan_service, session_store

router = APIRouter()


@router.get("/action-plan", response_model=ActionPlanResponse)
def get_action_plan(session_id: str = Query(...)):
    answers = session_store.get_answers(session_id)
    items = action_plan_service.build_action_plan(session_id, answers)
    completed_count = sum(1 for i in items if i["completed"])
    return ActionPlanResponse(session_id=session_id, items=items, completed_count=completed_count, total_count=len(items))


@router.post("/action-plan/toggle", response_model=ActionPlanResponse)
def toggle_action_item(payload: ActionItemToggleRequest):
    session_store.toggle_action_item(payload.session_id, payload.item_id)
    answers = session_store.get_answers(payload.session_id)
    items = action_plan_service.build_action_plan(payload.session_id, answers)
    completed_count = sum(1 for i in items if i["completed"])
    return ActionPlanResponse(session_id=payload.session_id, items=items, completed_count=completed_count, total_count=len(items))
