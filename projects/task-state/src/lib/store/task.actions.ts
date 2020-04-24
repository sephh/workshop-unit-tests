import {Action} from '@ngrx/store';

import {Task} from '../model/task.model';

export enum TasksActionTypes {
  SelectTask = '[Tasks] select task',
  LoadTasks = '[Tasks] load tasks',
  TasksLoaded = '[Tasks] tasks loaded',
  AddTask = '[Tasks] add task',
  TaskAdded = '[Tasks] task added',
  UpdateTask = '[Tasks] updat task',
  TaskUpdated = '[Tasks] task updated',
  DeleteTask = '[Tasks] delete task',
  TaskDeleted = '[Tasks] task deleted'
}

export class SelectTask implements Action {
  readonly type = TasksActionTypes.SelectTask;

  constructor(public payload: string) {
  }
}

export class LoadTasks implements Action {
  readonly type = TasksActionTypes.LoadTasks;
}

export class TasksLoaded implements Action {
  readonly type = TasksActionTypes.TasksLoaded;

  constructor(public payload: Task[]) {
  }
}

export class AddTask implements Action {
  readonly type = TasksActionTypes.AddTask;

  constructor(public payload: Task) {
  }
}

export class TaskAdded implements Action {
  readonly type = TasksActionTypes.TaskAdded;

  constructor(public payload: Task) {
  }
}

export class UpdateTask implements Action {
  readonly type = TasksActionTypes.UpdateTask;

  constructor(public payload: Task) {
  }
}

export class TaskUpdated implements Action {
  readonly type = TasksActionTypes.TaskUpdated;

  constructor(public payload: Task) {
  }
}

export class DeleteTask implements Action {
  readonly type = TasksActionTypes.DeleteTask;

  constructor(public payload: Task) {
  }
}

export class TaskDeleted implements Action {
  readonly type = TasksActionTypes.TaskDeleted;

  constructor(public payload: Task) {
  }
}

export type TaskActions = SelectTask
  | LoadTasks
  | TasksLoaded
  | AddTask
  | TaskAdded
  | UpdateTask
  | TaskUpdated
  | DeleteTask
  | TaskDeleted;
