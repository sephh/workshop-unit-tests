import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {TaskSchema} from '../../../../schemas/task.schema';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'loc-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit, AfterViewInit {

  @ViewChild('inputField', {static: false}) inputField: ElementRef;

  @Input() task: TaskSchema;
  @Output() removeTask = new EventEmitter<TaskSchema>();
  @Output() editTask = new EventEmitter<TaskSchema>();
  @Output() updateTask = new EventEmitter<TaskSchema>();

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit(): void {
    if (this.task && this.task.editing) {
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
    this.inputField.nativeElement.focus();
  }

  remove(evt: MouseEvent) {
    this.stopPropagation(evt);
    this.removeTask.emit(this.task);
  }

  edit(evt: MouseEvent) {
    this.stopPropagation(evt);
    this.form.controls.label.setValue(this.task.label);
    this.task.editing = true;

    this.cdRef.detectChanges();
    this.setFocus();

    this.editTask.emit(this.task);
  }

  submit() {
    const body = this.form.getRawValue();

    this.task.editing = false;
    this.task.label = body.label;

    this.updateTask.emit(this.task);
  }

  stopPropagation(evt: MouseEvent) {
    evt.stopPropagation();
  }

}
