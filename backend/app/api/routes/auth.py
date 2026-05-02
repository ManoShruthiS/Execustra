"""Authentication routes."""

from fastapi import APIRouter, HTTPException, status
from app.schemas.user import UserCreate, UserLogin, TokenResponse, UserResponse
from app.core.security import hash_password, verify_password, create_access_token
from datetime import datetime
import uuid

router = APIRouter(prefix="/auth", tags=["Authentication"])

# In-memory store for MVP — replace with Supabase in production
_users_db: dict[str, dict] = {}


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate):
    """Register a new user."""
    # Check if email already exists
    for u in _users_db.values():
        if u["email"] == user_data.email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

    user_id = str(uuid.uuid4())
    hashed = hash_password(user_data.password)
    now = datetime.utcnow()

    _users_db[user_id] = {
        "id": user_id,
        "email": user_data.email,
        "password_hash": hashed,
        "created_at": now,
    }

    token = create_access_token({"sub": user_id, "email": user_data.email})

    return TokenResponse(
        access_token=token,
        user=UserResponse(id=user_id, email=user_data.email, created_at=now),
    )


@router.post("/login", response_model=TokenResponse)
async def login(user_data: UserLogin):
    """Authenticate a user."""
    user = None
    for u in _users_db.values():
        if u["email"] == user_data.email:
            user = u
            break

    if not user or not verify_password(user_data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token({"sub": user["id"], "email": user["email"]})

    return TokenResponse(
        access_token=token,
        user=UserResponse(
            id=user["id"],
            email=user["email"],
            created_at=user["created_at"],
        ),
    )
