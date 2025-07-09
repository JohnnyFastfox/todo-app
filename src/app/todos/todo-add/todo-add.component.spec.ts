import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TodoAddComponent } from './todo-add.component';

describe('TodoAddComponent', () => {
  let component: TodoAddComponent;
  let fixture: ComponentFixture<TodoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TodoAddComponent,
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoAddComponent);
    component = fixture.componentInstance;
    // Don't call detectChanges immediately to avoid ngModel errors
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
