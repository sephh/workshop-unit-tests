import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {selectAddingTasks, selectAllTasks, selectDeletingTasks, selectLoadingTasks, selectUpdatingTasks, TaskState} from './task.reducer';
import {Task} from '../model/task.model';
import {AddTask, DeleteTask, LoadTasks} from './task.actions';

@Injectable({
  providedIn: 'root'
})
export class TasksFacade {
  tasks$: Observable<Task[]>;
  adding$: Observable<boolean>;
  deleting$: Observable<boolean>;
  loading$: Observable<boolean>;
  updating$: Observable<boolean>;

  constructor(private store: Store<TaskState>) {
    this.tasks$ = store.pipe(select(selectAllTasks));
    this.adding$ = store.pipe(select(selectAddingTasks));
    this.deleting$ = store.pipe(select(selectDeletingTasks));
    this.loading$ = store.pipe(select(selectLoadingTasks));
    this.updating$ = store.pipe(select(selectUpdatingTasks));
  }

  getTasks(){
    this.store.dispatch(new LoadTasks());
  }

  createTask(task: Task){
    this.store.dispatch(new AddTask(task));
  }

  updateTask(task: Task){
    this.store.dispatch(new AddTask(task));
  }

  deleteTask(task: Task){
    this.store.dispatch(new DeleteTask(task));
  }
}
