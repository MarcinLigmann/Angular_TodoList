import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { Task } from "../model/Task";
import { NgFor, NgIf } from "@angular/common";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { featherCalendar } from "@ng-icons/feather-icons";
import { TaskUpdatePayload, TasksService } from "../data-access/tasks.service";
import { AutosizeTextareaComponent } from "@ui/autosize-textarea.component";
import { RemoveItemButtonComponent } from "@ui/remove-item-button.component";
import { TaskCardComponent } from "./task-card.component";

@Component({
  selector: "app-tasks-list",
  standalone: true,
  viewProviders: [provideIcons({ featherCalendar })],
  imports: [
    NgFor,
    NgIconComponent,
    NgIf,
    RemoveItemButtonComponent,
    AutosizeTextareaComponent,
    TaskCardComponent
  ],
  template: `
    <ul>
      <li *ngFor="let task of tasks" class="mb-2">
        <app-task-card
          [task]="task" 
          (delete)="delete(task.id)"
          (update)="updateTask(task.id, $event)"
        />
      </li>
    </ul>
  `,
  styles: [],
})
export class TasksListComponent {
  @Input({ required: true }) tasks: Task[] = [];
  @Output() update = new EventEmitter;

  private tasksService = inject(TasksService);

  delete(taskId: number) {
    this.tasksService.delete(taskId)
    .then((res) => {
      if (res instanceof Error) {
        alert(res.message);
      } else {
        this.tasks = this.tasks.filter(el => el.id !== taskId)
      }
    });
  }

  updateTask(taskId: number, updatedTask: TaskUpdatePayload) {
    this.tasksService.update(taskId, updatedTask)
    .then((res) => {
      if (res instanceof Error) {
        alert(res.message);
      } else {
        this.tasks = this.tasks.map(el => {
          if (el.id === taskId) {
            return res;
          } else {
            return el;
          }
        })
      }
    });
  }
}