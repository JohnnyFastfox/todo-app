const TodoStore = require('../models/TodoStore');

const todoStore = new TodoStore();

const todoController = {
    // GET /api/todos - Fetch all todos
    fetchTodos: (req, res) => {
        try {
            const todos = todoStore.getAllTodos();
            res.status(200).json(todos);
        } catch (error) {
            res.status(500).json({ 
                error: 'Internal server error', 
                message: error.message 
            });
        }
    },

    // GET /api/todos/:id - Fetch single todo
    fetchTodo: (req, res) => {
        try {
            const { id } = req.params;
            const todo = todoStore.getTodoById(id);
            
            if (!todo) {
                return res.status(404).json({ 
                    error: 'Not found', 
                    message: 'Todo not found' 
                });
            }
            
            res.status(200).json(todo);
        } catch (error) {
            res.status(500).json({ 
                error: 'Internal server error', 
                message: error.message 
            });
        }
    },

    // POST /api/todos - Add new todo
    addTodo: (req, res) => {
        try {
            const { title, completed, description, priority } = req.body;
            
            if (!title || title.trim() === '') {
                return res.status(400).json({ 
                    error: 'Bad request', 
                    message: 'Title is required' 
                });
            }

            const todoData = {
                title: title.trim(),
                completed: completed || false,
                description: description || '',
                priority: priority || 1
            };

            const newTodo = todoStore.createTodo(todoData);
            res.status(201).json(newTodo);
        } catch (error) {
            res.status(500).json({ 
                error: 'Internal server error', 
                message: error.message 
            });
        }
    },

    // PUT /api/todos/:id - Update todo
    updateTodo: (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            if (!updateData.title || updateData.title.trim() === '') {
                return res.status(400).json({ 
                    error: 'Bad request', 
                    message: 'Title is required' 
                });
            }

            const updatedTodo = todoStore.updateTodo(id, updateData);
            
            if (!updatedTodo) {
                return res.status(404).json({ 
                    error: 'Not found', 
                    message: 'Todo not found' 
                });
            }

            res.status(200).json(updatedTodo);
        } catch (error) {
            res.status(500).json({ 
                error: 'Internal server error', 
                message: error.message 
            });
        }
    },

    // DELETE /api/todos/:id - Delete todo
    deleteTodo: (req, res) => {
        try {
            const { id } = req.params;
            const deleted = todoStore.deleteTodo(id);
            
            if (!deleted) {
                return res.status(404).json({ 
                    error: 'Not found', 
                    message: 'Todo not found' 
                });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ 
                error: 'Internal server error', 
                message: error.message 
            });
        }
    },

    // PATCH /api/todos/:id/toggle - Toggle todo completion
    toggleTodo: (req, res) => {
        try {
            const { id } = req.params;
            const toggledTodo = todoStore.toggleTodo(id);
            
            if (!toggledTodo) {
                return res.status(404).json({ 
                    error: 'Not found', 
                    message: 'Todo not found' 
                });
            }

            res.status(200).json(toggledTodo);
        } catch (error) {
            res.status(500).json({ 
                error: 'Internal server error', 
                message: error.message 
            });
        }
    }
};

module.exports = todoController; 