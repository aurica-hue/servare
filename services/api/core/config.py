from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    supabase_url: str
    supabase_anon_key: str
    supabase_service_role_key: str

    class Config:
        env_file = ".env"          # Dev-container injects, GH Actions will too
        env_file_encoding = "utf-8"

settings = Settings()             # Singleton import

