"""Onboarding routes."""

from fastapi import APIRouter, Depends
from app.schemas.profile import ProfileCreate, ProfileResponse
from app.api.deps import get_current_user

router = APIRouter(prefix="/onboarding", tags=["Onboarding"])

_profiles_db: dict[str, dict] = {}


@router.post("/complete", response_model=ProfileResponse)
async def complete_onboarding(
    profile_data: ProfileCreate,
    current_user: dict = Depends(get_current_user),
):
    """Complete the onboarding process and create a user profile."""
    user_id = current_user["sub"]

    profile = {
        "user_id": user_id,
        "goal": profile_data.goal,
        "consistency_level": profile_data.consistency,
        "blockers": profile_data.blockers,
        "task_completion_rate": 0.0,
        "consistency_score": 0.0,
    }

    _profiles_db[user_id] = profile

    return ProfileResponse(**profile)


@router.get("/status")
async def onboarding_status(current_user: dict = Depends(get_current_user)):
    """Check if user has completed onboarding."""
    user_id = current_user["sub"]
    return {"is_onboarded": user_id in _profiles_db}
