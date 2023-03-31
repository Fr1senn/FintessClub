import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subscription } from '../models/subscription';
import { Wishlist } from '../models/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly http: HttpClient;
  private readonly apiUrl: string = environment.baseApiUrl;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public toggleWishlistItem(wishlistData: Object): Observable<Subscription> {
    return this.http.post<Subscription>(this.apiUrl + '/Wishlist/ToggleWishlistItem', wishlistData, {responseType: "text" as "json"});
  }

  public updateWishlistItem(wishlistItem: Object): Observable<Wishlist> {
    return this.http.patch<Wishlist>(this.apiUrl + '/Wishlist/UpdateWishlistItem', wishlistItem, {responseType: "text" as "json"});
  }
}
