from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application configuration."""

    APP_NAME: str = "ExecuStra API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # Supabase
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""

    # JWT
    SECRET_KEY: str = "execustra-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours

    # AI Layer
    OPENROUTER_API_KEY: str = ""
    AI_MODEL: str = "mistralai/mistral-7b-instruct"

    # CORS
    ALLOWED_ORIGINS: list[str] = ["http://localhost:5173", "http://localhost:3000"]

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
