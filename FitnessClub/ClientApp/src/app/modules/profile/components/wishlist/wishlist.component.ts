import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../../services/user.service";
import { Wishlist } from "../../../../models/wishlist";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  public wishlist: Wishlist[] | undefined;
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
    this.userService.currentUser.subscribe(user => this.wishlist = user.wishlists);
  }

  ngOnInit(): void {
  }

  public calculateTotalPrice(subscription_id: number): number {
    let wishlistItem: Wishlist | undefined = this.wishlist?.find(item => item.subscriptionId === subscription_id);
    return Math.round(wishlistItem?.daysAmount! * wishlistItem?.subscription?.pricePerDay!);
  }

}
