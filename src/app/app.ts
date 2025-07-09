import { Component } from '@angular/core';
import { TodoAddComponent } from './todos/todo-add/todo-add.component';
import { TodoListComponent } from './todos/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  imports: [TodoAddComponent, TodoListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'todo-app';
}
