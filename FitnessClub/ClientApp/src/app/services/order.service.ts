import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

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
    return this.http.post(this.apiUrl + '/Order/BuySubscription', orderData, { responseType: "text" as "json" });
  }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl + '/Order/GetOrders');
  }

  public getOrdersFromTill(ordersDateFrom: string, ordersDateTill: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl + '/Order/GetOrdersFromTill', {
      params: {
        'ordersDateFrom': ordersDateFrom,
        'ordersDateTill': ordersDateTill
      }
    });
  }

  public getOrdersByUser(userFirstName: string, userLastName: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl + '/Order/GetOrdersByUser', {
      params: {
        'userFirstName': userFirstName,
        'userLastName': userLastName
      }
    });
  }

  public deleteOrder(orderId: number) {
    return this.http.delete(this.apiUrl + '/Order/DeleteOrder', {
      params: {
        'orderId': orderId,
      }
    });
  }
}
