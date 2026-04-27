import { useState, useEffect } from "react";

export default function TaskForm({ addTask, editing, updateTask }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      updateTask(editing.id, form);
    } else {
      addTask(form);
    }

    setForm({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <div className="flex flex-col gap-2">

        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />

        <select
          className="border p-2 rounded"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="low">Low 🟢</option>
          <option value="medium">Medium 🟡</option>
          <option value="high">High 🔴</option>
        </select>

        <button className="bg-blue-600 text-white p-2 rounded">
          {editing ? "Update Task" : "Add Task"}
        </button>
      </div>
    </form>
  );
}