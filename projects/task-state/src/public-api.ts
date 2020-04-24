/*
 * Public API Surface of task-state
 */

export {
  TaskState,
  tasksReducer,
  FEATURE_TASK_NAME,
  selectSelectedTaskId,
  selectSelectedTask,
  selectUpdatingTasks,
  selectLoadingTasks,
  selectDeletingTasks,
  selectAddingTasks,
  selectTaskIds,
  selectAllTasks,
  selectTaskEntities
} from './lib/store/task.reducer';

export {TasksActionTypes, TaskActions} from './lib/store/task.actions';

export {TasksFacade} from './lib/store/task.facade';

export {TaskEffects} from './lib/store/task.effects';

export {Task} from './lib/model/task.model';

export {TaskService} from './lib/api/task.service';

export {API_URL} from './lib/tokens';

export {TaskStateModule} from './lib/task-state.module';
