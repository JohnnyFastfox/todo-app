const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

// GET /api/todos - Fetch all todos
router.get('/', todoController.fetchTodos);

// GET /api/todos/:id - Fetch single todo
router.get('/:id', todoController.fetchTodo);

// POST /api/todos - Add new todo
router.post('/', todoController.addTodo);

// PUT /api/todos/:id - Update todo
router.put('/:id', todoController.updateTodo);

// DELETE /api/todos/:id - Delete todo
router.delete('/:id', todoController.deleteTodo);

// PATCH /api/todos/:id/toggle - Toggle todo completion
router.patch('/:id/toggle', todoController.toggleTodo);

module.exports = router; 