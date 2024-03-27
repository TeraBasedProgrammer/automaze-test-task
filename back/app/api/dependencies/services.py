from fastapi import Depends

from app.reposiories.task import TaskRepository
from app.services.task import TaskService
from app.api.dependencies.repository import get_repository


def get_tasks_service(
    task_repository=Depends(get_repository(TaskRepository)),
) -> TaskService:
    service = TaskService(task_repository)
    return service
