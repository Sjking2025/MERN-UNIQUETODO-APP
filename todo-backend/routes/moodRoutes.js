// routes/moodRoutes.js
const express = require("express");
const { trackMood, getMoodHistory } = require("../controllers/moodController");
const authMiddleware = require("../middlleware/authMiddleware");

const router = express.Router();
router.post("/", authMiddleware, trackMood);
router.get("/", authMiddleware, getMoodHistory);
module.exports = router;
