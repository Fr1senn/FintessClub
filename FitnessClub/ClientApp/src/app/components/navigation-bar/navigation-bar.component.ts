import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  private readonly authService: AuthService;
  private readonly router: Router;

  public get isLoggedIn(): boolean {
    return this.authService.isUserAuthenticated();
  }

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([""]);
  }
}
