export interface TodoModel {
    id: string;
    title: string;
    completed: boolean;
    description: string;
    priority: number;
    createdAt?: string;
    updatedAt?: string;
}

export class Todo implements TodoModel {
    id: string;
    title: string;
    completed: boolean = false;
    description: string = '';
    priority: number = 1;
    createdAt?: string;
    updatedAt?: string;

    constructor(
        id: string,
        title: string,
        completed: boolean = false,
        description: string = '',
        priority: number = 1,
        createdAt?: string,
        updatedAt?: string
    ) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.description = description;
        this.priority = priority;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    toggle(): void {
        this.completed = !this.completed;
    }

    static fromApi(data: TodoModel): Todo {
        return new Todo(
            data.id,
            data.title,
            data.completed,
            data.description,
            data.priority,
            data.createdAt,
            data.updatedAt
        );
    }

    toApi(): TodoModel {
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
