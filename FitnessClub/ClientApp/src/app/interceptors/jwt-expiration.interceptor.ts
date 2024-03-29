import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class JwtExpirationInterceptor implements HttpInterceptor {
  private readonly authService: AuthService;
  private readonly jwtHelperService: JwtHelperService;

  constructor(authService: AuthService, jwtHelper: JwtHelperService) {
    this.authService = authService;
    this.jwtHelperService = jwtHelper;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.userJwt && this.jwtHelperService.isTokenExpired(this.authService.userJwt)) {
      this.authService.logout();
      return EMPTY;
    }
    return next.handle(request);
  }
}
