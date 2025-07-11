import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { App } from './app';
import { TodoService } from './todos/todo.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App,
        RouterTestingModule,
        HttpClientTestingModule
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

  it('should render navigation links', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    
    const homeLink = el.querySelector('a[routerlink="/"]');
    const addLink = el.querySelector('a[routerlink="/add"]');
    
    expect(homeLink).toBeTruthy();
    expect(addLink).toBeTruthy();
    expect(homeLink?.textContent).toContain('Home');
    expect(addLink?.textContent).toContain('Add Todo');
  });

  it('should render router outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    
    const routerOutlet = el.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });
});
