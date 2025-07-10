export class UserModel {
    id: number;
    title: string;
    completed: boolean = false;
    description?: string = '';
    priority: number = 1;

    constructor(
        id: number,
        title: string,
        completed: boolean = false,
        description?: string,
        priority: number = 1
    ) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.description = description || '';
        this.priority = priority;
    }

    toggle(): void {
        this.completed = !this.completed;
    }
}
