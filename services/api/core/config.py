from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    supabase_url: str
    supabase_anon_key: str = ""  # Make optional with default
    supabase_service_role_key: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# Debug: Print what Railway is actually providing
print("Environment variables available:")
for key in ["SUPABASE_URL", "SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"]:
    value = os.environ.get(key, "NOT_FOUND")
    print(f"{key}: {value[:20]}..." if len(value) > 20 else f"{key}: {value}")

settings = Settings()             # Singleton import

settings = Settings()
