export default function TaskItem({ task, completeTask, deleteTask, setEditing }) {
  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "completed";

  return (
    <div
      className={`bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition border ${
        isOverdue ? "border-l-4 border-red-500 bg-red-50" : ""
      }`}
    >
      <div className="flex justify-between items-start">

        {/* LEFT */}
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>

          <p className="text-sm text-gray-500 mt-1">
            📅 {task.dueDate
              ? new Date(task.dueDate).toDateString()
              : "No due date"}
          </p>

          {/* 🔥 Priority Badge */}
          <span
            className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
              task.priority === "high"
                ? "bg-red-100 text-red-600"
                : task.priority === "medium"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {task.priority.toUpperCase()}
          </span>

          <p className="text-sm mt-1">
            Status:{" "}
            <span
              className={
                task.status === "completed"
                  ? "text-green-600 font-semibold"
                  : "text-gray-600"
              }
            >
              {task.status}
            </span>
          </p>
        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex gap-2">
          <button
            onClick={() => completeTask(task.id)}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            ✓
          </button>

          <button
            onClick={() => setEditing(task)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
          >
            ✏️
          </button>

          <button
            onClick={() => {
              if (window.confirm("Delete this task?")) {
                deleteTask(task.id);
              }
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}