from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.health import router as health_router

app = FastAPI(
    title="PrimeHomes Realty — Real Estate Lead Bot",
    description="API for lead intake, qualification, and management",
    version="0.1.0",
)

# CORS — adjust origins via environment in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api/v1", tags=["health"])


@app.get("/")
def root():
    return {
        "service": "PrimeHomes Real Estate Lead Bot",
        "status": "running",
        "docs": "/docs",
    }
