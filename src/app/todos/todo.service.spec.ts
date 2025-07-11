import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    service = TestBed.inject(TodoService);
    expect(service).toBeTruthy();
    
    // Handle the initial loadTodos call from constructor
    const req = httpMock.expectOne('http://localhost:3001/api/todos');
    req.flush([]);
  });

  it('should fetch todos from API', () => {
    service = TestBed.inject(TodoService);
    
    const mockTodos = [
      { id: '1', title: 'Test Todo 1', completed: false, description: '', priority: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      { id: '2', title: 'Test Todo 2', completed: true, description: '', priority: 2, createdAt: '2024-01-01', updatedAt: '2024-01-01' }
    ];

    // Handle the initial loadTodos call from constructor
    const initialReq = httpMock.expectOne('http://localhost:3001/api/todos');
    initialReq.flush(mockTodos);

    service.getTodos().subscribe(todos => {
      expect(todos.length).toBe(2);
      expect(todos[0].title).toBe('Test Todo 1');
      expect(todos[1].title).toBe('Test Todo 2');
    });
  });

  it('should add todo via API', () => {
    service = TestBed.inject(TodoService);
    
    const newTodo = { title: 'New Todo', priority: 1, description: '', completed: false };
    const mockResponse = { 
      id: '3', 
      title: 'New Todo', 
      completed: false, 
      description: '', 
      priority: 1, 
      createdAt: '2024-01-01', 
      updatedAt: '2024-01-01' 
    };

    // Handle the initial loadTodos call from constructor
    const initialReq = httpMock.expectOne('http://localhost:3001/api/todos');
    initialReq.flush([]);

    service.addTodo('New Todo', 1, '').subscribe(todo => {
      expect(todo.title).toBe('New Todo');
      expect(todo.id).toBe('3');
    });

    const req = httpMock.expectOne('http://localhost:3001/api/todos');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTodo);
    req.flush(mockResponse);
  });

  it('should toggle todo via API', () => {
    service = TestBed.inject(TodoService);
    
    const todoId = '1';
    const mockResponse = { 
      id: '1', 
      title: 'Test Todo', 
      completed: true, 
      description: '', 
      priority: 1, 
      createdAt: '2024-01-01', 
      updatedAt: '2024-01-01' 
    };

    // Handle the initial loadTodos call from constructor
    const initialReq = httpMock.expectOne('http://localhost:3001/api/todos');
    initialReq.flush([]);

    service.toggleTodo(todoId).subscribe(todo => {
      expect(todo.completed).toBe(true);
    });

    const req = httpMock.expectOne(`http://localhost:3001/api/todos/${todoId}/toggle`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockResponse);
  });

  it('should update todo via API', () => {
    service = TestBed.inject(TodoService);
    
    const todo = new Todo('1', 'Updated Todo', false, 'Updated description', 2);
    const mockResponse = { 
      id: '1', 
      title: 'Updated Todo', 
      completed: false, 
      description: 'Updated description', 
      priority: 2, 
      createdAt: '2024-01-01', 
      updatedAt: '2024-01-01' 
    };

    // Handle the initial loadTodos call from constructor
    const initialReq = httpMock.expectOne('http://localhost:3001/api/todos');
    initialReq.flush([]);

    service.updateTodo(todo).subscribe(updatedTodo => {
      expect(updatedTodo.title).toBe('Updated Todo');
      expect(updatedTodo.description).toBe('Updated description');
    });

    const req = httpMock.expectOne(`http://localhost:3001/api/todos/${todo.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(todo.toApi());
    req.flush(mockResponse);
  });

  it('should delete todo via API', () => {
    service = TestBed.inject(TodoService);
    
    const todoId = '1';

    // Handle the initial loadTodos call from constructor
    const initialReq = httpMock.expectOne('http://localhost:3001/api/todos');
    initialReq.flush([]);

    service.removeTodo(todoId).subscribe(() => {
      // Success callback
    });

    const req = httpMock.expectOne(`http://localhost:3001/api/todos/${todoId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 204, statusText: 'No Content' });
  });
});
