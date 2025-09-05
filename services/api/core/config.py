from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    supabase_url: str
    supabase_anon_key: str = ""  # Make optional with default
    supabase_service_role_key: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# Debug: Check if variables exist (without exposing values)
print("Environment variable status:")
for key in ["SUPABASE_URL", "SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"]:
    exists = key in os.environ
    print(f"{key}: {'EXISTS' if exists else 'MISSING'}")

settings = Settings()

settings = Settings()
