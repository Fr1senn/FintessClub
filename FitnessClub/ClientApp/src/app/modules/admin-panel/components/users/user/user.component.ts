import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Role } from '../../../../../models/role';
import { User } from '../../../../../models/user';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: '[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() public user: User | undefined;
  @Input() public roles: Role[] | undefined;
  @Input() public userRole: string | undefined;
  @Output() public removeEvent: any = new EventEmitter<any>();
  public isEditing: boolean = false;
  public newUserRoleData = {
    userId: 0,
    userRole: ''
  };

  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.newUserRoleData.userId = this.user?.id!;
    this.newUserRoleData.userRole = this.user?.role?.title!;
  }

  public deleteUser() {
    this.userService.deleteUser(this.user?.id!).subscribe(() => {
      this.removeEvent.emit();
    })
  }

  public updateUserRole() {
    let roleId = this.roles?.find(role => role.title === this.newUserRoleData.userRole)?.id;
    this.userService.updateUserRole({
      userId: this.newUserRoleData.userId,
      roleId: roleId
    }).subscribe(() => {
      window.location.reload();
    })
  }
}
