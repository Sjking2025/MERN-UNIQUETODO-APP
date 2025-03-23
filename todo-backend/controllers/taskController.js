const Task = require('../models/Task');

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
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks); // Return an array of tasks
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

