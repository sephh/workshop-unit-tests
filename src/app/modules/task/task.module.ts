import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskControllerComponent } from './components/task-controller/task-controller.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TaskRoutingModule} from './task-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ItemNotFoundModule} from '../../shared/components/item-not-found/item-not-found.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingModule} from '../../shared/components/loading/loading.module';
import {ScoredFilterModule} from '../../shared/pipes/scored-filter/scored-filter.module';



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
    MatFormFieldModule,
    MatInputModule,

    // Routing
    TaskRoutingModule,
    MatListModule,
    MatCardModule,
    DragDropModule,
    ItemNotFoundModule,
    ReactiveFormsModule,
    LoadingModule,
    ScoredFilterModule,
    FormsModule,
  ]
})
export class TaskModule { }
