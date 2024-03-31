import { useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';

interface TodoItemProps {
  id: number;
  title: string;
  priority: number;
  isDone: boolean;
  onDelete: () => void;
}

export default function TodoItem(props: TodoItemProps) {
  const [taskIsDone, setTaskIsDone] = useState(props.isDone);

  function ChangeTaskState() {
    axios
      .patch(`http://localhost:8000/tasks/${props.id}/update/`, { is_done: !taskIsDone })
      .then(() => setTaskIsDone(!taskIsDone));
  }

  return (
    <div className="bg-violet-600 flex justify-between items-center p-2 rounded-lg shadow-md">
      <div className="flex gap-2">
        <input type="checkbox" onChange={() => ChangeTaskState()} />
        <div className={clsx('text-lg', { 'line-through': taskIsDone })}>
          {props.title} | Priority: {props.priority}
        </div>
      </div>
      <div className="flex gap-2">
        <button className="text-xl shadow-md bg-green-600 text-white hover:bg-green-500 rounded-md px-2">
          Edit
        </button>
        <button
          onClick={props.onDelete}
          className="text-xl shadow-md bg-red-600 text-white hover:bg-red-500 rounded-md px-2">
          Delete
        </button>
      </div>
    </div>
  );
}
