from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class NotebookCreate(BaseModel):
    title: str = "Untitled Note"
    content: str = ""


class NotebookResponse(BaseModel):
    id: str
    user_id: str
    title: str
    content: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class NotebookUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
