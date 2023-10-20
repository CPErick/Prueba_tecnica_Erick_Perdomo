import { Component, ViewChild } from '@angular/core';
import { TodoServiceService } from '../service/todo-service.service';
import { Todo } from '../service/object';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  todoList: Todo[] = [];
  currentTodo = new Todo();
  isModalOpen = false;
  dueDate: any
  constructor(
    private todoService: TodoServiceService,
    private toastCtrl: ToastController,
  ) {
    this.getTodoList();
  }


  getTodoList() {
    this.todoList = this.todoService.getTodoList();
    console.log("todoList", this.todoList)
  }

  async createTodo() {   
    try {
      if(this.currentTodo.name === ""  || !this.currentTodo.name) {
        throw  new Error('Debe definir el nombre de la tarea');
      }

      if(!this.dueDate) {
        throw  new Error('Debe definir la fecha de caducidad');
      }

      this.todoList.unshift(this.currentTodo);
      this.todoService.createTodo(this.currentTodo);
      this.isModalOpen = false;
      this.newTodo();
      this.toastMessage('Tarea creada con exito');
    } catch (error: any) {
      this.toastMessage(error.message)
    } 
  }

  async newTodo() {
    this.currentTodo = new Todo();
    this.dueDate = null;
  }

  removeTodo(todo: Todo) {
    const idx = this.todoList.findIndex(row => row.name == todo.name);
    if(idx != -1) {
      this.todoList.splice(idx, 1);
      this.todoService.setTodoListLocalStorage(this.todoList);
    }
  }

  cancel() {
    this.isModalOpen = false;
    this.newTodo();
  }

  async toastMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
