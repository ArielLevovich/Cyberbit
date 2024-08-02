import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'role'];
  allUsers: User[] = [];

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(allUsers => {
      this.allUsers = allUsers;
    });
  }
}
