from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings.base import settings
from app.api.routes.tasks import task_router


app = FastAPI(title="Test app")
app.include_router(task_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=settings.IS_ALLOWED_CREDENTIALS,
    allow_methods=settings.ALLOWED_METHODS,
    allow_headers=settings.ALLOWED_HEADERS,
)
