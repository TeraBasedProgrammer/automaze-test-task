'use client';
import TodoItem from './ui/todo_item';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  priority: number;
  is_done: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [sortQuery, setSortQuery] = useState('desc');
  const [filterQuery, setFilterQuery] = useState('all');

  function DeleteTask(id: number) {
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
    console.log(sortQuery)
    axios
      .get(
        `http://localhost:8000/tasks/get_all/?sort=${sortQuery}&search=${searchText}&filter=${filterQuery}`,
      )
      .then((resp) => {
        setTasks(resp.data);
      });
  }

  useEffect(() => {
    GetData();
  }, [sortQuery, filterQuery]);

  return (
    <div className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32">
      <div className="text-2xl">Todo List</div>
      <div className="flex gap-16">
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
        <input
          className="text-xl rounded-md shadow-md"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <label htmlFor="sort">Sort by priority:</label>
        <select onChange={(e) => setSortQuery(e.target.value)} name="sort" id="sort">
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <label htmlFor="filter">Show tasks:</label>
        <select onChange={(e) => setFilterQuery(e.target.value)} name="filter" id="filter">
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="undone">Undone</option>
        </select>
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
              onDelete={() => DeleteTask(task.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
