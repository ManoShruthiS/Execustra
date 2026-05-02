from pydantic import BaseModel
from typing import Optional


class ProfileCreate(BaseModel):
    goal: str
    blockers: list[str]
    consistency: str  # low, medium, high


class ProfileResponse(BaseModel):
    user_id: str
    goal: str
    consistency_level: str
    blockers: list[str]
    task_completion_rate: float = 0.0
    consistency_score: float = 0.0

    class Config:
        from_attributes = True


class ProfileUpdate(BaseModel):
    goal: Optional[str] = None
    blockers: Optional[list[str]] = None
    consistency: Optional[str] = None
