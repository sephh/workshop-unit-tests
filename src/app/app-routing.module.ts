import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'tasks',
    loadChildren: () => import('./modules/task/task.module').then(m => m.TaskModule)
  },
  {path: '**', redirectTo: '/tasks'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
