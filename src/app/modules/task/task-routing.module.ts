import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {TasksComponent} from './pages/tasks/tasks.component';

export const TASK_ROUTES: Route[] = [
  {
    path: '',
    component: TasksComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(TASK_ROUTES)
  ]
})
export class TaskRoutingModule {
}
