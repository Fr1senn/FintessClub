import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../../../models/user';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: '[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: User | undefined;
  @Output() public removeEvent: any = new EventEmitter<any>();

  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
  }

  public deleteUser() {
    this.userService.deleteUser(this.user?.id!).subscribe(() => {
      this.removeEvent.emit();
    })
  }

}
