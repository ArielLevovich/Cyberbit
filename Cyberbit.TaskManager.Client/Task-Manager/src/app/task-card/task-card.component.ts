// task-card.component.ts
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Task} from "../model/task";

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  taskForm: FormGroup;
  dueDate: Date | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Task,
            private fb: FormBuilder,
            private dialogRef: MatDialogRef<TaskCardComponent>) {
    this.taskForm = this.fb.group({
      taskTitle: ['', Validators.required],
      taskDescription: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  onClose(): void {
    this.dialogRef.close(); // Close dialog without passing data
  }
}
