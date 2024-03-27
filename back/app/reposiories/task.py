from sqlalchemy import select

from app.models.db.task import Task
from app.models.schemas.task import TaskBaseSchema, TaskUpdateSchema
from app.reposiories.base import BaseRepository


class TaskRepository(BaseRepository):
    model = Task

    async def create_task(self, task_data: TaskBaseSchema) -> int:
        new_task: Task = await self.create(task_data)
        return new_task.id

    async def get_tasks(self) -> list[Task]:
        return await self.get_many(select(Task))

    async def update_task(self, task_id: int, task_data: TaskUpdateSchema) -> Task:
        updated_task: Task = await self.update(task_id, task_data)
        return updated_task
    
    async def delete_task(self, task_id: int) -> None:
        await self.delete(task_id)