import { Routes } from '@angular/router';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodoAddComponent } from './todos/todo-add/todo-add.component';

export const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'add', component: TodoAddComponent },
  { path: 'edit/:id', component: TodoListComponent }, // We'll handle editing in the list component for now
  { path: '**', redirectTo: '' } // Catch all route - redirect to home
];
