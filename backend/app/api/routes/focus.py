"""Focus session routes."""

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.api.deps import get_current_user
from datetime import datetime

router = APIRouter(prefix="/focus", tags=["Focus"])

_sessions_db: dict[str, list[dict]] = {}


class FocusSessionCreate(BaseModel):
    duration_minutes: int = 25
    task_id: str | None = None
    mode: str = "focus"  # focus, shortBreak, longBreak


class FocusSessionResponse(BaseModel):
    id: str
    user_id: str
    duration_minutes: int
    task_id: str | None
    mode: str
    completed_at: datetime


@router.post("/sessions", response_model=FocusSessionResponse)
async def log_focus_session(
    data: FocusSessionCreate,
    current_user: dict = Depends(get_current_user),
):
    """Log a completed focus session."""
    user_id = current_user["sub"]
    import uuid

    session = {
        "id": str(uuid.uuid4()),
        "user_id": user_id,
        "duration_minutes": data.duration_minutes,
        "task_id": data.task_id,
        "mode": data.mode,
        "completed_at": datetime.utcnow(),
    }

    if user_id not in _sessions_db:
        _sessions_db[user_id] = []
    _sessions_db[user_id].append(session)

    return FocusSessionResponse(**session)


@router.get("/sessions", response_model=list[FocusSessionResponse])
async def get_sessions(current_user: dict = Depends(get_current_user)):
    """Get focus session history."""
    user_id = current_user["sub"]
    sessions = _sessions_db.get(user_id, [])
    return [FocusSessionResponse(**s) for s in sessions]
