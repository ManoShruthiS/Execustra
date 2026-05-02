"""Notebook routes."""

from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.notebook import NotebookCreate, NotebookResponse, NotebookUpdate
from app.api.deps import get_current_user
from datetime import datetime
import uuid

router = APIRouter(prefix="/notebooks", tags=["Notebooks"])

_notebooks_db: dict[str, list[dict]] = {}


@router.post("/", response_model=NotebookResponse, status_code=status.HTTP_201_CREATED)
async def create_note(
    data: NotebookCreate,
    current_user: dict = Depends(get_current_user),
):
    """Create a new notebook entry."""
    user_id = current_user["sub"]
    now = datetime.utcnow()
    note = {
        "id": str(uuid.uuid4()),
        "user_id": user_id,
        "title": data.title,
        "content": data.content,
        "created_at": now,
        "updated_at": now,
    }
    if user_id not in _notebooks_db:
        _notebooks_db[user_id] = []
    _notebooks_db[user_id].append(note)
    return NotebookResponse(**note)


@router.get("/", response_model=list[NotebookResponse])
async def get_notes(current_user: dict = Depends(get_current_user)):
    """Get all notebook entries."""
    user_id = current_user["sub"]
    notes = _notebooks_db.get(user_id, [])
    return [NotebookResponse(**n) for n in notes]


@router.patch("/{note_id}", response_model=NotebookResponse)
async def update_note(
    note_id: str,
    update: NotebookUpdate,
    current_user: dict = Depends(get_current_user),
):
    """Update a notebook entry."""
    user_id = current_user["sub"]
    notes = _notebooks_db.get(user_id, [])
    for note in notes:
        if note["id"] == note_id:
            if update.title is not None:
                note["title"] = update.title
            if update.content is not None:
                note["content"] = update.content
            note["updated_at"] = datetime.utcnow()
            return NotebookResponse(**note)
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")


@router.delete("/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_note(
    note_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Delete a notebook entry."""
    user_id = current_user["sub"]
    notes = _notebooks_db.get(user_id, [])
    _notebooks_db[user_id] = [n for n in notes if n["id"] != note_id]
