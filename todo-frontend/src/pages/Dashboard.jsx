import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import '../styles/Dashboard.css';

const Dashboard = ({ user }) => {
  const [tasks, setTasks] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        
        // Ensure the response is an array
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error('Invalid tasks data:', response.data);
          setTasks([]); // Set tasks to an empty array
        }
      } catch (err) {
        console.error('Failed to fetch tasks:', err.response?.data);
        if (err.response?.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('Failed to fetch tasks. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [navigate]);

  // Add a new task
  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks([...tasks, response.data]);
    } catch (err) {
      console.error('Failed to add task:', err.response?.data);
      setError('Failed to add task. Please try again.');
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err.response?.data);
      setError('Failed to delete task. Please try again.');
    }
  };

  // Update a task
  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (err) {
      console.error('Failed to update task:', err.response?.data);
      setError('Failed to update task. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.username}!</h1>

      {/* Display error messages */}
      {error && <p className="error">{error}</p>}

      {/* Task Form */}
      <TaskForm onSubmit={addTask} />

      {/* Loading State */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        /* Task List */
        tasks.length > 0 ? (
          <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
        ) : (
          <p>No tasks found. Add a new task to get started!</p>
        )
      )}
    </div>
  );
};

export default Dashboard;