from fastapi import APIRouter
from app.services import data_store

router = APIRouter()


@router.get("/scholarships")
def list_scholarships():
    return {"scholarships": data_store.get_all_scholarships()}
