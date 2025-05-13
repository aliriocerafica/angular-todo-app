// src/app/components/todo-form/todo-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule
  ],
  template: `
    <div style="display: flex; align-items: center; margin-bottom: 24px;">
      <mat-form-field style="flex-grow: 1; margin-right: 8px;">
        <mat-label>Add a new todo</mat-label>
        <input 
          matInput 
          [(ngModel)]="newTodoTitle"
          placeholder="What needs to be done?" 
          (keyup.enter)="addTodo()"
        >
      </mat-form-field>
      <button 
        mat-raised-button 
        color="primary"
        (click)="addTodo()">
        Add
      </button>
    </div>
  `
})
export class TodoFormComponent {
  @Output() add = new EventEmitter<string>();
  
  newTodoTitle = '';

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      this.add.emit(this.newTodoTitle);
      this.newTodoTitle = '';
    }
  }
}