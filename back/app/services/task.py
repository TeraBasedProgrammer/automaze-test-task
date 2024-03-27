from app.reposiories.task import TaskRepository
from app.models.db.task import Task
from app.models.schemas.task import TaskSchema


class TaskService:
    def __init__(self, task_repository: TaskRepository):
        self.task_repository = task_repository

    async def get_tasks(self) -> list[TaskSchema]:
        tasks: list[Task] = await self.task_repository.get_tasks()
        return [
            TaskSchema(
                id=task.id,
                title=task.title,
                priority=task.priority,
                is_done=task.is_done,
            )
            for task in tasks
        ]
