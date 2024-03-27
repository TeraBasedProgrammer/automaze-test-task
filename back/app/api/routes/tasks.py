from fastapi import APIRouter, Depends

from app.api.dependencies.services import get_tasks_service
from app.services.task import TaskService
from app.models.schemas.task import TaskSchema


task_router = APIRouter(prefix="/tasks")


@task_router.get("/get_tasks", response_model=TaskSchema)
async def get_tasks(tasks_service: TaskService = Depends(get_tasks_service)):
    return await tasks_service.get_tasks()
