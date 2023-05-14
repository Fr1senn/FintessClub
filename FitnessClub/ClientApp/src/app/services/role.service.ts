import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly http: HttpClient;
  private readonly apiUrl: string = environment.baseApiUrl;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl + '/Role/GetRoles');
  }
}
