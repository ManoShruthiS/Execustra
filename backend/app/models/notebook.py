"""Notebook model — maps to Supabase 'notebooks' table."""

from dataclasses import dataclass, field
from datetime import datetime


@dataclass
class Notebook:
    id: str
    user_id: str
    title: str = "Untitled Note"
    content: str = ""
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)
