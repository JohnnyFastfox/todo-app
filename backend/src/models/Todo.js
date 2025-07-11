const { v4: uuidv4 } = require('uuid');

class Todo {
    constructor(title, completed = false, description = '', priority = 1) {
        this.id = uuidv4();
        this.title = title;
        this.completed = completed;
        this.description = description;
        this.priority = priority;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    toggle() {
        this.completed = !this.completed;
        this.updatedAt = new Date();
        return this;
    }

    update(data) {
        if (data.title !== undefined) this.title = data.title;
        if (data.completed !== undefined) this.completed = data.completed;
        if (data.description !== undefined) this.description = data.description;
        if (data.priority !== undefined) this.priority = data.priority;
        this.updatedAt = new Date();
        return this;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            completed: this.completed,
            description: this.description,
            priority: this.priority,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Todo; 