import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { NAVIGATION_URLS } from '../model/enums/navigation-urls';
import { AuthService } from '../services/auth.service';
//import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userId: number | undefined = undefined;

  constructor(private router: Router, 
            private authService: AuthService,
            private taskService: TaskService) {
            //private dialog: MatDialog) {
    this.authService.login$.pipe(filter(loggedIn => loggedIn !== null)).subscribe((loggedIn => {
      if (!loggedIn) {
        this.router.navigate([NAVIGATION_URLS.LOGIN]);
      } else {
        this.authService.userDetails$.subscribe(user => {
            this.userId = user?.id;
        })
      }
    }));
  }

  logout() {
    this.authService.logout();
    this.router.navigate([NAVIGATION_URLS.LOGIN]);
  }

  // createTask() {
  //   const dialogRef = this.dialog.open(TaskCardComponent, {
  //     //width: '250px',
  //     //height: '300px',
  //     data: {name: 'Angular'}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

  markTasksDone(): void {
    const userConfirmed = confirm("Are you sure you want to proceed with this action?");
    if (userConfirmed && this.userId) {
      this.taskService.markTasksAsDone(this.userId).subscribe(res => {
        if (!res) {
          alert('Failed to update the tasks status');
        } else {
          window.location.reload(); // refresh page on update
        }
      })
    }
  }
}
