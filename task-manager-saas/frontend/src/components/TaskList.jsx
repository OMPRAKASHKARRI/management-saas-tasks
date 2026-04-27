import { useState } from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, completeTask, deleteTask, setEditing }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = tasks
    .filter((t) => (filter === "all" ? true : t.status === filter))
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>

      {/* Filter + Search */}
      <div className="flex gap-2 mb-4">
        <select
          className="border p-2"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <input
          placeholder="Search..."
          className="border p-2 flex-1"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          🚀 No tasks yet. Add your first task!
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              completeTask={completeTask}
              deleteTask={deleteTask}
              setEditing={setEditing}
            />
          ))}
        </div>
      )}
    </div>
  );
}