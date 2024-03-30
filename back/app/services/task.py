from fastapi import HTTPException, status

from app.models.db.task import Task
from app.models.schemas.task import (
    TaskBaseSchema,
    TaskCreateResponse,
    TaskSchema,
    TaskUpdateSchema,
)
from app.reposiories.task import TaskRepository


class TaskService:
    def __init__(self, task_repository: TaskRepository):
        self.task_repository = task_repository

    async def _validate_task_exists(self, task_id: int) -> None:
        if not await self.task_repository.exists_by_id(task_id):
            raise HTTPException(
                status.HTTP_404_NOT_FOUND,
                detail="Task with this id is not found",
            )

    async def get_tasks(
        self, search_query: str, sort_string: str, filter: str
    ) -> list[TaskSchema]:
        tasks: list[Task] = await self.task_repository.get_tasks(
            search_query, sort_string, filter
        )
        return [
            TaskSchema(
                id=task.id,
                title=task.title,
                priority=task.priority,
                is_done=task.is_done,
            )
            for task in tasks
        ]

    async def add_task(self, task_data: TaskBaseSchema) -> TaskCreateResponse:
        new_task_id: Task = await self.task_repository.create_task(task_data)
        return TaskCreateResponse(id=new_task_id)

    async def update_task(self, task_id: int, task_data: TaskUpdateSchema) -> None:
        await self._validate_task_exists(task_id)
        await self.task_repository.update_task(task_id, task_data)

    async def delete_task(self, task_id: int) -> None:
        await self._validate_task_exists(task_id)
        await self.task_repository.delete_task(task_id)
