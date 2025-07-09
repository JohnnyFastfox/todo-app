import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { TodoListComponent } from './todo-list.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoService } from '../todo.service';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TodoListComponent,
        TodoItemComponent,
        CommonModule
      ],
      providers: [TodoService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    // Initialize todos array to prevent template errors
    component.todos = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
