const Todo = require('./Todo');

class TodoStore {
    constructor() {
        this.todos = new Map();
        this.initializeSampleData();
    }

    initializeSampleData() {
        const sampleTodos = [
            { title: 'Learn Angular', completed: false, description: 'Master Angular framework', priority: 1 },
            { title: 'Build REST API', completed: true, description: 'Create Express.js backend', priority: 2 },
            { title: 'Deploy to production', completed: false, description: 'Deploy the application', priority: 3 }
        ];

        sampleTodos.forEach(todoData => {
            const todo = new Todo(todoData.title, todoData.completed, todoData.description, todoData.priority);
            this.todos.set(todo.id, todo);
        });
    }

    getAllTodos() {
        return Array.from(this.todos.values()).map(todo => todo.toJSON());
    }

    getTodoById(id) {
        const todo = this.todos.get(id);
        return todo ? todo.toJSON() : null;
    }

    createTodo(todoData) {
        const todo = new Todo(
            todoData.title,
            todoData.completed || false,
            todoData.description || '',
            todoData.priority || 1
        );
        this.todos.set(todo.id, todo);
        return todo.toJSON();
    }

    updateTodo(id, todoData) {
        const todo = this.todos.get(id);
        if (!todo) {
            return null;
        }
        todo.update(todoData);
        return todo.toJSON();
    }

    deleteTodo(id) {
        const todo = this.todos.get(id);
        if (!todo) {
            return false;
        }
        this.todos.delete(id);
        return true;
    }

    toggleTodo(id) {
        const todo = this.todos.get(id);
        if (!todo) {
            return null;
        }
        todo.toggle();
        return todo.toJSON();
    }
}

module.exports = TodoStore; 