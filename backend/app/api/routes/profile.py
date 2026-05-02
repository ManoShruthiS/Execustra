"""Profile routes."""

from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.profile import ProfileResponse, ProfileUpdate
from app.api.deps import get_current_user
from app.api.routes.onboarding import _profiles_db

router = APIRouter(prefix="/profile", tags=["Profile"])


@router.get("/", response_model=ProfileResponse)
async def get_profile(current_user: dict = Depends(get_current_user)):
    """Get the current user's profile."""
    user_id = current_user["sub"]
    profile = _profiles_db.get(user_id)
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")
    return ProfileResponse(**profile)


@router.patch("/", response_model=ProfileResponse)
async def update_profile(
    update: ProfileUpdate,
    current_user: dict = Depends(get_current_user),
):
    """Update user profile."""
    user_id = current_user["sub"]
    profile = _profiles_db.get(user_id)
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")

    if update.goal is not None:
        profile["goal"] = update.goal
    if update.blockers is not None:
        profile["blockers"] = update.blockers
    if update.consistency is not None:
        profile["consistency_level"] = update.consistency

    _profiles_db[user_id] = profile
    return ProfileResponse(**profile)
