import {ModuleWithProviders, NgModule} from '@angular/core';

import {TaskService} from './api/task.service';
import {TasksFacade} from './store/task.facade';
import {API_URL} from './tokens';

@NgModule({
  providers: [
    TaskService,
    TasksFacade
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
