import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from "../../../../services/user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user: User | undefined;
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  public getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe((data: Object) => {
      this.user = data as User;
    });
  }

}
