import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
  imports: [FormsModule]
})
export class TodoAddComponent {
  title = '';

  @Output() todoCreated = new EventEmitter<string>();

  addTodo(): void {
    if (this.title.trim()) {
      this.todoCreated.emit(this.title.trim());
      this.title = '';
    }
  }
}