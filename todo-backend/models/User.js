const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  points: { type: Number, default: 0 }, // For task completion rewards
  moods: [
    // For mood tracking
    {
      mood: { type: String, enum: ["happy", "neutral", "sad"], required: true },
      date: { type: Date, default: Date.now },
    },
  ],
});
module.exports = mongoose.model("User", userSchema);
