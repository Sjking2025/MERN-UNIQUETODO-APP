import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../styles/TaskList.css";

const TaskList = ({ tasks, onDelete, onUpdate, onDragEnd }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
  });
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

  const handleTaskCompletion = async (id) => {
    await onUpdate(id);
    const quotes = [
      "You're doing great!",
      "Small steps lead to big results!",
      "Boom! Task down, legend unlocked! 🎖️",
      "One more task conquered! You’re on fire! 🔥",
      "Task ✅ Done & dusted! Time to flex. 💪",
      "You just leveled up in productivity! 🚀",
      "Ding! You earned +100 Focus Points! 🎯",
      "Task completed! Adulting like a pro. 🏆",
      "Who’s the boss? YOU are! 🎩✨",
      "Boom shakalaka! Another one bites the dust. 💥",
      "If tasks had feelings, they’d fear you. 😈",
      "Done! Now go reward yourself with memes. 😆",
      "Every small win leads to a bigger victory! 🎯",
      "One step closer to your goals—keep going! 💪",
      "Hard work pays off—look at you smashing it! 🚀",
      "Tiny tasks, big impact! Keep it up! 🌟",
      "You just proved that consistency wins! 🏅",
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="task-list">
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
      {quote && <div className="quote">{quote}</div>}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {filteredTasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="task-item"
                    >
                      {editingTaskId === task._id ? (
                        <div>
                          <input
                            type="text"
                            value={updatedTask.title}
                            onChange={(e) =>
                              setUpdatedTask({
                                ...updatedTask,
                                title: e.target.value,
                              })
                            }
                          />
                          <textarea
                            value={updatedTask.description}
                            onChange={(e) =>
                              setUpdatedTask({
                                ...updatedTask,
                                description: e.target.value,
                              })
                            }
                          />
                          <button onClick={() => handleUpdate(task._id)}>
                            Save
                          </button>
                          <button onClick={() => setEditingTaskId(null)}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div>
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                          <p className="due-date">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                          <p className="priority">Priority: {task.priority}</p>
                          <div className="task-actions">
                            <button onClick={() => handleEdit(task)}>
                              Edit
                            </button>
                            <button onClick={() => onDelete(task._id)}>
                              Delete
                            </button>
                            <button
                              onClick={() => handleTaskCompletion(task._id)}
                            >
                              {task.completed ? "Undo" : "Complete"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
