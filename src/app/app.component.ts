import { Component } from '@angular/core';
import { TaskListComponent } from './task-list.component';
import { SubmitTextComponent } from './submit-text.component';
import { Task } from './Type';
import { NgIf } from '@angular/common';

type IddleState = {
  state: 'idle'
}

type LoadingState = {
  state: 'loading'
}

type SuccesState = {
  state: 'success',
  result: Task[]
}

type ErrorState = {
  state: 'error'
  message: string;
}

type ComponentState = IddleState | LoadingState | SuccesState | ErrorState;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent, SubmitTextComponent, NgIf],
  template: `
    <h1 class="text-orange-500 bg-black py-4 text-xl text-center">
      Welcome to {{title}}!
    </h1>
    <main class="grid place-items-center pt-4">
      <app-submit-text (submitText)="addTask($event)" />
      <app-task-list *ngIf="state.state === 'success'" class="block mt-4" [tasks]="state.result" />
      
      <p *ngIf="state.state === 'error'">Something went wrong... try again later</p>

      <p *ngIf="state.state === 'loading'">Loading...</p>
    </main>
  `,
})
export class AppComponent {
  title = 'Angular_TodoList';
  state: ComponentState = {state: 'idle'}

  private readonly URL = 'http://localhost:3000';

  constructor() {
    this.state = {state: 'loading'};
    fetch(`${this.URL}/tasks`)
      .then<Task[]>(response => response.json())
      .then(data => (
        //for charging simulation purposes
        setTimeout(() => {
          this.state = {
            state: 'success',
            result: data,
          }
        }, 1200)))
      .catch((err) => this.state = {
        state: 'error',
        message: err
      })
  }

  addTask = (name: string) => {
    // this.tasks.push({
    //   id: this.tasks.length + 1,
    //   name,
    //   done: false,
    // })
  } 


}
