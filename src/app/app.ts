import { Component } from '@angular/core';
import { TodoAddComponent } from './todos/todo-add/todo-add.component';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { MaterialButtonComponent } from './todos/todo-add/material-button/material-button.component';

@Component({
  selector: 'app-root',
  imports: [TodoAddComponent, TodoListComponent, MaterialButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'todo-app';
}
