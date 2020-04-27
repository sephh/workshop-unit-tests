import {fireEvent, render, RenderResult, userEvent, within} from '@testing-library/angular';
import {ComponentFixture} from '@angular/core/testing';
import {TasksComponent} from './tasks.component';
import {TaskListComponent} from '../../components/task-list/task-list.component';
import {TaskItemComponent} from '../../components/task-item/task-item.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {ItemNotFoundModule} from '../../../../shared/components/item-not-found/item-not-found.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingModule} from '../../../../shared/components/loading/loading.module';
import {ScoredFilterModule} from '../../../../shared/pipes/scored-filter/scored-filter.module';
import {Task, TasksFacade} from 'task-state';
import {TasksFacadeMock} from '../../../../../../__mocks__/tasks-facade.mock';
import {TaskTestBuilder} from '../../../../../../__mocks__/task-test.builder';
import {take} from 'rxjs/operators';

describe('TasksComponent', () => {
  let renderResult: RenderResult<TasksComponent>;
  let fixture: ComponentFixture<TasksComponent>;
  let component: TasksComponent;
  let tasksFacadeMock: TasksFacadeMock;
  let tasks: Task[] = [];

  beforeEach(async () => {
    tasksFacadeMock = new TasksFacadeMock();

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
        FormsModule
      ],
      providers: [
        {
          provide: TasksFacade,
          useValue: tasksFacadeMock
        }
      ]
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
    tasks = [
      new TaskTestBuilder()
        .withLabel('Tarefa 1')
        .build(),
      new TaskTestBuilder()
        .withLabel('Tarefa 2')
        .withDone(true)
        .build(),
      new TaskTestBuilder()
        .withLabel('Tarefa 3')
        .build(),
    ];
  });

  it('should create', () => {
    const {container} = renderResult;
    expect(container).toBeInTheDocument();
  });

  it('should load tasks', async () => {
    const {getByText} = renderResult;
    tasksFacadeMock.flushTasks(tasks);

    const tasks$ = await component.task$
      .pipe(
        take(1)
      ).toPromise();
    const loading$ = await component.loading$
      .pipe(
        take(1)
      ).toPromise();
    const selectedTaskId$ = await component.selectedTaskId$
      .pipe(
        take(1)
      ).toPromise();

    fixture.detectChanges();

    tasks.forEach((t) => {
      expect(getByText(t.label)).toBeInTheDocument();
    });
    expect(tasks$.length).toBe(3);
    expect(loading$).toBe(false);
    expect(selectedTaskId$).toBe('');
    expect(component.tasksFacade.getTasks).toHaveBeenCalled();
  });

  it('should show no tasks message on screen', () => {
    const {getByText} = renderResult;

    tasksFacadeMock.flushTasks([]);

    fixture.detectChanges();

    expect(getByText('Nenhuma tarefa cadastrada até o momento.')).toBeInTheDocument();
  });

  it('should show loading on screen', () => {
    const {getByTestId} = renderResult;

    tasksFacadeMock.loading$.next(true);

    fixture.detectChanges();

    expect(getByTestId('loc-tasks-loading')).toBeInTheDocument();
  });

  it('should add a empty task', async () => {
    const {getByText, getByPlaceholderText} = renderResult;

    const addButton = getByText('Adicionar tarefa');
    addButton.click();

    fixture.detectChanges();

    const inputElement = getByPlaceholderText('Digite a descrição da tarefa...') as HTMLInputElement;
    const selectedTaskId$ = await component.selectedTaskId$
      .pipe(
        take(1)
      ).toPromise();
    const tasks$ = await component.task$
      .pipe(
        take(1)
      ).toPromise();

    expect(component.tasksFacade.createTask).toHaveBeenCalledTimes(1);
    expect(inputElement).toBe(document.activeElement);
    expect(inputElement.value).toBe('');
    expect(selectedTaskId$).toBe(tasks$[0].id);
    expect(tasks$.length).toBe(1);
  });

  it('should select a task', async () => {
    const {getByTestId} = renderResult;

    tasksFacadeMock.flushTasks(tasks);

    fixture.detectChanges();

    const firstTask = tasks[0];
    const firstTaskElement = getByTestId(firstTask.id);
    const editButton = within(firstTaskElement).getByTitle('Editar');

    editButton.click();

    const selectedTaskId$ = await component.selectedTaskId$
      .pipe(
        take(1)
      ).toPromise();

    expect(selectedTaskId$).toBe(firstTask.id);
    expect(component.tasksFacade.selectTask).toHaveBeenCalledTimes(1);
    expect(component.tasksFacade.selectTask).toHaveBeenCalledWith(firstTask.id);
  });

  it('should done a task', async () => {
    const {getByText} = renderResult;

    tasksFacadeMock.flushTasks(tasks);

    fixture.detectChanges();

    const firstTask = tasks[0]; // task with done = false
    const secondTask = tasks[1]; // task with done = true
    const firstTaskElement = getByText(firstTask.label);
    const secondTaskElement = getByText(secondTask.label);

    firstTaskElement.click();
    secondTaskElement.click();

    const task$ = await component.task$
      .pipe(
        take(1)
      ).toPromise();

    [firstTask, secondTask].forEach((task) => {
      const updatedTask = task$.find(t => t.id === task.id);

      expect(updatedTask.done).toBe(!task.done);
      expect(updatedTask).not.toBe(task);
      expect(component.tasksFacade.updateTask).toHaveBeenCalledTimes(2);
      expect(component.tasksFacade.updateTask).toHaveBeenCalledWith({...task, done: !task.done});
      expect(component.tasksFacade.selectTask).toHaveBeenCalledTimes(2);
      expect(component.tasksFacade.selectTask).toHaveBeenCalledWith(null);
    });
  });

  it('should update a task', async () => {
    const {getByTestId, getByPlaceholderText} = renderResult;

    tasksFacadeMock.flushTasks(tasks);

    fixture.detectChanges();

    const firstTask = tasks[0];
    const firstTaskElement = getByTestId(firstTask.id);
    const editButton = within(firstTaskElement).getByTitle('Editar');

    editButton.click();

    fixture.detectChanges();

    const inputElement = getByPlaceholderText('Digite a descrição da tarefa...');
    const newLabel = 'Task 1 editada';

    userEvent.type(inputElement, newLabel);
    fireEvent.keyDown(inputElement, {key: 'Enter', code: 'Enter'});

    const task$ = await component.task$
      .pipe(
        take(1)
      ).toPromise();

    const updatedTask = task$.find(t => t.id === firstTask.id);

    expect(updatedTask.label).toBe(newLabel);
    expect(updatedTask).not.toBe(firstTask);
    expect(component.tasksFacade.updateTask).toHaveBeenCalledTimes(1);
    expect(component.tasksFacade.updateTask).toHaveBeenCalledWith({...firstTask, label: newLabel});
  });

  it('should remove a task', async () => {
    const {getByTestId} = renderResult;

    tasksFacadeMock.flushTasks(tasks);

    fixture.detectChanges();

    const firstTask = tasks[0];
    const firstTaskElement = getByTestId(firstTask.id);
    const removeButton = within(firstTaskElement).getByTitle('Remover');

    removeButton.click();

    fixture.detectChanges()

    const task$ = await component.task$
      .pipe(
        take(1)
      ).toPromise();

    expect(firstTaskElement).not.toBeInTheDocument();
    expect(task$.some(t => t.id === firstTask.id)).toBe(false);
    expect(component.tasksFacade.deleteTask).toHaveBeenCalledTimes(1);
    expect(component.tasksFacade.deleteTask).toHaveBeenCalledWith(firstTask);
  });
});
