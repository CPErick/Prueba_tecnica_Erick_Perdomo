import { Injectable } from '@angular/core';
import { Todo } from './object';


@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor() { }

  getTodoList(): Todo[] {
    let todoList: Todo[] = []
     if(localStorage.getItem('currentTodoList')) {
       const currentList = this.getLocalStorageTodoList();
       if(Array.isArray(currentList) && currentList.length) {
        for(const todo of currentList) {
          todoList.push(new Todo(todo));
        }
       }
     } else {
      this.setTodoListLocalStorage()
     }
     return todoList;
  }

  createTodo(data: Todo) {
    const currentList = this.getTodoList();
    currentList.unshift(data);
    this.setTodoListLocalStorage(currentList);
  }

  getLocalStorageTodoList(): {[key:string]: any}[] {
    return JSON.parse(localStorage.getItem('currentTodoList') || "");
  }

  setTodoListLocalStorage(todoList?: Todo[]) {
   localStorage.setItem('currentTodoList',JSON.stringify(todoList || []));
  }
}
