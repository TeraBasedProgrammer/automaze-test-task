'use client';
import TodoItem from './ui/TodoItem';
import TodoModal from './ui/TodoModal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDebounce } from './lib/hooks';

interface Task {
  id: number;
  title: string;
  priority: number;
  is_done: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [sortQuery, setSortQuery] = useState('desc');
  const [filterQuery, setFilterQuery] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const debouncedSearch = useDebounce(search);

  function DeleteTask(id: number) {
    axios.delete(`http://ec2-3-76-208-35.eu-central-1.compute.amazonaws.com:8000/tasks/${id}/delete/`).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  }

  function AddTask(title: string, priority: number) {
    const data = { title: title, is_done: false, priority: priority };
    if (title === '') {
      return;
    }

    axios.post('http://ec2-3-76-208-35.eu-central-1.compute.amazonaws.com:8000/tasks/add/', data).then(() => {
      GetData();
    });
  }

  function GetData() {
    axios
      .get(
        `http://ec2-3-76-208-35.eu-central-1.compute.amazonaws.com:8000/tasks/get_all/?sort=${sortQuery}&search=${debouncedSearch}&filter=${filterQuery}`,
      )
      .then((resp) => {
        setTasks(resp.data);
      });
  }

  useEffect(() => {
    GetData();
  }, [sortQuery, filterQuery, debouncedSearch]);

  return (
    <div className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32">
      <div className="text-2xl">Todo List</div>
      <div className="flex gap-16">
        <div className="flex gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1">
            New task
          </button>
          <TodoModal
            mode='create'
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={AddTask}
          />
        </div>
        <input
          className="text-xl rounded-md shadow-md"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="sort">Sort by priority:</label>
        <select onChange={(e) => setSortQuery(e.target.value)} name="sort" id="sort">
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
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
              dataCallback={() => GetData()}
              isDone={task.is_done}
              onDelete={() => DeleteTask(task.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
