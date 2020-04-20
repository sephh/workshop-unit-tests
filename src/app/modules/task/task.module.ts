import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskControllerComponent } from './components/task-controller/task-controller.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TaskRoutingModule} from './task-routing.module';



@NgModule({
  declarations: [
    TasksComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskControllerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,

    // Routing
    TaskRoutingModule
  ]
})
export class TaskModule { }
