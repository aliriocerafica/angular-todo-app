// src/app/services/todo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>([]);

  constructor(private http: HttpClient) {
    // Initialize with some sample todos for testing
    this.todos = [
      { id: 1, userId: 1, title: 'Learn Angular', completed: false },
      { id: 2, userId: 1, title: 'Build Todo App', completed: false },
      { id: 3, userId: 1, title: 'Master TypeScript', completed: true }
    ];
    this.todosSubject.next(this.todos);
  }

  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  addTodo(title: string): void {
    if (title.trim()) {
      const newId = Math.max(0, ...this.todos.map(t => t.id || 0)) + 1;
      const newTodo = {
        id: newId,
        userId: 1,
        title: title.trim(),
        completed: false
      };
      this.todos = [...this.todos, newTodo];
      this.todosSubject.next(this.todos);
    }
  }

  toggleTodo(id: number): void {
    this.todos = this.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.todosSubject.next(this.todos);
  }

  // Add the updateTodo method
  updateTodo(id: number, title: string): void {
    if (title.trim()) {
      this.todos = this.todos.map(todo => 
        todo.id === id ? { ...todo, title: title.trim() } : todo
      );
      this.todosSubject.next(this.todos);
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.todosSubject.next(this.todos);
  }

  // Add the clearCompleted method
  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.todosSubject.next(this.todos);
  }
}