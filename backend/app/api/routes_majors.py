from fastapi import APIRouter, HTTPException
from app.services import data_store

router = APIRouter()


@router.get("/majors")
def list_majors():
    return {"majors": data_store.get_all_majors()}


@router.get("/majors/{major_id}")
def get_major(major_id: str):
    major = data_store.get_major(major_id)
    if not major:
        raise HTTPException(status_code=404, detail="Major not found.")
    return major
