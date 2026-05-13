import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string = '';
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
}

loadTodos(): void {
  this.todoService.getTodos().subscribe({
  next: (data) => (this.todos = data),
  error: (err) => console.error('Failed to load todos', err),
  });
}

saveTodo(): void {
  const content = (this.newTodo || '').trim();
  if (!content) {
    alert('Please enter todo');
    return;
  }

  this.todoService.createTodo({ content, status: false }).subscribe({
    next: () => {
      this.newTodo = '';
      this.loadTodos();
    },
    error: (err) => console.error('Failed to create todo', err),
  });
}

done(todo: Todo): void {
  this.todoService.updateTodo(todo.id, { status: !todo.status }).subscribe({
  next: () => this.loadTodos(),
  error: (err) => console.error('Failed to update todo', err),
  });
}

  remove(todo: Todo): void {
    this.todoService.deleteTodo(todo.id).subscribe({
    next: () => this.loadTodos(),
    error: (err) => console.error('Failed to delete todo', err),
    });
  }

  reset(): void {
    this.todoService.deleteAllTodos().subscribe({
    next: () => (this.todos = []),
    error: (err) => console.error('Failed to reset todos', err),
    });
  }
}
