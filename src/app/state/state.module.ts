import {NgModule} from '@angular/core';
import {TaskEffects, TaskStateModule} from 'task-state';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './state';


@NgModule({
  imports: [
    TaskStateModule.forRoot({apiUrl: 'http:/naoexistemesmo.com:9001'}),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      TaskEffects
    ]),
  ]
})
export class StateModule {
}
