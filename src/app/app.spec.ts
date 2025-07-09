import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { TodoAddComponent } from './todos/todo-add/todo-add.component';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodoItemComponent } from './todos/todo-item/todo-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todos/todo.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App,
        TodoAddComponent,
        TodoListComponent,
        TodoItemComponent,
        CommonModule,
        FormsModule
      ],
      providers: [TodoService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent)
      .toContain('Angular Todo App');
  });
});
