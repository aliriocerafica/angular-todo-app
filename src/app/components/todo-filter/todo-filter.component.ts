// src/app/components/todo-filter/todo-filter.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

export type FilterType = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div style="display: flex; gap: 8px; margin: 16px 0;">
      <button 
        mat-button 
        [class.mat-primary]="currentFilter === 'all'"
        (click)="setFilter('all')">
        All
      </button>
      <button 
        mat-button 
        [class.mat-primary]="currentFilter === 'active'"
        (click)="setFilter('active')">
        Active
      </button>
      <button 
        mat-button 
        [class.mat-primary]="currentFilter === 'completed'"
        (click)="setFilter('completed')">
        Completed
      </button>
    </div>
  `
})
export class TodoFilterComponent {
  @Input() currentFilter: FilterType = 'all';
  @Output() filterChange = new EventEmitter<FilterType>();

  setFilter(filter: FilterType): void {
    this.filterChange.emit(filter);
  }
}