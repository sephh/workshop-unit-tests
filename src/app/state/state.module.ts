import {NgModule} from '@angular/core';
import {TaskStateModule} from 'task-state';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';


@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    TaskStateModule.forRoot({apiUrl: 'http://localhost:4200/assets/json/mocked-tasks.json'}),
  ]
})
export class StateModule {
}
