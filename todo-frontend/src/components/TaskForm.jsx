import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Calendar, Flag, FileText } from "lucide-react";
import { Button } from "./ui/Button";

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onSubmit({ title, description, dueDate: dueDate || new Date(), priority });
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
    setIsExpanded(false);
  };

  const priorities = [
    { value: "high", label: "High", color: "#ef4444", bgColor: "rgba(239, 68, 68, 0.2)" },
    { value: "medium", label: "Medium", color: "#f59e0b", bgColor: "rgba(245, 158, 11, 0.2)" },
    { value: "low", label: "Low", color: "#22c55e", bgColor: "rgba(34, 197, 94, 0.2)" },
  ];

  const cardStyle = {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "12px",
    padding: "16px",
    border: "1px solid rgba(255,255,255,0.1)",
    marginBottom: "16px",
  };

  const inputStyle = {
    flex: 1,
    height: "44px",
    padding: "0 16px",
    paddingLeft: "44px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    fontSize: "14px",
    outline: "none",
  };

  const textareaStyle = {
    width: "100%",
    height: "80px",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    fontSize: "14px",
    outline: "none",
    resize: "none",
    marginTop: "12px",
  };

  const dateInputStyle = {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    fontSize: "14px",
    outline: "none",
  };

  return (
    <div style={cardStyle}>
      <form onSubmit={handleSubmit}>
        {/* Title Row */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <FileText 
              size={18} 
              style={{ 
                position: "absolute", 
                left: "14px", 
                top: "50%", 
                transform: "translateY(-50%)",
                color: "rgba(255,255,255,0.4)",
              }} 
            />
            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              style={inputStyle}
              required
            />
          </div>
          <Button type="submit" style={{ height: "44px", padding: "0 20px" }}>
            <Plus size={18} />
            <span style={{ marginLeft: "8px" }}>Add Task</span>
          </Button>
        </div>

        {/* Expanded Fields */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            style={{ overflow: "hidden" }}
          >
            <textarea
              placeholder="Add a description (optional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={textareaStyle}
            />

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "12px", alignItems: "center" }}>
              {/* Due Date */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Calendar size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  style={dateInputStyle}
                />
              </div>

              {/* Priority Pills */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Flag size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
                <div style={{ display: "flex", gap: "8px" }}>
                  {priorities.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setPriority(p.value)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "500",
                        border: priority === p.value ? `1px solid ${p.color}` : "1px solid rgba(255,255,255,0.1)",
                        background: priority === p.value ? p.bgColor : "transparent",
                        color: priority === p.value ? p.color : "rgba(255,255,255,0.6)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default TaskForm;
