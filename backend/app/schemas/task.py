from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


class TaskBase(BaseModel):
    task_text: str
    duration: str = "25 min"
    category: str = "skill"


class TaskCreate(TaskBase):
    pass


class TaskResponse(TaskBase):
    id: str
    user_id: str
    date: date
    status: str = "pending"
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class TaskUpdate(BaseModel):
    status: str  # pending, completed, skipped


class DailyTasksResponse(BaseModel):
    date: date
    tasks: list[TaskResponse]
    completion_rate: float
