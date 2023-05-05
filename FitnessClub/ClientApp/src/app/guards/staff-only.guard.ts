import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class StaffOnlyGuard implements CanActivate {
  private userRole: string = '';
  private readonly userService: UserService;
  private readonly authService: AuthService;
  private readonly router: Router;

  constructor(userService: UserService, authService: AuthService, router: Router) {
    this.userService = userService;
    this.authService = authService;
    this.router = router;

    this.userService.currentUser.subscribe(user => {
      this.userRole = user.role?.title!;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isUserAuthenticated()) {
      if (this.userRole.toLowerCase() === 'admin' || this.userRole.toLowerCase() === 'manager') {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    } else {
      this.router.navigate(['Login']);
      return false;
    }
  }
}
