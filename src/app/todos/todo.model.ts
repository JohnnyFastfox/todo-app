export class TodoModel {
    id: number;
    title: string;
    completed: boolean = false;
    description?: string = '';

    constructor(
        id: number,
        title: string,
        completed: boolean = false,
        description?: string
    ) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.description = description || '';
    }

    toggle(): void {
        this.completed = !this.completed;
    }
}