import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Todo } from '../Todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = `${environment.apiUrl}/api/todos`;

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  createTodo(todo: { content: string; status: boolean }) {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(id: number, todo: Partial<Todo>) {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo);
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  deleteAllTodos() {
    return this.http.delete(this.apiUrl);
  }
}