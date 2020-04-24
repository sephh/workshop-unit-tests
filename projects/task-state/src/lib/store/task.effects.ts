import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import {TaskService} from '../api/task.service';
import {AddTask, DeleteTask, TaskAdded, TaskDeleted, TasksActionTypes, TasksLoaded, TaskUpdated, UpdateTask} from './task.actions';

@Injectable({
  providedIn: 'root'
})
export class TaskEffects {

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActionTypes.LoadTasks),
    mergeMap(() => this.taskService.getMany()
      .pipe(
        map(tasks => new TasksLoaded(tasks)),
        catchError(() => of(new TasksLoaded([])))
      )
    )
  ));

  addTask$ = createEffect(() => this.actions$.pipe(
    ofType<AddTask>(TasksActionTypes.AddTask),
    mergeMap((action) => this.taskService.addOne(action.payload)
      .pipe(
        map(task => new TaskAdded(task))
      )
    )
  ));

  updateTask$ = createEffect(() => this.actions$.pipe(
    ofType<UpdateTask>(TasksActionTypes.UpdateTask),
    mergeMap((action) => this.taskService.updateOne(action.payload)
      .pipe(
        map(task => new TaskUpdated(task))
      )
    )
  ));

  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType<DeleteTask>(TasksActionTypes.DeleteTask),
    mergeMap((action) => this.taskService.removeOne(action.payload)
      .pipe(
        map(task => new TaskDeleted(task))
      ))
  ));

  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {
  }
}
