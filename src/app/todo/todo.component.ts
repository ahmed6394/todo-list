import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string;
  constructor() {}

  ngOnInit(): void {
    this.todos = JSON.parse(localStorage.getItem('list')!);
  }

  saveTodo() {
    if (this.newTodo) {
      let todo = new Todo();
      todo.name = this.newTodo;
      todo.isCompleted = true;
      this.todos = this.todos || [];
      this.todos.push(todo);
      localStorage.setItem('list', JSON.stringify(this.todos));
      this.newTodo = '';
    } else alert('Please enter todo');
  }

  done(id: number) {
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
  }

  remove(id: number) {
    this.todos = this.todos.filter((v, i) => i !== id);
    localStorage.setItem('list', JSON.stringify(this.todos));
  }
  reset() {
    localStorage.clear();
    this.todos = [];
  }
}
