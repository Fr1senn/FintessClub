import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http: HttpClient;
  private readonly jwtHelperService: JwtHelperService;
  private readonly router: Router;
  private readonly apiUrl: string = environment.baseApiUrl;

  get userJwt(): string | null {
    return localStorage.getItem('ACCESS_TOKEN_KEY');
  }

  private set userJwt(jwToken: string | null) {
    if (!jwToken)
      throw new Error('Token wasn\'t specified');
    localStorage.setItem('ACCESS_TOKEN_KEY', jwToken);
  }

  constructor(http: HttpClient, router: Router, jwtHelperService: JwtHelperService) {
    this.http = http;
    this.jwtHelperService = jwtHelperService;
    this.router = router;
  }

  public registration(form: FormGroup) {
    return this.http.post(this.apiUrl + '/Auth/Registration', form.getRawValue(), {
      observe: 'response',
      responseType: 'text' as 'json'
    });
  }

  public async login(form: FormGroup): Promise<boolean> {
    await this.http.post<string>(this.apiUrl + '/Auth/Login', form.getRawValue(),
      {responseType: 'text' as 'json'}).pipe(tap(data => this.userJwt = data)).toPromise();
    return !!this.userJwt && !this.jwtHelperService.isTokenExpired(this.userJwt);
  }

  public isUserAuthenticated(): boolean {
    let token: string | null = this.userJwt;
    return (!!token && !this.jwtHelperService.isTokenExpired(token)) as boolean;
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
