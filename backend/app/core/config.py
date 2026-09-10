from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    app_name: str = "PrimeHomes Real Estate Lead Bot"
    app_env: str = "development"
    debug: bool = True

    # Database – SQLite for easy local start, switch to Postgres later
    database_url: str = "sqlite:///./real_estate_leads.db"

    # CORS
    cors_origins: str = "http://localhost:3000,http://localhost:5173"

    # n8n
    n8n_webhook_url: str = "http://localhost:5678/webhook/lead-process-message"
    n8n_webhook_secret: str = "change-me"

    # Auth (placeholder for later)
    jwt_secret: str = "change-this-to-a-long-random-secret"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    return Settings()
