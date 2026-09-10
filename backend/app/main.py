from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.db.session import engine, Base
from app.api.v1.health import router as health_router
from app.api.v1.leads import router as leads_router

settings = get_settings()

# Create tables on startup (simple approach for MVP)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.app_name,
    description="API for lead intake, qualification, and management",
    version="0.1.0",
)

origins = [o.strip() for o in settings.cors_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api/v1", tags=["health"])
app.include_router(leads_router, prefix="/api/v1", tags=["leads", "chat"])


@app.get("/")
def root():
    return {
        "service": settings.app_name,
        "status": "running",
        "docs": "/docs",
        "health": "/api/v1/health",
    }
