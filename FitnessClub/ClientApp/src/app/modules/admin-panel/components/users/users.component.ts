import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: User[] = [];
  public birthDateFrom: string = '';
  public birthDateTill: string = '';
  public registrationDateFrom: string = '';
  public registrationDateTill: string = '';
  public userEmail: string = '';

  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = Object.values(data);
    });
  }

  public getUsersByBirthDateFromTill() {
    this.userService.getUsersByBirthDateFromTill(this.birthDateFrom, this.birthDateTill).subscribe(data => {
      this.users = Object.values(data);
    });
  }

  public getUsersByRegistrationDateFromTill() {
    this.userService.getUsersByRegistrationDateFromTill(this.registrationDateFrom, this.registrationDateTill).subscribe(data => {
      this.users = Object.values(data);
    });
  }

  public getUsersByEmail() {
    this.userService.getUsersByEmail(this.userEmail).subscribe(data => {
      this.users = Object.values(data);
    });
  }
}
