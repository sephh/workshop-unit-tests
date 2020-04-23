import {Inject, Injectable} from '@angular/core';
import {Task} from '../model/task.model';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {uid} from '../utils/utils';
import {API_URL} from '../tokens';

const mockedTasks: Task[] = [
  {
    id: uid(),
    done: true,
    label: 'Criar repositório para o workshop'
  },
  {
    id: uid(),
    done: true,
    label: 'Adicionar projeto base Todo List'
  },
  {
    id: uid(),
    done: true,
    label: 'Adicionar ngrx ao projeto'
  },
  {
    id: uid(),
    done: false,
    label: 'Dividir projeto em branchs'
  },
  {
    id: uid(),
    done: false,
    label: 'Apresentar o produto no workshop'
  },
];

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  model = 'tasks';

  constructor(@Inject(API_URL) private apiUrl) {
  }

  get url(): string {
    return `${this.apiUrl}${this.model}`;
  }

  getMany(): Observable<Task[]> {
    return of([])
      .pipe(
        delay(1000)
      );
  }

  getOne(): Observable<Task> {
    return of(null)
      .pipe(
        delay(1000)
      );
  }

  addOne(task: Task): Observable<Task> {
    return of(task).pipe(
      delay(1000)
    );
  }

  updateOne(task: Task): Observable<Task> {
    return of(task)
      .pipe(
        delay(1000)
      );
  }

  removeOne(task: Task): Observable<Task> {
    return of(task)
      .pipe(
        delay(1000)
      );
  }
}
