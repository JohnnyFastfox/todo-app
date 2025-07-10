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
  priority: number = 1;

  @Output() todoCreated = new EventEmitter<{ title: string; priority: number }>();

  addTodo(): void {
    if (this.title.trim()) {
      this.todoCreated.emit({ title: this.title.trim(), priority: this.priority });
      this.title = '';
      this.priority = 1;
    }
  }
}