import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http: HttpClient;
  private readonly apiUrl: string = environment.baseApiUrl;
  private readonly userData: Observable<User>;

  public get currentUser() {
    return this.userData;
  }

  constructor(http: HttpClient) {
    this.http = http;
    this.userData = this.getCurrentUser();
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/User/GetCurrentUser');
  }

  public updateUserCredentials(form: FormGroup) {
    return this.http.patch(this.apiUrl + '/User/UpdateUserCredentials', form.getRawValue(), {
      observe: "response",
      responseType: "text" as "json"
    });
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/User/GetUsers');
  }
}
