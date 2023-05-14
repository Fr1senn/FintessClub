import { Component, OnInit } from '@angular/core';
import { Role } from '../../../../models/role';
import { User } from '../../../../models/user';
import { RoleService } from '../../../../services/role.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: User[] = [];
  public roles: Role[] = [];
  public birthDateFrom: string = '';
  public birthDateTill: string = '';
  public registrationDateFrom: string = '';
  public registrationDateTill: string = '';
  public userEmail: string = '';
  public userRole: string = '';

  private readonly userService: UserService;
  private readonly roleService: RoleService;

  constructor(userService: UserService, roleService: RoleService) {
    this.userService = userService;
    this.roleService = roleService;
  }

  ngOnInit(): void {
    this.getUsers();
    this.userService.currentUser.subscribe(user => {
      this.userRole = user.role?.title!;
    });
    this.roleService.getRoles().subscribe(data => {
      this.roles = Object.values(data);
    });
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

  public removeUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
  }
}
