import { useEffect, useState } from "react";
import API, { getAuthHeaders, logout, getToken } from "../utils/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);

  const navigate = useNavigate();

  // 🌙 SAVE DARK MODE
  useEffect(() => {
    const saved = localStorage.getItem("dark");
    if (saved === "true") setDark(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("dark", dark);
  }, [dark]);

  const fetchTasks = async () => {
    setLoading(true);
    const res = await fetch(`${API}/tasks`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    } else {
      fetchTasks();
    }
  }, []);

  const addTask = async (form) => {
    const cleanForm = {
      ...form,
      dueDate: form.dueDate || null,
    };

    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(cleanForm),
    });

    fetchTasks();
  };

  const updateTask = async (id, form) => {
    await fetch(`${API}/tasks/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(form),
    });
    setEditing(null);
    fetchTasks();
  };

  const completeTask = async (id) => {
    await fetch(`${API}/tasks/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status: "completed" }),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/tasks/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    fetchTasks();
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = total - completed;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className={dark ? "bg-gray-900 text-white min-h-screen p-6" : "bg-gray-100 min-h-screen p-6"}>
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">
            🚀 Task Manager
          </h1>

          <div className="flex gap-2">
            <button
              onClick={() => setDark(!dark)}
              className="bg-black text-white px-3 py-1 rounded"
            >
              {dark ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* 📊 STATS */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-xl font-bold">{total}</h2>
            <p>Total</p>
          </div>

          <div className="bg-green-100 p-4 rounded shadow text-center">
            <h2 className="text-xl font-bold">{completed}</h2>
            <p>Completed</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded shadow text-center">
            <h2 className="text-xl font-bold">{pending}</h2>
            <p>Pending</p>
          </div>
        </div>

        {/* 📊 PROGRESS BAR */}
        <div className="mb-6">
          <p className="text-sm mb-1">Progress: {percent}%</p>
          <div className="w-full bg-gray-300 h-2 rounded">
            <div
              className="bg-green-500 h-2 rounded"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>

        {/* FORM */}
        <TaskForm addTask={addTask} editing={editing} updateTask={updateTask} />

        {/* LIST */}
        {loading ? (
          <p className="text-center">Loading... ⏳</p>
        ) : (
          <TaskList
            tasks={tasks}
            completeTask={completeTask}
            deleteTask={deleteTask}
            setEditing={setEditing}
          />
        )}
      </div>
    </div>
  );
}