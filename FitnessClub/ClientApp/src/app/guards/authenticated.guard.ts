import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  private userRole: string = '';
  private readonly authService: AuthService;
  private readonly router: Router;
  private readonly userService: UserService;

  constructor(authService: AuthService, router: Router, userService: UserService) {
    this.authService = authService;
    this.router = router;
    this.userService = userService;

    this.userService.currentUser.subscribe(user => {
      this.userRole = user.role?.title!;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isUserAuthenticated()) {
      if (this.userRole === 'admin' || this.userRole === 'manager') {
        return true;
      }
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
