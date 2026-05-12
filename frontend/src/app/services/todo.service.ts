import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = `${environment.apiUrl}/api/todos`;

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get(this.apiUrl);
  }

  createTodo(todo: any) {
    return this.http.post(this.apiUrl, todo);
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}