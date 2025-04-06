import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import MoodTracker from "../components/MoodTracker";
import "../styles/Dashboard.css";

const Dashboard = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch tasks and mood data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tasks
        const tasksResponse = await axios.get(
          "http://localhost:5000/api/tasks",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTasks(tasksResponse.data);

        // Fetch mood data
        const moodResponse = await axios.get("http://localhost:5000/api/mood", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMoodData(moodResponse.data);
      } catch (err) {
        console.error("Failed to fetch data:", err.response?.data);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to fetch data. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  // Add a new task
  const addTask = async (task) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        task,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks([...tasks, response.data]);
    } catch (err) {
      console.error("Failed to add task:", err.response?.data);
      setError("Failed to add task. Please try again.");
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err.response?.data);
      setError("Failed to delete task. Please try again.");
    }
  };

  // Update a task
  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        updatedTask,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (err) {
      console.error("Failed to update task:", err.response?.data);
      setError("Failed to update task. Please try again.");
    }
  };

  // Handle drag-and-drop
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.username}!</h1>
      {error && <p className="error">{error}</p>}
      <TaskForm onSubmit={addTask} />
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <TaskList
            tasks={tasks}
            onDelete={deleteTask}
            onUpdate={updateTask}
            onDragEnd={onDragEnd}
          />
          <MoodTracker moodData={moodData} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
