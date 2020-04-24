import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Task} from 'task-state';
import {MatSelectionListChange} from '@angular/material/list';

@Component({
  selector: 'loc-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() tasks: Task[] = [];
  @Input() selectedTaskId: string;

  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter<Task>();
  @Output() done = new EventEmitter<{ id: string; done: boolean; }>();
  @Output() update = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();

  constructor() {
  }

  ngOnInit(): void {
  }

  selectionChange(evt: MatSelectionListChange) {
    this.done.emit({id: evt.option.value, done: evt.option.selected});
  }

}
