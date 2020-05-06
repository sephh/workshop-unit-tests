import {ModuleWithProviders, NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';

import {TaskService} from './api/task.service';
import {TasksFacade} from './store/task.facade';
import {API_URL} from './tokens';
import {FEATURE_TASK_NAME, tasksReducer} from './store/task.reducer';
import {TaskEffects} from './store/task.effects';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
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
  static forRoot(config: { apiUrl: string; } = {apiUrl: 'http://localhost:3000'}): ModuleWithProviders {
    return {
      ngModule: TaskStateModule,
      providers: [
        {provide: API_URL, useValue: config.apiUrl}
      ]
    };
  }
}
