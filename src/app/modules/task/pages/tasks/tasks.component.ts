import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {TasksFacade, Task} from 'task-state';

@Component({
  selector: 'loc-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  task$: Observable<Task[]>;

  constructor(private tasksFacade: TasksFacade) {
  }

  ngOnInit(): void {
    this.task$ = this.tasksFacade.tasks$;
  }

  addEmptyTask() {
    this.tasksFacade.createTask({
      id: Math.random().toString(36).substr(2, 9),
      label: '',
      done: false
    });
  }

  removeTask(task: Task) {
    this.tasksFacade.deleteTask(task);
  }

}
