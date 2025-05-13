// src/app/components/todo-item/todo-item.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-card style="margin-bottom: 12px;">
      <div style="display: flex; align-items: center; padding: 12px;">
        <mat-checkbox 
          [checked]="todo.completed" 
          (change)="onToggle()" 
          style="margin-right: 12px;">
        </mat-checkbox>
        
        <span 
          [style.text-decoration]="todo.completed ? 'line-through' : 'none'"
          [style.color]="todo.completed ? '#9e9e9e' : 'inherit'"
          style="flex-grow: 1;">
          {{ todo.title }}
        </span>
        
        <div style="display: flex;">
          <button 
            mat-icon-button 
            color="primary"
            (click)="onUpdate()">
            <mat-icon>edit</mat-icon>
          </button>
          <button 
            mat-icon-button 
            color="warn"
            (click)="onDelete()">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>
    </mat-card>
  `
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<number>();
  @Output() update = new EventEmitter<{id: number, title: string}>();
  @Output() delete = new EventEmitter<number>();

  onToggle(): void {
    if (this.todo.id !== undefined) {
      this.toggle.emit(this.todo.id);
    }
  }
  
  onUpdate(): void {
    if (this.todo.id !== undefined) {
      this.update.emit({id: this.todo.id, title: this.todo.title});
    }
  }
  
  onDelete(): void {
    if (this.todo.id !== undefined) {
      this.delete.emit(this.todo.id);
    }
  }
}