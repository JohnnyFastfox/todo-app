import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {

  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoItemComponent]
    });
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = { id: 1, title: 'Test-Todo' }; // Using object literal instead of TodoModel
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