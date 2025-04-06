// controllers/moodController.js
const Mood = require("../models/Mood");

exports.trackMood = async (req, res) => {
  try {
    const { mood } = req.body;
    const newMood = new Mood({ user: req.userId, mood });
    await newMood.save();
    res.status(201).json(newMood);
  } catch (err) {
    res.status(500).json({ error: "Failed to track mood" });
  }
};

exports.getMoodHistory = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.userId }).sort({ date: -1 });
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch mood history" });
  }
};
