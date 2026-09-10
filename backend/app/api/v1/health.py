from fastapi import APIRouter
from app.core.config import get_settings

router = APIRouter()
settings = get_settings()


@router.get("/health")
def health_check():
    """Basic health check endpoint."""
    return {
        "status": "ok",
        "service": settings.app_name,
        "env": settings.app_env,
    }
