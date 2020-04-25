import {render, RenderResult} from '@testing-library/angular';
import {ComponentFixture} from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import {TaskListComponent} from '../../components/task-list/task-list.component';
import {TaskItemComponent} from '../../components/task-item/task-item.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TaskRoutingModule} from '../../task-routing.module';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {ItemNotFoundModule} from '../../../../shared/components/item-not-found/item-not-found.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingModule} from '../../../../shared/components/loading/loading.module';
import {ScoredFilterModule} from '../../../../shared/pipes/scored-filter/scored-filter.module';
import {StateModule} from '../../../../state/state.module';

describe('TasksComponent', () => {
  let renderResult: RenderResult<TasksComponent>;
  let fixture: ComponentFixture<TasksComponent>;
  let component: TasksComponent;

  beforeEach(async () => {
    renderResult = await render(TasksComponent, {
      declarations: [
        TaskListComponent,
        TaskItemComponent,
      ],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatCardModule,
        ItemNotFoundModule,
        ReactiveFormsModule,
        LoadingModule,
        ScoredFilterModule,
        FormsModule,

        StateModule
      ]
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const {container} = renderResult;
    expect(container).toBeInTheDocument();
  });
});
