from pydantic import BaseModel
from typing import Optional
from datetime import date


class ReflectionCreate(BaseModel):
    completed: str = ""
    blocked: str = ""
    learned: str = ""


class ReflectionResponse(BaseModel):
    id: str
    user_id: str
    date: date
    completed: str
    blocked: str
    learned: str

    class Config:
        from_attributes = True
