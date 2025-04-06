const Task = require("../models/Task");

// Add Task
exports.addTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new Task({ title, description, user: req.userId });
    await task.save();
    res.status(201).json(task); // Return the created task
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Tasks
exports.getTasks = async (req, res) => {
  const { filter } = req.query;
  let query = { user: req.userId };

  if (filter === "completed") query.completed = true;
  else if (filter === "pending") query.completed = false;
  else if (filter === "dueToday") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    query.dueDate = {
      $gte: today,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    };
  }

  try {
    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(task); // Return the updated task
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTaskCompletion = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const wasCompleted = task.completed;
    task.completed = !task.completed;
    task.completedDate = task.completed ? new Date() : null;
    await task.save();

    // Award points only if newly completed today
    if (task.completed && !wasCompleted) {
      const user = await User.findById(req.userId);
      user.points += 10;
      await user.save();
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
};
