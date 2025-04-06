const express = require("express");
const authController = require("../controllers/authController"); // Import the entire controller object

const router = express.Router();

// Register Route
router.post("/register", authController.register); // Use authController.register

// Login Route
router.post("/login", authController.login); // Use authController.login

module.exports = router;
