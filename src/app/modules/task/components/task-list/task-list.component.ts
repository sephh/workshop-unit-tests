import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Task} from 'task-state';

@Component({
  selector: 'loc-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() tasks: Task[] = [];

  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter<Task>();

  constructor() {
  }

  ngOnInit(): void {
  }

  updateTasks(evt: any) {
    console.log(evt);
  }

}
