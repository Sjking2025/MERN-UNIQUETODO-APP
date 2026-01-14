import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CheckCircle2, Clock, Target, TrendingUp,
  Smile, Meh, Frown
} from "lucide-react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import MoodTracker from "../components/MoodTracker";
import { Button } from "../components/ui/Button";

const Dashboard = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [tasksRes, moodRes] = await Promise.all([
          axios.get("http://localhost:5000/api/tasks", { headers }),
          axios.get("http://localhost:5000/api/mood", { headers }),
        ]);

        setTasks(tasksRes.data);
        setMoodData(moodRes.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to fetch data");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const addTask = async (task) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        task,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError("Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        updatedTask,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const trackMood = async (mood) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/mood",
        { mood },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMoodData([response.data, ...moodData]);
    } catch (err) {
      setError("Failed to track mood");
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    { label: "Total Tasks", value: totalTasks, icon: Target, color: "#3b82f6", bgColor: "rgba(59, 130, 246, 0.15)" },
    { label: "Completed", value: completedTasks, icon: CheckCircle2, color: "#22c55e", bgColor: "rgba(34, 197, 94, 0.15)" },
    { label: "In Progress", value: pendingTasks, icon: Clock, color: "#f59e0b", bgColor: "rgba(245, 158, 11, 0.15)" },
    { label: "Completion", value: `${completionRate}%`, icon: TrendingUp, color: "#a855f7", bgColor: "rgba(168, 85, 247, 0.15)" },
  ];

  const moods = [
    { value: "happy", icon: Smile, label: "Happy", color: "#22c55e" },
    { value: "neutral", icon: Meh, label: "Okay", color: "#f59e0b" },
    { value: "sad", icon: Frown, label: "Sad", color: "#ef4444" },
  ];

  // Styles
  const containerStyle = {
    padding: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const headerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
  };

  const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "32px",
  };

  const statCardStyle = {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const mainGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "24px",
  };

  const moodCardStyle = {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "12px",
    padding: "16px",
    border: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 0" }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{ width: "32px", height: "32px", border: "2px solid #a855f7", borderTopColor: "transparent", borderRadius: "50%" }}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={containerStyle}
    >
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "4px" }}>
            Welcome back, <span style={{ color: "#a855f7" }}>{user?.fullName?.split(" ")[0] || user?.username}!</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>Here's your productivity overview</p>
        </div>

        {/* Quick Mood */}
        <div style={moodCardStyle}>
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>How are you?</span>
          <div style={{ display: "flex", gap: "8px" }}>
            {moods.map((m) => (
              <button
                key={m.value}
                onClick={() => trackMood(m.value)}
                style={{
                  padding: "8px",
                  borderRadius: "8px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.6)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => e.target.style.color = m.color}
                onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}
                title={m.label}
              >
                <m.icon size={24} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={statsGridStyle}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            style={statCardStyle}
          >
            <div style={{ padding: "12px", borderRadius: "12px", background: stat.bgColor }}>
              <stat.icon size={24} color={stat.color} />
            </div>
            <div>
              <p style={{ fontSize: "28px", fontWeight: "bold", lineHeight: 1 }}>{stat.value}</p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div style={{ padding: "16px", borderRadius: "8px", background: "rgba(239, 68, 68, 0.2)", color: "#f87171", marginBottom: "24px" }}>
          {error}
        </div>
      )}

      {/* Main Content */}
      <div style={mainGridStyle}>
        {/* Tasks Column */}
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Your Tasks</h2>
          <TaskForm onSubmit={addTask} />
          <div style={{ marginTop: "16px" }}>
            <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
          </div>
        </div>

        {/* Mood Column */}
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Mood Insights</h2>
          <MoodTracker moodData={moodData} />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
