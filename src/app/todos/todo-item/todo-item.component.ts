import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoModel } from '../todo.model';
import { AbsolutePriorityPipe } from '../absolute-priority-pipe';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  standalone: true,
  imports: [CommonModule, AbsolutePriorityPipe]
})
export class TodoItemComponent {
  @Input() todo!: TodoModel;

  @Output() toggle = new EventEmitter<void>();

  @Output() remove = new EventEmitter<void>();

  onToggle(): void {
    this.toggle.emit();
  }

  onRemove(): void {
    this.remove.emit();
  }
}