"""ExecuStra — FastAPI Backend Application."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.api.routes import auth, onboarding, tasks, reflection, profile, notebook, focus

settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Adaptive Life OS — Behavioral execution system API",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router, prefix="/api")
app.include_router(onboarding.router, prefix="/api")
app.include_router(tasks.router, prefix="/api")
app.include_router(reflection.router, prefix="/api")
app.include_router(profile.router, prefix="/api")
app.include_router(notebook.router, prefix="/api")
app.include_router(focus.router, prefix="/api")


@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "ExecuStra API — Adaptive Life OS",
        "docs": "/api/docs",
    }
