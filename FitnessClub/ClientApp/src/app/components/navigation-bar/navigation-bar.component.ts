import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  public userRole: string = '';

  private readonly authService: AuthService;
  private readonly router: Router;
  private readonly userService: UserService;

  public get isLoggedIn(): boolean {
    return this.authService.isUserAuthenticated();
  }

  constructor(authService: AuthService, router: Router, userService: UserService) {
    this.authService = authService;
    this.router = router;
    this.userService = userService;
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.userRole = user.role?.title!;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([""]);
  }
}
