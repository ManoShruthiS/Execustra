"""Reflection routes."""

from fastapi import APIRouter, Depends
from app.schemas.reflection import ReflectionCreate, ReflectionResponse
from app.api.deps import get_current_user
from datetime import date
import uuid

router = APIRouter(prefix="/reflections", tags=["Reflections"])

_reflections_db: dict[str, list[dict]] = {}


@router.post("/", response_model=ReflectionResponse)
async def submit_reflection(
    data: ReflectionCreate,
    current_user: dict = Depends(get_current_user),
):
    """Submit a daily reflection."""
    user_id = current_user["sub"]

    reflection = {
        "id": str(uuid.uuid4()),
        "user_id": user_id,
        "date": date.today(),
        "completed": data.completed,
        "blocked": data.blocked,
        "learned": data.learned,
    }

    if user_id not in _reflections_db:
        _reflections_db[user_id] = []

    # Replace if already exists for today
    _reflections_db[user_id] = [
        r for r in _reflections_db[user_id] if r["date"] != date.today()
    ]
    _reflections_db[user_id].append(reflection)

    return ReflectionResponse(**reflection)


@router.get("/", response_model=list[ReflectionResponse])
async def get_reflections(
    limit: int = 10,
    current_user: dict = Depends(get_current_user),
):
    """Get reflection history."""
    user_id = current_user["sub"]
    reflections = _reflections_db.get(user_id, [])
    return [ReflectionResponse(**r) for r in reflections[-limit:]]
