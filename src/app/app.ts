import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MaterialButtonComponent } from './todos/todo-add/material-button/material-button.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MaterialButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'todo-app';
}
