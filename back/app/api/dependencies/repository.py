from typing import Callable, Type

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.session import get_async_session
from app.reposiories.base import BaseRepository


def get_repository(
    repo_type: Type[BaseRepository],
) -> Callable[[AsyncSession], BaseRepository]:
    def _get_repo(
        async_session: AsyncSession = Depends(get_async_session),
    ) -> BaseRepository:
        return repo_type(async_session=async_session)

    return _get_repo
