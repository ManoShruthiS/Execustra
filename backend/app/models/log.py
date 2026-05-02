"""Log model — maps to Supabase 'logs' table."""

from dataclasses import dataclass, field
from datetime import date


@dataclass
class Log:
    user_id: str
    date: date
    completed_tasks: int = 0
    skipped_tasks: int = 0
    total_tasks: int = 0
