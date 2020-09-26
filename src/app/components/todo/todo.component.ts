import { Component, OnInit } from '@angular/core';
import { Todo } from "../../interfaces/todo";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos:Todo[]=[];

  constructor() { }

  ngOnInit(): void {
    let list=localStorage.getItem('todoList')
    if(!list)return null;
    this.todos=JSON.parse(list);
  }
  idNumber =1;

  addTodo(newTodo){
   let todo:Todo = {title:newTodo.value,completed:false,id:this.idNumber +1};
   this.todos.push(todo);
   this.idNumber++;
   newTodo.value = "";
   localStorage.setItem("todoList",JSON.stringify(this.todos))

  }

  removeTodo(todo){
    this.todos = this.todos.filter(item =>item.id != todo.id);
    localStorage.setItem("todoList",JSON.stringify(this.todos))

  }

  switchStatus(todo){
  todo.completed =!todo.completed
  localStorage.setItem("todoList",JSON.stringify(this.todos))
  }
}
