import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { Task } from './Type';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor],
  template: `
    <ul>
      <li *ngFor="let task of tasks">
        <button 
          [class.line-through]="task.done"
          (click)="toggleDoneStatues(task)"
        >
          {{ task.name }}
        </button>
    </ul>
  `,
  styles: ``
})
export class TaskListComponent {
  @Input({required: true}) tasks: Task[] = [];

  toggleDoneStatues = (task: Task) => {
    task.done = !task.done;
  }
}
