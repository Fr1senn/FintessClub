import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from "../../../../models/subscription";
import { Discount } from "../../../../models/discount";
import { AuthService } from "../../../../services/auth.service";
import { UserService } from "../../../../services/user.service";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  @Input() public subscription: Subscription | undefined;
  public subscriptionDuration: number = 1;
  public isInWishlist: boolean = false;

  private readonly authService: AuthService;
  private readonly userService: UserService

  public get isUserAuthenticated() {
    return this.authService.isUserAuthenticated();
  }

  constructor(authService: AuthService, userService: UserService) {
    this.authService = authService;
    this.userService = userService;
  }

  ngOnInit(): void {
    this.checkIfInWishlist();
  }

  public calculateDiscountPrice(): number | undefined {
    let discount: Discount | undefined = this.subscription?.discounts.find(discount => discount.subscriptionId === this.subscription?.id);
    if (discount !== undefined && this.subscription !== undefined) {
      if (discount.isActive) {
        return this.subscription.pricePerDay - (this.subscription.pricePerDay * discount.discountPercentage / 100);
      }
    }
    return this.subscription?.pricePerDay;
  }

  public isDiscountActive(): boolean {
    let discount: Discount | undefined = this.subscription?.discounts.find(discount => discount.subscriptionId === this.subscription?.id);
    if (discount === undefined) {
      return false;
    }
    return discount?.isActive;
  }

  public increaseDaysBy(days: number): number {
    return this.subscriptionDuration + days < 1 ? 1 : this.subscriptionDuration += days;
  }

  public calculateTotalPrice(): number {
    return Number((this.subscriptionDuration * this.subscription?.pricePerDay!).toFixed(1));
  }

  public toggleWishlistItem() {
    let wishlistData = {
      subscriptionId: this.subscription?.id,
      subscriptionDuration: this.subscriptionDuration

    }
    this.userService.toggleWishlistItem(wishlistData).subscribe(() => this.isInWishlist = !this.isInWishlist);
  }

  private checkIfInWishlist(): void {
    this.userService.currentUser.subscribe(user => {
      if (this.findProductInWishlist(user.wishlists.sort((a: any, b: any) => a.subscriptionId - b.subscriptionId), this.subscription!.id) !== -1)
        this.isInWishlist = true;
    });
  }

  private findProductInWishlist(wishlist: any[], target: number): number {
    let leftBoundary: number = 0;
    let rigthBoundary: number = wishlist.length - 1;

    while (leftBoundary <= rigthBoundary) {
      const indexOfArrayMiddle: number = Math.trunc((leftBoundary + rigthBoundary) / 2);

      if (wishlist[indexOfArrayMiddle].subscriptionId === target) return indexOfArrayMiddle;

      if (target < wishlist[indexOfArrayMiddle].subscriptionId) rigthBoundary = indexOfArrayMiddle - 1;
      else leftBoundary = indexOfArrayMiddle + 1;
    }
    return -1;
  }
}
