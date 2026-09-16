"""
Centralized app settings.

Kept intentionally small for the MVP: everything the API needs to know about
its environment lives here, read from environment variables so the same code
can later point at a real Postgres/Supabase instance without changes to
business logic elsewhere in the app.
"""
import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    APP_NAME: str = "KITEBud API"
    API_PREFIX: str = "/api"

    # Comma separated list of allowed origins for CORS.
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")

    # Not used by the MVP's in-memory data store, but reserved so the
    # services layer already expects a connection string to appear here
    # once Postgres/Supabase is introduced.
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.FRONTEND_URL.split(",") if origin.strip()]


settings = Settings()
