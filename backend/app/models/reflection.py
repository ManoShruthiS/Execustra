"""Reflection model — maps to Supabase 'reflections' table."""

from dataclasses import dataclass
from datetime import date


@dataclass
class Reflection:
    id: str
    user_id: str
    date: date
    completed: str = ""
    blocked: str = ""
    learned: str = ""
