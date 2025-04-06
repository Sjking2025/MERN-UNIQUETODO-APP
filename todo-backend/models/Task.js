const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "medium",
  },
});
module.exports = mongoose.model("Task", taskSchema);
