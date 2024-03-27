from typing import Optional

from fastapi import HTTPException, status
from pydantic import BaseModel, field_validator


class TaskBaseSchema(BaseModel):
    title: str
    is_done: Optional[bool]
    priority: Optional[int]

    @field_validator("priority")
    @classmethod
    def validate_priority(cls, value):
        if value is None:
            return

        if not 1 <= value <= 10:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail='The "priority" field can only contain an integer from 1 to 10',
            )
        

class TaskUpdateSchema(TaskBaseSchema):
    title: Optional[str]
