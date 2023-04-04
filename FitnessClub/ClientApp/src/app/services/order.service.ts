import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly http: HttpClient;
  private readonly apiUrl: string = environment.baseApiUrl;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public buySubscription(orderData: Object) {
    return this.http.post(this.apiUrl + '/Order/BuySubscription', orderData, {responseType: "text" as "json"});
  }
}
