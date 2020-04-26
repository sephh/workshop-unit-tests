import {render, RenderResult, fireEvent} from '@testing-library/angular';
import {ComponentFixture} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

import {TaskItemComponent} from './task-item.component';
import {TaskTestBuilder} from '../../../../../../__mocks__/task-test.builder';
import {Task} from 'task-state';

describe('TaskItemComponent', () => {
  let taskTestBuilder;
  let renderResult: RenderResult<TaskItemComponent>;
  let fixture: ComponentFixture<TaskItemComponent>;
  let component: TaskItemComponent;

  beforeEach(async () => {
    renderResult = await render(TaskItemComponent, {
      imports: [
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
      ]
    });
    taskTestBuilder = new TaskTestBuilder();
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
    component.stopPropagation = jest.fn();
  });

  it('should create', () => {
    const {container} = renderResult;
    expect(container).toBeInTheDocument();
  });

  it('should have a description', () => {
    const {container} = renderResult;

    component.task = taskTestBuilder
      .withLabel('Minha tarefa')
      .build();

    fixture.detectChanges();

    expect(container.textContent).toMatch(component.task.label);
  });

  it('should have a default description', () => {
    const {container} = renderResult;

    component.task = taskTestBuilder
      .withLabel('')
      .build();

    fixture.detectChanges();

    expect(container.textContent).toMatch(component.labelDefault);
  });

  it('should delete a task', () => {
    const {getByTitle} = renderResult;
    const removeTaskMock = jest.fn((task: Task) => task);

    component.task = taskTestBuilder.build();
    component.removeTask.emit = removeTaskMock;

    fixture.detectChanges();

    const removeButton = getByTitle('Remover');

    removeButton.click();

    expect(removeTaskMock).toBeCalledTimes(1);
    expect(removeTaskMock).toHaveBeenCalledWith(component.task);
    expect(removeTaskMock.mock.results[0].value).toBe(component.task);
    expect(component.stopPropagation).toHaveBeenCalled();
  });

  it('should edit a task', () => {
    const {getByTitle, getByPlaceholderText} = renderResult;
    const editTaskMock = jest.fn((task: Task) => task);
    const setValueMock = jest.fn((text: string) => text);

    component.task = taskTestBuilder.build();
    component.editTask.emit = editTaskMock;

    component.ngOnInit();
    fixture.detectChanges();

    component.form.controls.label.setValue = setValueMock;

    const editButton = getByTitle('Editar');

    editButton.click();

    fixture.detectChanges();

    const inputElement = getByPlaceholderText('Digite a descrição da tarefa...');

    expect(component.stopPropagation).toHaveBeenCalled();
    expect(setValueMock).toHaveBeenCalledTimes(1);
    expect(setValueMock).toHaveBeenCalledWith(component.task.label);
    expect(editTaskMock).toHaveBeenCalledTimes(1);
    expect(editTaskMock).toHaveBeenCalledWith(component.task);
    expect(editTaskMock.mock.results[0].value).toBe(component.task);
    expect(component.editing).toBe(true);
    expect(inputElement).toBe(document.activeElement);
  });

  it('should save changes on keydown Enter', () => {
    expect(false).toBeTruthy();
  });

  it('should save changes on input blur', () => {
    expect(false).toBeTruthy();
  });
});
