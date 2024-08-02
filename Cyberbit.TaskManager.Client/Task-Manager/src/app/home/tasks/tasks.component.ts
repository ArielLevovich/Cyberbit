import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import {MatDialog} from "@angular/material/dialog";
import {TaskCardComponent} from "../../task-card/task-card.component";
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['view', 'title', 'description', 'creationTime', 'dueDate', 'status'];
  allTasks: Task[] = [];

  constructor(public taskService: TaskService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(allTasks => {
      this.allTasks = allTasks;
    });
  }

  viewTask(task: any): void {
    this.dialog.open(TaskCardComponent, {
      width: '250px',
      data: task
    });
  }
}
