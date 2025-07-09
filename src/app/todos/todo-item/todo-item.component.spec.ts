import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { TodoItemComponent } from './todo-item.component';
import { TodoModel } from '../todo.model';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TodoItemComponent,
        CommonModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    // Set a mock todo before detectChanges to prevent template errors
    component.todo = new TodoModel(1, 'Test Todo', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
