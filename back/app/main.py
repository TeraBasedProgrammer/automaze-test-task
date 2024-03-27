from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings.base import settings


app = FastAPI(title="Test app")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=settings.IS_ALLOWED_CREDENTIALS,
    allow_methods=settings.ALLOWED_METHODS,
    allow_headers=settings.ALLOWED_HEADERS,
)
