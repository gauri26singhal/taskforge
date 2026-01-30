import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all");
  const [goal, setGoal] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const navigate = useNavigate();

  const userInitial = "U";

  const headers = {
    headers: { Authorization: localStorage.getItem("token") },
  };

  // 🌙 Dark Mode Effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // 🔄 Fetch Tasks
  const fetchAll = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", headers);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // ➕ Add Task
  const addTask = async () => {
    if (!title) return;
    await axios.post(
      "http://localhost:5000/api/tasks",
      { title, priority },
      headers
    );
    setTitle("");
    fetchAll();
  };

  // ✅ Toggle Task
  const toggleTask = async (id, done) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { isCompleted: !done },
      headers
    );
    fetchAll();
  };

  // 🗑 Delete Task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, headers);
    fetchAll();
  };

  // 🤖 AI Tasks
  const getAISuggestions = async () => {
    if (!goal) return;

    const res = await axios.post(
      "http://localhost:5000/api/ai/suggest",
      { goal },
      headers
    );

    for (let t of res.data) {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title: t, priority: "medium" },
        headers
      );
    }
    setGoal("");
    fetchAll();
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // 🔍 Filters
  const filtered = tasks.filter((t) => {
    if (filter === "completed") return t.isCompleted;
    if (filter === "pending") return !t.isCompleted;
    return true;
  });

  const completed = tasks.filter((t) => t.isCompleted).length;
  const percent = (completed / tasks.length) * 100 || 0;

  return (
    <div className="p-10 min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">TaskForge 📝</h1>

        <div className="flex items-center gap-4">
          {/* 🌙 Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* PROFILE */}
          <div className="relative">
            <div
              onClick={() => setOpenMenu(!openMenu)}
              className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold cursor-pointer"
            >
              {userInitial}
            </div>

            {openMenu && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded w-32 z-50">
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ADD TASK */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded shadow mb-5">
        <input
          className="border p-2 mr-2 dark:bg-gray-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
        />
        <select
          className="border p-2 mr-2 dark:bg-gray-700"
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>low</option>
          <option>medium</option>
          <option>high</option>
        </select>
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* PROGRESS */}
      <div className="mb-4">
        <div className="w-full bg-gray-300 h-4 rounded">
          <div
            className="bg-purple-600 h-4 rounded transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-1">{percent.toFixed(0)}% completed</p>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-4">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      {/* AI GOAL */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded mb-6">
        <input
          className="border p-2 w-2/3 dark:bg-gray-700"
          placeholder="Enter your goal (eg: Prepare for exams)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <button
          onClick={getAISuggestions}
          className="bg-purple-600 text-white px-4 py-2 ml-3 rounded"
        >
          🤖 Generate Tasks
        </button>
      </div>

      {/* TASK LIST */}
      {filtered.map((t) => (
        <motion.div
          key={t._id}
          layout
          whileHover={{ scale: 1.02 }}
          className={`p-3 mb-3 rounded shadow flex justify-between cursor-pointer ${
            t.isCompleted
              ? "bg-green-300 dark:bg-green-700"
              : "bg-white dark:bg-gray-800"
          }`}
        >
          <span onClick={() => toggleTask(t._id, t.isCompleted)}>
            {t.title} ({t.priority})
          </span>
          <button
            onClick={() => deleteTask(t._id)}
            className="text-red-500"
          >
            ✖
          </button>
        </motion.div>
      ))}
    </div>
  );
}
