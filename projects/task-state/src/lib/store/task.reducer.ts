import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';

import {TasksActionTypes, TaskActions} from './task.actions';
import {Task} from '../model/task.model';

export interface TaskState extends EntityState<Task> {
  adding: boolean;
  deleting: boolean;
  loading: boolean;
  updating: boolean;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: TaskState = adapter.getInitialState({
  adding: false,
  deleting: false,
  loading: false,
  updating: false,
});

export const tasksReducer = {
  tasks: function(state = initialState, action: TaskActions): TaskState {
    switch (action.type) {
      case TasksActionTypes.TasksLoaded:
        return adapter.addMany(
          action.payload,
          {...state, loading: false}
        );

      case TasksActionTypes.TaskAdded:
        return adapter.addOne(
          action.payload,
          {...state, adding: false}
        );

      case TasksActionTypes.UpdateTask:
        return adapter.updateOne(
          {id: action.payload.id, changes: action.payload},
          {...state, updating: false}
        );

      case TasksActionTypes.DeleteTask:
        return adapter.removeOne(
          action.payload.id,
          {...state, deleting: false}
        );

      case TasksActionTypes.AddTask:
        return adapter.addOne(
          action.payload,
          {...state, adding: true}
        );

      case TasksActionTypes.TaskDeleted:
        return {...state, deleting: true};

      case TasksActionTypes.LoadTasks:
        return {...state, loading: true};

      case TasksActionTypes.TaskUpdated:
        return {...state, updating: true};

      default:
        return state;
    }
  }
};

/**
 * Selectors
 */

const {selectIds, selectEntities, selectAll} = adapter.getSelectors();

const taskState = createFeatureSelector<TaskState>('tasks');

export const selectTaskIds = createSelector(
  taskState,
  selectIds
);
export const selectTaskEntities = createSelector(
  taskState,
  selectEntities
);
export const selectAllTasks = createSelector(
  taskState,
  selectAll
);
export const selectAddingTasks = createSelector(
  taskState,
  (state: TaskState) => state.adding
);
export const selectDeletingTasks = createSelector(
  taskState,
  (state: TaskState) => state.deleting
);
export const selectLoadingTasks = createSelector(
  taskState,
  (state: TaskState) => state.loading
);
export const selectUpdatingTasks = createSelector(
  taskState,
  (state: TaskState) => state.updating
);
