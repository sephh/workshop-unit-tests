import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {TasksFacade, Task} from 'task-state';
import {take} from 'rxjs/operators';

@Component({
  selector: 'loc-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  task$: Observable<Task[]>;
  loading$: Observable<boolean>;
  selectedTaskId$: Observable<string>;

  queryFilter: string = '';

  constructor(public tasksFacade: TasksFacade) {
  }

  ngOnInit(): void {
    this.task$ = this.tasksFacade.tasks$;
    this.loading$ = this.tasksFacade.loading$;
    this.selectedTaskId$ = this.tasksFacade.selectedTaskId$;

    this.tasksFacade.getTasks();
  }

  addEmptyTask() {
    const newId = Math.random().toString(36).substr(2, 9);
    this.tasksFacade.createTask({
      id: newId,
      label: '',
      done: false
    });
    this.tasksFacade.selectTask(newId);
  }

  selectTask(task: Task) {
    this.tasksFacade.selectTask(task && task.id);
  }

  doneTask({id, done}) {
    this.task$
      .pipe(
        take(1)
      )
      .subscribe((tasks) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
          this.updateTask({...task, done});
        }
      });
  }

  updateTask(task: Task) {
    this.tasksFacade.updateTask(task);
    this.tasksFacade.selectTask(null);
  }

  removeTask(task: Task) {
    this.tasksFacade.deleteTask(task);
  }

}
