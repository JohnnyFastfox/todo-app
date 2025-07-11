import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TodoListComponent } from './todo-list.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: jasmine.SpyObj<TodoService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TodoService', ['getTodos', 'addTodo', 'toggleTodo', 'removeTodo', 'completeAllTodos']);
    
    await TestBed.configureTestingModule({
      imports: [
        TodoListComponent,
        TodoItemComponent,
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: TodoService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({})
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    
    // Mock the getTodos method to return an observable
    todoService.getTodos.and.returnValue(of([]));
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on init', () => {
    const mockTodos = [
      new Todo('1', 'Test Todo 1', false, '', 1),
      new Todo('2', 'Test Todo 2', true, '', 2)
    ];
    todoService.getTodos.and.returnValue(of(mockTodos));
    
    component.ngOnInit();
    
    expect(todoService.getTodos).toHaveBeenCalled();
  });

  it('should filter todos correctly', () => {
    const mockTodos = [
      new Todo('1', 'Test Todo 1', false, '', 1),
      new Todo('2', 'Test Todo 2', true, '', 2),
      new Todo('3', 'Test Todo 3', false, '', 3)
    ];
    component.todos = mockTodos;
    
    component.setFilter('open');
    expect(component.getFilteredTodos().length).toBe(2);
    
    component.setFilter('done');
    expect(component.getFilteredTodos().length).toBe(1);
    
    component.setFilter('all');
    expect(component.getFilteredTodos().length).toBe(3);
  });
});
