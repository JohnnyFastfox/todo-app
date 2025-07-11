import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TodoAddComponent } from './todo-add.component';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';

describe('TodoAddComponent', () => {
  let component: TodoAddComponent;
  let fixture: ComponentFixture<TodoAddComponent>;
  let todoService: jasmine.SpyObj<TodoService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TodoService', ['addTodo']);
    
    await TestBed.configureTestingModule({
      imports: [
        TodoAddComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: TodoService, useValue: spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoAddComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default form values', () => {
    expect(component.todoForm.get('title')?.value).toBe('');
    expect(component.todoForm.get('priority')?.value).toBe(1);
  });

  it('should validate required title', () => {
    const titleControl = component.todoForm.get('title');
    expect(titleControl?.errors?.['required']).toBeTruthy();
    
    titleControl?.setValue('Test Todo');
    expect(titleControl?.errors).toBeNull();
  });

  it('should validate minimum title length', () => {
    const titleControl = component.todoForm.get('title');
    titleControl?.setValue('ab');
    expect(titleControl?.errors?.['minlength']).toBeTruthy();
    
    titleControl?.setValue('Test Todo');
    expect(titleControl?.errors).toBeNull();
  });

  it('should add todo when form is valid', () => {
    const mockTodo = new Todo('test-id', 'Test Todo', false, '', 1);
    todoService.addTodo.and.returnValue(of(mockTodo));
    
    component.todoForm.patchValue({
      title: 'Test Todo',
      priority: 1
    });
    
    component.addTodo();
    
    expect(todoService.addTodo).toHaveBeenCalledWith('Test Todo', 1);
  });

  it('should not add todo when form is invalid', () => {
    component.todoForm.patchValue({
      title: '',
      priority: 1
    });
    
    component.addTodo();
    
    expect(todoService.addTodo).not.toHaveBeenCalled();
  });
});
