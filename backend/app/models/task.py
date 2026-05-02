"""Task model — maps to Supabase 'tasks' table."""

from dataclasses import dataclass, field
from datetime import date, datetime
from typing import Optional


@dataclass
class Task:
    id: str
    user_id: str
    task_text: str
    date: date
    status: str = "pending"  # pending, completed, skipped
    duration: str = "25 min"
    category: str = "skill"  # skill, learning, reflection
    completed_at: Optional[datetime] = None
