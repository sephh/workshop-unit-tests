import {render, RenderResult} from '@testing-library/angular';
import {ComponentFixture} from '@angular/core/testing';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {ReactiveFormsModule} from '@angular/forms';

import {TaskListComponent} from './task-list.component';
import {TaskItemComponent} from '../task-item/task-item.component';
import {ItemNotFoundModule} from '../../../../shared/components/item-not-found/item-not-found.module';

describe('TaskListComponent', () => {
  let renderResult: RenderResult<TaskListComponent>;
  let fixture: ComponentFixture<TaskListComponent>;
  let component: TaskListComponent;

  beforeEach(async () => {
    renderResult = await render(TaskListComponent, {
      declarations: [
        TaskItemComponent,
      ],
      imports: [
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatListModule,

        ItemNotFoundModule
      ]
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const {container} = renderResult;
    expect(container).toBeInTheDocument();
  });

  it('should show tasks', () => {
    expect(false).toBeTruthy();
  });

  it('should emit add events', () => {
    expect(false).toBeTruthy();
  });

  it('should emit edit events', () => {
    expect(false).toBeTruthy();
  });

  it('should emit done events', () => {
    expect(false).toBeTruthy();
  });

  it('should emit update events', () => {
    expect(false).toBeTruthy();
  });

  it('should emit remove events', () => {
    expect(false).toBeTruthy();
  });
});
