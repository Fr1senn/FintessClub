import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "../../../../models/subscription";
import {Discount} from "../../../../models/discount";
import {AuthService} from "../../../../services/auth.service";
import {UserService} from "../../../../services/user.service";
import {WishlistService} from 'src/app/services/wishlist.service';
import {OrderService} from 'src/app/services/order.service';
import {Router} from '@angular/router';
import {Order} from "../../../../models/order";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  @Input() public subscription: Subscription | undefined;
  public subscriptionDuration: number = 1;
  public isInWishlist: boolean = false;
  public isAllowedToBuy: boolean | undefined;

  private userId: number | undefined;
  private readonly authService: AuthService;
  private readonly userService: UserService;
  private readonly wishlistService: WishlistService;
  private readonly orderService: OrderService;
  private readonly router: Router;

  public get isUserAuthenticated() {
    return this.authService.isUserAuthenticated();
  }

  constructor(authService: AuthService, userService: UserService, wishlistService: WishlistService, orderService: OrderService, router: Router) {
    this.authService = authService;
    this.userService = userService;
    this.wishlistService = wishlistService;
    this.orderService = orderService;
    this.router = router;
    this.isAllowedToBuy = this.isUserAuthenticated;

    if (this.isUserAuthenticated)
      this.userService.currentUser.subscribe(user => {
        this.userId = user.id;
        user.orders.forEach((order: Order) => {
          if (order.subscriptionId === this.subscription?.id && order.userId === this.userId) {
            let currentDate: Date = new Date();
            let expirationDate: Date = new Date(new Date(order.purchaseDate).getTime() + (1000 * 60 * 60 * 24 * order.daysAmount));
            this.isAllowedToBuy = currentDate >= expirationDate;
          }
        })
      });
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
    this.wishlistService.toggleWishlistItem(wishlistData).subscribe(() => this.isInWishlist = !this.isInWishlist);
  }

  public buySubscription(): void {
    if (!this.isUserAuthenticated) this.router.navigate(['']);

    let orderData = {
      userId: this.userId,
      subscriptionId: this.subscription?.id,
      daysAmount: this.subscriptionDuration
    }

    this.orderService.buySubscription(orderData).subscribe(() => this.isInWishlist = false);
  }

  private checkIfInWishlist(): void {
    if (this.isUserAuthenticated) {
      this.userService.currentUser.subscribe(user => {
        if (this.findProductInWishlist(user.wishlists.sort((a: any, b: any) => a.subscriptionId - b.subscriptionId), this.subscription!.id) !== -1)
          this.isInWishlist = true;
      });
    }

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
