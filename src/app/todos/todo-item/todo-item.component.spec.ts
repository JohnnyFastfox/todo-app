import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { Todo } from '../todo.model';

describe('TodoItemComponent', () => {

  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoItemComponent]  // Use imports for standalone components
    });
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = new Todo('test-id-123', 'Test-Todo', false, '', 1);
    fixture.detectChanges();
  });

  it('should emit toggle event', () => {
    spyOn(component.toggle, 'emit');
    component.onToggle();
    expect(component.toggle.emit).toHaveBeenCalled();
  });

  it('should emit remove event', () => {
    spyOn(component.remove, 'emit');
    component.onRemove();
    expect(component.remove.emit).toHaveBeenCalled();
  });
});