import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../todo.service';
import { TodoModel } from '../todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  standalone: true,
  imports: [CommonModule, TodoItemComponent]
})
export class TodoListComponent implements OnInit {
  todos: TodoModel[] = [];
  filter: 'all' | 'open' | 'done' = 'all';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  onToggle(id: number): void {
    this.todoService.toggleTodo(id);
    this.todos = this.todoService.getTodos();
  }

  onRemove(id: number): void {
    this.todoService.removeTodo(id);
    this.todos = this.todoService.getTodos();
  }

  addTodo(event: { title: string; priority: number }): void {
    this.todoService.addTodo(event.title, event.priority);
    this.todos = this.todoService.getTodos();
  }

  completeAllTodos(): void {
    this.todoService.completeAllTodos();
    this.todos = this.todoService.getTodos();
  }

  setFilter(newFilter: 'all' | 'open' | 'done'): void {
    this.filter = newFilter;
  }

  getFilteredTodos(): TodoModel[] {
    switch (this.filter) {
      case 'open':
        return this.todos.filter(todo => !todo.completed);
      case 'done':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }

  getCompletedCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  getTotalCount(): number {
    return this.todos.length;
  }
}