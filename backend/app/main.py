from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api import (
    routes_assessment,
    routes_recommendations,
    routes_majors,
    routes_universities,
    routes_scholarships,
    routes_shortlist,
    routes_action_plan,
)

app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes_assessment.router, prefix=settings.API_PREFIX, tags=["assessment"])
app.include_router(routes_recommendations.router, prefix=settings.API_PREFIX, tags=["recommendations"])
app.include_router(routes_majors.router, prefix=settings.API_PREFIX, tags=["majors"])
app.include_router(routes_universities.router, prefix=settings.API_PREFIX, tags=["universities"])
app.include_router(routes_scholarships.router, prefix=settings.API_PREFIX, tags=["scholarships"])
app.include_router(routes_shortlist.router, prefix=settings.API_PREFIX, tags=["shortlist"])
app.include_router(routes_action_plan.router, prefix=settings.API_PREFIX, tags=["action-plan"])


@app.get("/")
def health_check():
    return {"status": "ok", "service": settings.APP_NAME}
