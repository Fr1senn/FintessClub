import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from "../../../../services/user.service";

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {
  public user: User | undefined;
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  private getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe((data: Object) => {
      this.user = data as User;
    });
  }
}
