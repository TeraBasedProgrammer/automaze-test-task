from sqlalchemy import Select, UnaryExpression, select

from app.models.db.task import Task
from app.models.schemas.task import TaskBaseSchema, TaskUpdateSchema
from app.reposiories.base import BaseRepository


class TaskRepository(BaseRepository):
    model = Task

    async def create_task(self, task_data: TaskBaseSchema) -> int:
        new_task: Task = await self.create(task_data)
        return new_task.id

    async def get_tasks(self, search_query: str, sort_string: str) -> list[Task]:
        sort_order: UnaryExpression = (
            Task.priority.asc() if sort_string == "asc" else Task.priority.desc()
        )
        
        query: Select = (
            select(Task).where(Task.title.icontains(search_query)).order_by(sort_order)
        )
        return self.unpack(await self.get_many(query))

    async def update_task(self, task_id: int, task_data: TaskUpdateSchema) -> Task:
        updated_task: Task = await self.update(task_id, task_data)
        return updated_task

    async def delete_task(self, task_id: int) -> None:
        await self.delete(task_id)
