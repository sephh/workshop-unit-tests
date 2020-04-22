import {Component, OnInit} from '@angular/core';
import {TaskSchema} from '../../../../schemas/task.schema';

@Component({
  selector: 'loc-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: TaskSchema[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  addEmptyTask() {
    console.log(Math.random().toString(36).substr(2, 9));
    this.tasks = [
      ...this.tasks.map(t => ({...t, editing: false})),
      {
        id: Math.random().toString(36).substr(2, 9),
        label: '',
        index: this.tasks.length,
        editing: true
      }
    ];
  }

  removeTask(task: TaskSchema) {
    this.tasks = this.tasks.filter(t => t !== task);
  }

}
