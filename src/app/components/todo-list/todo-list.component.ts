// src/app/components/todo-list/todo-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

export type FilterType = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h2>My Todos</h2>
      
      <!-- Add Todo Form -->
      <div style="margin-bottom: 20px; display: flex;">
        <input 
          type="text" 
          [(ngModel)]="newTodoTitle"
          placeholder="Add a new todo" 
          style="flex: 1; padding: 8px; margin-right: 8px; border: 1px solid #ccc; border-radius: 4px;"
          (keyup.enter)="addTodo()"
        >
        <button 
          (click)="addTodo()"
          style="padding: 8px 16px; background-color: #3f51b5; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Add
        </button>
      </div>
      
      <!-- Todo List -->
      <div *ngIf="filteredTodos.length === 0" style="text-align: center; padding: 20px; color: #888;">
        No todos to display
      </div>
      
      <div *ngFor="let todo of filteredTodos" style="padding: 12px; border-bottom: 1px solid #eee; display: flex; align-items: center;">
        <input 
          type="checkbox" 
          [checked]="todo.completed" 
          (change)="onToggleTodo(todo.id!)" 
          style="margin-right: 12px;"
        >
        
        <!-- View Mode -->
        <span 
          *ngIf="!isEditing(todo)"
          [style.textDecoration]="todo.completed ? 'line-through' : 'none'"
          [style.color]="todo.completed ? '#888' : 'inherit'"
          style="flex: 1;"
          (dblclick)="startEdit(todo)">
          {{ todo.title }}
        </span>
        
        <!-- Edit Mode -->
        <div *ngIf="isEditing(todo)" style="flex: 1; display: flex;">
          <input 
            [(ngModel)]="editingTitle"
            style="flex: 1; padding: 4px; border: 1px solid #3f51b5; border-radius: 4px;"
            (keyup.enter)="saveEdit(todo)"
            (keyup.escape)="cancelEdit()"
          >
          <button 
            (click)="saveEdit(todo)"
            style="margin-left: 4px; padding: 4px 8px; background-color: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Save
          </button>
          <button 
            (click)="cancelEdit()"
            style="margin-left: 4px; padding: 4px 8px; background-color: #9e9e9e; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Cancel
          </button>
        </div>
        
        <!-- Action Buttons -->
        <div *ngIf="!isEditing(todo)" style="display: flex; margin-left: 8px;">
          <button 
            (click)="startEdit(todo)"
            style="background-color: #2196f3; color: white; border: none; border-radius: 4px; padding: 4px 8px; cursor: pointer; margin-right: 4px;">
            Edit
          </button>
          <button 
            (click)="onDeleteTodo(todo.id!)"
            style="background-color: #f44336; color: white; border: none; border-radius: 4px; padding: 4px 8px; cursor: pointer;">
            Delete
          </button>
        </div>
      </div>
      
      <!-- Status Bar -->
      <div style="margin-top: 16px; display: flex; justify-content: space-between; color: #888; font-size: 14px;">
        <span>{{ activeTodosCount }} items left</span>
        <button 
          *ngIf="completedTodosCount > 0"
          (click)="onClearCompleted()"
          style="background: none; border: none; color: #888; cursor: pointer; text-decoration: underline;">
          Clear completed
        </button>
      </div>
    </div>
  `
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  currentFilter: FilterType = 'all';
  newTodoTitle = '';
  editingId: number | null = null;
  editingTitle = '';
  
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  get filteredTodos(): Todo[] {
    switch (this.currentFilter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }
  
  get activeTodosCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }
  
  get completedTodosCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }
  
  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo(this.newTodoTitle);
      this.newTodoTitle = '';
    }
  }

  onToggleTodo(id: number): void {
    this.todoService.toggleTodo(id);
  }

  onDeleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }
  
  onFilterChange(filter: FilterType): void {
    this.currentFilter = filter;
  }
  
  onClearCompleted(): void {
    this.todoService.clearCompleted();
  }

  // Edit functionality
  isEditing(todo: Todo): boolean {
    return this.editingId === todo.id;
  }

  startEdit(todo: Todo): void {
    this.editingId = todo.id!;
    this.editingTitle = todo.title;
  }

  saveEdit(todo: Todo): void {
    if (this.editingTitle.trim() && this.editingId !== null) {
      this.todoService.updateTodo(this.editingId, this.editingTitle);
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editingTitle = '';
  }
}