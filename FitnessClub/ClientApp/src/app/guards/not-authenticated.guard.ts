import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthenticatedGuard implements CanActivate {
  private readonly router: Router;
  private readonly authService: AuthService;

  constructor(router: Router, authService: AuthService) {
    this.router = router;
    this.authService = authService;
  }

  canActivate(): boolean {
    if (!this.authService.isUserAuthenticated()) {
      this.router.navigate(['Login']);
      return false;
    }
    return true;
  }
}
