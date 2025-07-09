import { Injectable } from '@angular/core';
import { TodoModel } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: TodoModel[] = [
    new TodoModel(1, 'Angular CLI ausprobieren'),
    new TodoModel(2, 'Erste Komponente schreiben'),
    new TodoModel(3, 'Service und Modell anlegen')
  ];

  getTodos(): TodoModel[] {
    return this.todos;
  }

  addTodo(title: string): void { 
    const nextId = this.todos.length ? Math.max(...this.todos.map(t => t.id)) + 1 : 1;
    this.todos = [...this.todos, new TodoModel(nextId, title)]; 
  }

  toggleTodo(id: number): void {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        const newTodo = new TodoModel(
          todo.id, 
          todo.title, 
          !todo.completed, 
          todo.description
        );
        return newTodo;
      }
      return todo;
    });
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id); 
  }
}
