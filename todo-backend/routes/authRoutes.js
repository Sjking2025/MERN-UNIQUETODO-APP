const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Register Route
router.post("/register", authController.register);

// Login Route
router.post("/login", authController.login);

// Verify Token Route
router.get("/verify", authMiddleware, authController.verify);

module.exports = router;
