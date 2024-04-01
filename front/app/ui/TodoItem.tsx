import { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import TodoModal from './TodoModal';

interface TodoItemProps {
  id: number;
  title: string;
  priority: number;
  dataCallback: () => void;
  isDone: boolean;
  onDelete: () => void;
}

export default function TodoItem(props: TodoItemProps) {
  const [taskIsDone, setTaskIsDone] = useState(props.isDone);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    props.dataCallback();
  }, [taskIsDone]);

  function ChangeTaskState() {
    axios
      .patch(`http://localhost:8000/tasks/${props.id}/update/`, { is_done: !taskIsDone })
      .then(() => {
        setTaskIsDone(!taskIsDone);
      });
  }

  function EditTask(title: string, priority: number) {
    axios
      .patch(`http://localhost:8000/tasks/${props.id}/update/`, {
        title: title,
        priority: priority,
      })
      .then(() => props.dataCallback());
  }

  return (
    <div className="bg-violet-600 flex justify-between items-center p-2 rounded-lg shadow-md">
      <div className="flex gap-2">
        <input type="checkbox" checked={taskIsDone} onChange={() => ChangeTaskState()} />
        <div className={clsx('text-lg', { 'line-through': taskIsDone })}>
          {props.title} | Priority: {props.priority}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="text-xl shadow-md bg-green-600 text-white hover:bg-green-500 rounded-md px-2">
          Edit
        </button>
        <button
          onClick={props.onDelete}
          className="text-xl shadow-md bg-red-600 text-white hover:bg-red-500 rounded-md px-2">
          Delete
        </button>
        <TodoModal
          initialPriority={props.priority}
          initialTitle={props.title}
          mode="update"
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={EditTask}
        />
      </div>
    </div>
  );
}
