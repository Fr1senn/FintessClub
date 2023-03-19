import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { Review } from "../models/review";
import { Subscription } from "../models/subscription";

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

  public getUserReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl + '/User/GetUserReviews');
  }

  public toggleWishlistItem(subscriptionId: number): Observable<Subscription> {
    return this.http.post<Subscription>(this.apiUrl + "/User/ToggleWishlistItem", subscriptionId, {responseType: "text" as "json"});
  }
}
