import React, { useState } from 'react';
import '../styles/TaskList.css';

const TaskList = ({ tasks, onDelete, onUpdate }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({ title: '', description: '' });

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setUpdatedTask({ title: task.title, description: task.description });
  };

  const handleUpdate = (id) => {
    onUpdate(id, updatedTask);
    setEditingTaskId(null);
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className="task-item">
          {editingTaskId === task._id ? (
            <div>
              <input
                type="text"
                value={updatedTask.title}
                onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
              />
              <textarea
                value={updatedTask.description}
                onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
              />
              <button onClick={() => handleUpdate(task._id)}>Save</button>
              <button onClick={() => setEditingTaskId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="task-actions">
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => onDelete(task._id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;