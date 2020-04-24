import {NgModule} from '@angular/core';
import {TaskStateModule} from 'task-state';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';


@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    TaskStateModule.forRoot({apiUrl: 'http://naoexistemesmo.com:9001/'}),
  ]
})
export class StateModule {
}
