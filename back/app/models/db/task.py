from enum import Enum

from sqlalchemy import SmallInteger
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] 
    is_done: Mapped[bool] = mapped_column(default=False)
    priority: Mapped[int] = mapped_column(SmallInteger, default=1)
