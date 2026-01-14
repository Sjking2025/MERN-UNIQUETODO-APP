// routes/moodRoutes.js
const express = require("express");
const { trackMood, getMoodHistory } = require("../controllers/moodController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", authMiddleware, trackMood);
router.get("/", authMiddleware, getMoodHistory);
module.exports = router;
