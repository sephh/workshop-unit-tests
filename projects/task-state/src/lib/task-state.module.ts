import {ModuleWithProviders, NgModule} from '@angular/core';

import {TaskService} from './api/task.service';
import {TasksFacade} from './store/task.facade';
import {API_URL} from './tokens';
import {StoreModule} from '@ngrx/store';
import {FEATURE_TASK_NAME, tasksReducer} from './store/task.reducer';
import {EffectsModule} from '@ngrx/effects';
import {TaskEffects} from './store/task.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(FEATURE_TASK_NAME, tasksReducer),
    EffectsModule.forFeature([TaskEffects]),
  ],
  providers: [
    TaskService,
    TasksFacade,
    TaskEffects
  ]
})
export class TaskStateModule {
  static forRoot(config: { apiUrl: string; }): ModuleWithProviders {
    return {
      ngModule: TaskStateModule,
      providers: [
        {provide: API_URL, useValue: config.apiUrl}
      ]
    };
  }
}
