// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TodoListComponent],
  template: `
    <div style="padding: 20px; background-color: #f5f5f5; min-height: 100vh;">
      <header style="background-color: #3f51b5; color: white; padding: 16px; margin-bottom: 16px; border-radius: 4px;">
        <h1 style="margin: 0; font-size: 24px;">Angular Todo App</h1>
      </header>
      
      <app-todo-list></app-todo-list>
    </div>
  `
})
export class AppComponent {
  title = 'angular-todo-app';
}