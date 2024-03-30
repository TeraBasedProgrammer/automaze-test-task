export default function TodoItem({title, priority, is_done}: {title: string, priority: number, is_done: boolean}) {
  return (
    <div className="bg-violet-600 flex justify-between items-center p-2 rounded-lg shadow-md">
      <div className="flex gap-2">
        <input type="checkbox" />
        <div className="text-lg">{title} | Priority:{priority}</div>
      </div>
      <div className="flex gap-2">
        <button className="text-xl shadow-md bg-green-600 text-white hover:bg-green-500 rounded-md px-2">
          Edit
        </button>
        <button className="text-xl shadow-md bg-red-600 text-white hover:bg-red-500 rounded-md px-2">
          Delete
        </button>
      </div>
    </div>
  );
}
