import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public calculateTotalPrice(subscription_id: number): number {
    let wishlistItem: Wishlist | undefined = this.wishlist?.find(item => item.subscriptionId === subscription_id);
    return Math.round(wishlistItem?.daysAmount! * wishlistItem?.subscription?.pricePerDay!);
  }

}
