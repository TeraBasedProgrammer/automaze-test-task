'use client';
import TodoItem from './ui/todo_item';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  priority: number;
  is_done: boolean;
}

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  function deleteTask(id: number) {
    axios.delete(`http://localhost:8000/tasks/${id}/delete/`).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  }

  function AddTask() {
    const data = { title: `${inputText}`, is_done: false, priority: 1 };
    if (inputText === '') {
      return;
    }

    axios.post('http://localhost:8000/tasks/add/', data).then(() => {
      setInputText('');
      GetData();
    });
  }

  function GetData() {
    axios.get('http://localhost:8000/tasks/get_all/').then((resp) => {
      setTasks(resp.data);
    });
  }

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32">
      <div className="text-2xl">Todo List</div>
      <div className="flex gap-2">
        <input
          className="text-xl rounded-md shadow-md"
          type="text"
          placeholder="Enter the task"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={() => AddTask()}
          className="text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1">
          Add
        </button>
      </div>
      <div className="w-3/6 flex flex-col gap-2">
        {tasks.map((task) => {
          return (
            <TodoItem
              key={task.id}
              id={task.id}
              title={task.title}
              priority={task.priority}
              isDone={task.is_done}
              onDelete={() => deleteTask(task.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
