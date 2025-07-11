import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';
import { TodoModel, Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3001/api/todos';
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  public todos$ = this.todosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTodos();
  }

  private loadTodos(): void {
    this.http.get<TodoModel[]>(this.apiUrl).subscribe({
      next: (todos) => {
        const todoInstances = todos.map(todo => Todo.fromApi(todo));
        this.todosSubject.next(todoInstances);
      },
      error: (error) => {
        console.error('Error loading todos:', error);
        this.todosSubject.next([]);
      }
    });
  }

  getTodos(): Observable<Todo[]> {
    return this.todos$;
  }

  addTodo(title: string, priority: number = 1, description: string = ''): Observable<Todo> {
    const todoData = {
      title,
      priority,
      description,
      completed: false
    };

    return this.http.post<TodoModel>(this.apiUrl, todoData).pipe(
      map((newTodo) => Todo.fromApi(newTodo)),
      tap((todo) => {
        const currentTodos = this.todosSubject.value;
        this.todosSubject.next([...currentTodos, todo]);
      })
    );
  }

  toggleTodo(id: string): Observable<Todo> {
    return this.http.patch<TodoModel>(`${this.apiUrl}/${id}/toggle`, {}).pipe(
      map((updatedTodo) => Todo.fromApi(updatedTodo)),
      tap((todo) => {
        const currentTodos = this.todosSubject.value;
        const updatedTodos = currentTodos.map(t => 
          t.id === id ? todo : t
        );
        this.todosSubject.next(updatedTodos);
      })
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<TodoModel>(`${this.apiUrl}/${todo.id}`, todo.toApi()).pipe(
      map((updatedTodo) => Todo.fromApi(updatedTodo)),
      tap((updatedTodoInstance) => {
        const currentTodos = this.todosSubject.value;
        const updatedTodos = currentTodos.map(t => 
          t.id === todo.id ? updatedTodoInstance : t
        );
        this.todosSubject.next(updatedTodos);
      })
    );
  }

  removeTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentTodos = this.todosSubject.value;
        const updatedTodos = currentTodos.filter(t => t.id !== id);
        this.todosSubject.next(updatedTodos);
      })
    );
  }

  completeAllTodos(): Observable<Todo[]> {
    const currentTodos = this.todosSubject.value;
    const updatePromises = currentTodos.map(todo => {
      const updatedTodo = new Todo(
        todo.id,
        todo.title,
        true,
        todo.description,
        todo.priority,
        todo.createdAt,
        todo.updatedAt
      );
      return this.updateTodo(updatedTodo).toPromise();
    });

    return new Observable(observer => {
      Promise.all(updatePromises).then(() => {
        this.loadTodos();
        observer.next(this.todosSubject.value);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  refreshTodos(): void {
    this.loadTodos();
  }
}
