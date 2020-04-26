import {render, RenderResult} from '@testing-library/angular';
import {ComponentFixture} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import {TaskItemComponent} from './task-item.component';

describe('TaskItemComponent', () => {
  let renderResult: RenderResult<TaskItemComponent>;
  let fixture: ComponentFixture<TaskItemComponent>;
  let component: TaskItemComponent;

  beforeEach(async () => {
    renderResult = await render(TaskItemComponent, {
      imports: [
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule
      ]
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const {container} = renderResult;
    expect(container).toBeInTheDocument();
  });

  it('should check a task', () => {
    expect(false).toBeTruthy();
  });

  it('should delete a task', () => {
    expect(false).toBeTruthy();
  });

  it('should edit a task', () => {
    expect(false).toBeTruthy();
  });
});
