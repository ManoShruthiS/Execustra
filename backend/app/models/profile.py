"""Profile model — maps to Supabase 'profiles' table."""

from dataclasses import dataclass, field
from typing import Optional


@dataclass
class Profile:
    user_id: str
    goal: str
    consistency_level: str  # low, medium, high
    blockers: list[str] = field(default_factory=list)
    task_completion_rate: float = 0.0
    consistency_score: float = 0.0
    identified_weaknesses: list[str] = field(default_factory=list)
