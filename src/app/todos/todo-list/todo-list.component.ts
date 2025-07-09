import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../todo.service';
import { TodoModel } from '../todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  imports: [CommonModule, TodoItemComponent]
})
export class TodoListComponent implements OnInit {
  todos: TodoModel[] = [];

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

  addTodo(title: string): void {
    this.todoService.addTodo(title);
    this.todos = this.todoService.getTodos();
  }
}