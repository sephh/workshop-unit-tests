import {Inject, Injectable} from '@angular/core';
import {Task} from '../model/task.model';
import {Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {uid} from '../utils/utils';
import {API_URL} from '../tokens';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  model = 'tasks';

  constructor(@Inject(API_URL) private apiUrl, private http: HttpClient) {
  }

  get url(): string {
    return `${this.apiUrl}${this.model}`;
  }

  getMany(): Observable<Task[]> {
    return this.http.get<{ data: Task[] }>(this.apiUrl)
      .pipe(
        delay(1000),
        map(res => res.data)
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
