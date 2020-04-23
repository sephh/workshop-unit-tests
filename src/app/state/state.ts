import * as fromTasks from 'task-state';

export interface AppState {
  tasks: fromTasks.TaskState
}

export const reducers = {
  ...fromTasks.tasksReducer
};
