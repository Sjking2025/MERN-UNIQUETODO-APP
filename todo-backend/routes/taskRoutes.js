const express = require('express');
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middlleware/authMiddleware'); 

const router = express.Router();

// Protected routes (require JWT authentication)
router.get('/', authMiddleware, getTasks);
router.post('/', authMiddleware, addTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;