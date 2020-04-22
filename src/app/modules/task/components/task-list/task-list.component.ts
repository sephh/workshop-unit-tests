import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {TaskSchema} from '../../../../schemas/task.schema';

@Component({
  selector: 'loc-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() tasks: TaskSchema[] = [];

  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter<TaskSchema>();

  constructor() {
  }

  ngOnInit(): void {
  }

  updateTasks(evt: any) {
    console.log(evt);
  }

}
