import { Injectable } from '@angular/core';
import { TodoModel } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: TodoModel[] = [
    new TodoModel(1, 'Angular CLI ausprobieren', false, '', 1),
    new TodoModel(2, 'Erste Komponente schreiben', false, '', 2),
    new TodoModel(3, 'Service und Modell anlegen', false, '', 3),
    new TodoModel(4, 'Test mit negativer Priorität', false, '', -5)
  ];

  getTodos(): TodoModel[] {
    return this.todos;
  }

  addTodo(title: string, priority: number = 1): void { 
    const nextId = this.todos.length ? Math.max(...this.todos.map(t => t.id)) + 1 : 1;
    this.todos = [...this.todos, new TodoModel(nextId, title, false, '', priority)]; 
  }

  toggleTodo(id: number): void {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        const newTodo = new TodoModel(
          todo.id, 
          todo.title, 
          !todo.completed, 
          todo.description,
          todo.priority
        );
        return newTodo;
      }
      return todo;
    });
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id); 
  }

  completeAllTodos(): void {
    this.todos = this.todos.map(todo => {
      return new TodoModel(
        todo.id,
        todo.title,
        true,
        todo.description,
        todo.priority
      );
    });
  }
}
