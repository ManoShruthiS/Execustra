"""User model — maps to Supabase 'users' table."""

from dataclasses import dataclass, field
from datetime import datetime


@dataclass
class User:
    id: str
    email: str
    password_hash: str
    created_at: datetime = field(default_factory=datetime.utcnow)
