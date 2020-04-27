import {BehaviorSubject} from 'rxjs';
import {Task} from 'task-state';

export class TasksFacadeMock {
  tasks$ = new BehaviorSubject<Task[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  selectedTaskId$ = new BehaviorSubject<string>('');

  getTasks() {
  }

  createTask(task: Task) {
    const currentTasks = this.tasks$.getValue();
    this.tasks$.next([...currentTasks, task]);
  }

  selectTask(id: string) {
    this.selectedTaskId$.next(id);
  }

  updateTask(task: Task) {
    const currentTasks = this.tasks$.getValue();
    const updatedTasks = currentTasks.map(t => (t.id === task.id ? task : t));
    this.tasks$.next(updatedTasks);
  }

  deleteTask(task: Task) {
    const currentTasks = this.tasks$.getValue();
    this.tasks$.next(currentTasks.filter(t => t.id !== task.id));
  }

  flushTasks(tasks: Task[]) {
    this.tasks$.next(tasks);
  }
}
