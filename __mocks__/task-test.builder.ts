import {uid} from './uid';
import {Task} from 'task-state';

export class TaskTestBuilder {
  id: string;
  label: string;
  done: boolean;

  constructor() {
    this.id = uid();
    this.label = 'Tarefa importante';
    this.done = false;
  }

  withId(id: string): TaskTestBuilder {
    this.id = id;
    return this;
  }

  withLabel(label: string): TaskTestBuilder {
    this.label = label;
    return this;
  }

  withDone(done: boolean): TaskTestBuilder {
    this.done = done;
    return this;
  }

  build(): Task {
    return {
      ...this
    }
  }
}
