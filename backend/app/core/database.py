from supabase import create_client, Client
from app.core.config import get_settings

settings = get_settings()

supabase: Client | None = None


def get_supabase() -> Client:
    """Get or create Supabase client."""
    global supabase
    if supabase is None and settings.SUPABASE_URL and settings.SUPABASE_KEY:
        supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    return supabase
