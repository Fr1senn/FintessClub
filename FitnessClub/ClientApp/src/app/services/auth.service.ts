import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http: HttpClient;
  private readonly jwtHelperService: JwtHelperService;
  private readonly router: Router;
  private readonly apiUrl: string = environment.baseApiUrl;

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
}