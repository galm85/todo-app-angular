import { Component, OnInit } from '@angular/core';
import { Todo } from "../../interfaces/todo";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos:Todo[]=[];
  idNumber =1;
  constructor() { }

  renderTodos(){
    this.todos = this.todos.sort(function(a,b){
      if(a.completed>b.completed) return 1;
      if(a.completed<b.completed) return -1;
      return 0;
    })
  }

  ngOnInit(): void {
    let list=localStorage.getItem('todoList')
    if(!list)return null;
    this.todos=JSON.parse(list);

  }


  addTodo(newTodo){
   let todo:Todo = {title:newTodo.value,completed:false,id:this.idNumber +1};
   this.todos.push(todo);
   this.idNumber++;
   newTodo.value = "";
   this.renderTodos();
   localStorage.setItem("todoList",JSON.stringify(this.todos))

  }

  removeTodo(todo){
    this.todos = this.todos.filter(item =>item.id != todo.id);
    this.renderTodos();
    localStorage.setItem("todoList",JSON.stringify(this.todos))

  }

  switchStatus(todo){
  todo.completed =!todo.completed
  this.renderTodos();
  localStorage.setItem("todoList",JSON.stringify(this.todos))
  }
}
