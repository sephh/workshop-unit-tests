import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Task} from 'task-state';

@Component({
  selector: 'loc-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit, AfterViewInit {

  @ViewChild('inputField', {static: false}) inputField: ElementRef;

  @Input() editing: boolean;
  @Input() task: Task;
  @Output() removeTask = new EventEmitter<Task>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() updateTask = new EventEmitter<Task>();

  form: FormGroup;
  labelDefault = 'Sem descrição';

  constructor(
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit(): void {
    if (this.task && this.editing) {
      this.setFocus();
      this.cdRef.detectChanges();
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      label: [this.task ? this.task.label : ''],
    });
  }

  setFocus() {
    if (this.inputField) {
      this.inputField.nativeElement.focus();
    }
  }

  remove(evt: MouseEvent) {
    this.stopPropagation(evt);
    this.removeTask.emit(this.task);
  }

  edit(evt: MouseEvent) {
    this.stopPropagation(evt);
    this.form.controls.label.setValue(this.task.label);
    this.editing = true;
    this.editTask.emit(this.task);

    this.cdRef.detectChanges();
    this.setFocus();
  }

  submit() {
    const body = this.form.getRawValue();

    if (this.task.label !== body.label) {
      this.updateTask.emit({...this.task, ...body});
    } else {
      this.editTask.emit(null);
    }
  }

  stopPropagation(evt: MouseEvent) {
    evt.stopPropagation();
  }

}
