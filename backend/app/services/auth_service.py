"""Auth service — handles authentication logic."""

from app.core.security import hash_password, verify_password, create_access_token
from typing import Optional
import uuid
from datetime import datetime


class AuthService:
    """Service for handling user authentication."""

    def __init__(self):
        self._users: dict[str, dict] = {}

    def register(self, email: str, password: str) -> dict:
        """Register a new user."""
        # Check for existing email
        for u in self._users.values():
            if u["email"] == email:
                raise ValueError("Email already registered")

        user_id = str(uuid.uuid4())
        user = {
            "id": user_id,
            "email": email,
            "password_hash": hash_password(password),
            "created_at": datetime.utcnow(),
        }
        self._users[user_id] = user

        token = create_access_token({"sub": user_id, "email": email})
        return {"user": user, "token": token}

    def login(self, email: str, password: str) -> Optional[dict]:
        """Authenticate a user."""
        for u in self._users.values():
            if u["email"] == email:
                if verify_password(password, u["password_hash"]):
                    token = create_access_token({"sub": u["id"], "email": u["email"]})
                    return {"user": u, "token": token}
                return None
        return None
