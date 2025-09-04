from supabase import create_client
from .config import settings

supabase = create_client(
    settings.supabase_url,
    settings.supabase_service_role_key      # server-side key → bypass RLS policies you choose
)

