// src/app/models/todo.ts
export interface Todo {
  id?: number;
  userId: number;
  title: string;
  completed: boolean;
}