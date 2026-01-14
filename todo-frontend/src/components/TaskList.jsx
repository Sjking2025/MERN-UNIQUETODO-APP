import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Trash2, Edit2, X, Save, Calendar, Flag, GripVertical, Sparkles } from "lucide-react";
import { Button } from "./ui/Button";

const TaskList = ({ tasks, onDelete, onUpdate }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({ title: "", description: "" });
  const [filter, setFilter] = useState("all");
  const [quote, setQuote] = useState("");

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setUpdatedTask({ title: task.title, description: task.description });
  };

  const handleUpdate = (id) => {
    onUpdate(id, updatedTask);
    setEditingTaskId(null);
  };

  const handleTaskCompletion = async (id, completed) => {
    await onUpdate(id, { completed: !completed });
    if (!completed) {
      const quotes = [
        "🎉 Amazing work!",
        "✨ One step closer!",
        "🚀 Task crushed!",
        "💪 You're killing it!",
        "⭐ Another win!",
      ];
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      setTimeout(() => setQuote(""), 3000);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const filters = [
    { value: "all", label: "All" },
    { value: "pending", label: "Active" },
    { value: "completed", label: "Done" },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "#ef4444";
      case "medium": return "#f59e0b";
      case "low": return "#22c55e";
      default: return "rgba(255,255,255,0.2)";
    }
  };

  // Styles
  const filterContainerStyle = {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  };

  const filterButtonStyle = (isActive) => ({
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    background: isActive ? "#8b5cf6" : "rgba(255,255,255,0.05)",
    color: isActive ? "white" : "rgba(255,255,255,0.6)",
    transition: "all 0.2s",
  });

  const quoteStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 16px",
    borderRadius: "8px",
    background: "rgba(139, 92, 246, 0.2)",
    color: "#a78bfa",
    marginBottom: "16px",
    fontWeight: "500",
  };

  const taskCardStyle = (priority, completed) => ({
    background: "rgba(255,255,255,0.03)",
    borderRadius: "12px",
    padding: "16px",
    border: "1px solid rgba(255,255,255,0.08)",
    borderLeft: `4px solid ${getPriorityColor(priority)}`,
    marginBottom: "12px",
    opacity: completed ? 0.6 : 1,
    transition: "all 0.2s",
  });

  const checkboxStyle = (completed) => ({
    width: "22px",
    height: "22px",
    borderRadius: "6px",
    border: completed ? "none" : "2px solid rgba(255,255,255,0.3)",
    background: completed ? "#8b5cf6" : "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    transition: "all 0.2s",
  });

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    fontSize: "14px",
    outline: "none",
    marginBottom: "8px",
  };

  const emptyStyle = {
    textAlign: "center",
    padding: "48px 0",
    color: "rgba(255,255,255,0.5)",
  };

  return (
    <div>
      {/* Filter Tabs */}
      <div style={filterContainerStyle}>
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            style={filterButtonStyle(filter === f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Quote */}
      <AnimatePresence>
        {quote && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={quoteStyle}
          >
            <Sparkles size={18} />
            {quote}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task List */}
      <AnimatePresence>
        {filteredTasks.map((task) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            style={taskCardStyle(task.priority, task.completed)}
          >
            {editingTaskId === task._id ? (
              /* Edit Mode */
              <div>
                <input
                  type="text"
                  value={updatedTask.title}
                  onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
                  style={inputStyle}
                />
                <textarea
                  value={updatedTask.description}
                  onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
                  style={{ ...inputStyle, height: "60px", resize: "none" }}
                />
                <div style={{ display: "flex", gap: "8px" }}>
                  <Button size="sm" onClick={() => handleUpdate(task._id)}>
                    <Save size={14} /> <span style={{ marginLeft: "4px" }}>Save</span>
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditingTaskId(null)}>
                    <X size={14} /> <span style={{ marginLeft: "4px" }}>Cancel</span>
                  </Button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                {/* Checkbox */}
                <div
                  style={checkboxStyle(task.completed)}
                  onClick={() => handleTaskCompletion(task._id, task.completed)}
                >
                  {task.completed && <Check size={14} color="white" />}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    marginBottom: "4px",
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "rgba(255,255,255,0.5)" : "white",
                  }}>
                    {task.title}
                  </h4>
                  {task.description && (
                    <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>
                      {task.description}
                    </p>
                  )}
                  <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                    {task.dueDate && (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Calendar size={12} />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                    <span style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      background: `${getPriorityColor(task.priority)}20`,
                      color: getPriorityColor(task.priority),
                    }}>
                      <Flag size={10} />
                      {task.priority}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    onClick={() => handleEdit(task)}
                    style={{
                      padding: "8px",
                      borderRadius: "6px",
                      border: "none",
                      background: "transparent",
                      color: "rgba(255,255,255,0.5)",
                      cursor: "pointer",
                    }}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(task._id)}
                    style={{
                      padding: "8px",
                      borderRadius: "6px",
                      border: "none",
                      background: "transparent",
                      color: "#ef4444",
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div style={emptyStyle}>
          <p style={{ fontSize: "16px", marginBottom: "4px" }}>No tasks yet</p>
          <p style={{ fontSize: "14px" }}>Add a task above to get started!</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
