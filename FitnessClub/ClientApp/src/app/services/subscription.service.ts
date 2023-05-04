import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Subscription } from '../models/subscription';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private readonly http: HttpClient;
  private readonly apiUrl: string = environment.baseApiUrl;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getSubscriptions() {
    return this.http.get(this.apiUrl + '/Subscription/GetSubscriptions');
  }

  public getSubscription(id: number) {
    return this.http.get(this.apiUrl + `/Subscription/${id}`);
  }

  public getSubscriptionBySearchedValue(subscriptionTitle: string) {
    return this.http.get(this.apiUrl + '/Subscription/GetSubscriptionsBySearchedValue', {params: {'subscriptionTitle': subscriptionTitle}});
  }

  public updateSubscription(subscription: Object): Observable<Subscription> {
    return this.http.post<Subscription>(this.apiUrl + '/Subscription/UpdateSubscription', subscription, { responseType: "text" as "json" });
  }
}
