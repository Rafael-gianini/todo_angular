import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: string = 'list'
  public todos: Todo[] = [];
  public titulo: String = 'Minhas Tarefas';
  public form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      descricao: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
   
    this.load();
   
  }
  //  alterarTexto () {
  //   this.titulo = "Teste";
  // }
  clear(){
    this.form.reset();
  }

  add(){
    const descricao = this.form.controls['descricao'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, descricao, false));
    this.save();
    this.clear();
  }

  remove (todo: Todo) {
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone (todo: Todo){
    todo.done = true;
    this.save();
  }

  markAsUndone (todo: Todo){
    todo.done = false;
    this.save();
  }

  save(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  load(){
    const data = localStorage.getItem('todos')
    if (data) {
      this.todos = JSON.parse(data);
    }else {
      this.todos = [];
    }
  }

  changeMode(mode: string){
    this.mode = mode;
  }

  
    

}

