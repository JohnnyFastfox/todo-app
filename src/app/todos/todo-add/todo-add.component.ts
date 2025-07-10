import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService } from '../todo.service';


@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class TodoAddComponent {
  @Output() todoCreated = new EventEmitter<{ title: string; priority: number }>();

  constructor(private todoService: TodoService) { }
  
  todoForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), this.forbiddenTitleValidator]),
    priority: new FormControl(1, [Validators.min(1), Validators.max(10)]),
  });

  addTodo() {
    if (this.todoForm.valid) {
      const { title, priority } = this.todoForm.value;
      this.todoCreated.emit({ title: title ?? '', priority: priority ?? 1 });
      this.todoForm.reset();
    }
  }

  onTitleBlur() {
    this.todoForm.get('title')?.markAsTouched();
  }

  onPriorityBlur() {
    this.todoForm.get('priority')?.markAsTouched();
  }

  forbiddenTitleValidator(control: AbstractControl): ValidationErrors | null {
    const forbidden = /august/i.test(control.value);
    return forbidden ? { forbiddenTitle: { value: control.value } } : null;
  }
}