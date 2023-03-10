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

  constructor() { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([""]);
  }
}
