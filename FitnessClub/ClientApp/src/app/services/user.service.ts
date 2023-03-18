import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http: HttpClient;
  private readonly apiUrl: string = environment.baseApiUrl;
  constructor(http: HttpClient) {
    this.http = http;
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/User/GetCurrentUser');
  }
}
