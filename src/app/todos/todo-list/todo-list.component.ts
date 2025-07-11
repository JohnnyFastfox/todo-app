import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../todo.service';
import { TodoModel, Todo } from '../todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  standalone: true,
  imports: [CommonModule, TodoItemComponent]
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filter: 'all' | 'open' | 'done' = 'all';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  onToggle(id: string): void {
    this.todoService.toggleTodo(id).subscribe({
      error: (error) => {
        console.error('Error toggling todo:', error);
      }
    });
  }

  onRemove(id: string): void {
    this.todoService.removeTodo(id).subscribe({
      error: (error) => {
        console.error('Error removing todo:', error);
      }
    });
  }

  addTodo(event: { title: string; priority: number }): void {
    this.todoService.addTodo(event.title, event.priority).subscribe({
      error: (error) => {
        console.error('Error adding todo:', error);
      }
    });
  }

  completeAllTodos(): void {
    this.todoService.completeAllTodos().subscribe({
      error: (error) => {
        console.error('Error completing all todos:', error);
      }
    });
  }

  setFilter(newFilter: 'all' | 'open' | 'done'): void {
    this.filter = newFilter;
  }

  getFilteredTodos(): Todo[] {
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