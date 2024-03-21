import { Injectable } from "@angular/core";
import { Task } from "./Task";
import { ListFetchingError } from "./list-state.type";
import { wait } from "./wait";

const URL = "http://localhost:3000";

export const getTasks = async () => {
  await wait();
  return fetch(`${URL}/tasks`)
  .then<Task[] | ListFetchingError>((response) => {
    if (response.ok) {
      return response.json();
    }

    return { status: response.status, message: response.statusText };
  })
}

export const addTask = async (name: string) => {
  await wait();
  return fetch(`${URL}/tasks`, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify({
      createdAt: new Date().getTime(),
      name,
      done: false,
    } as Task)})
    .then<Task | Error>(response => {
      if (response.ok) {
        return response.json();
      }

      return new Error('Can not add task');
    })
}

export const taskServise = {
    getTasks,
    addTask,
}

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    private URL = "http://localhost:3000";

    async getAll() {
        await wait();
        return fetch(`${this.URL}/tasks`)
        .then<Task[] | ListFetchingError>((response) => {
          if (response.ok) {
            return response.json();
          }
      
          return { status: response.status, message: response.statusText };
        })
    }

    async delete(taskId: number) {
        return fetch(`${this.URL}/tasks/${taskId}`,{
            method: 'DELETE',
        })
        .then<Error | undefined>(response => {
            if (response.ok) {
              return response.json();
            }
      
            return new Error('Can not delete task');
          })
    }

    async update(taskId: number, name: string) {
        return fetch(`${URL}/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({name})
        })
        .then<Task | Error>(response => {
            if (response.ok) {
              return response.json();
            }
      
            return new Error('Can not update task');
          })
    }

    async add(name: string) {
        await wait();
        return fetch(`${this.URL}/tasks`, {
          method: 'POST',
          headers: {
            'content-Type': 'application/json'
          },
          body: JSON.stringify({
            createdAt: new Date().getTime(),
            name,
            done: false,
          } as Task)})
          .then<Task | Error>(response => {
            if (response.ok) {
              return response.json();
            }
      
            return new Error('Can not add task');
          })
    }


}