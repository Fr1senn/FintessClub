import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Wishlist } from "../../../../../models/wishlist";
import { UserService } from "../../../../../services/user.service";
import { Discount } from "../../../../../models/discount";
import { SubscriptionService } from "../../../../../services/subscription.service";
import { Subscription } from "../../../../../models/subscription";
import { WishlistService } from 'src/app/services/wishlist.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: '[app-wishlist-item]',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.css']
})
export class WishlistItemComponent implements OnInit {
  @Input() public wishlistItem: Wishlist | undefined;
  @Output() public removeEvent: any = new EventEmitter<any>();
  public isEditing: boolean = false;
  public subscriptionDuration: number | undefined;
  public subscriptionTitle: string | undefined;
  public subscriptions: Subscription[] | undefined;

  private userWishlist: Wishlist[] | undefined;
  private readonly userService: UserService;
  private readonly wishlistService: WishlistService;
  private readonly orderService: OrderService;

  private readonly subscriptionService: SubscriptionService;

  constructor(userService: UserService, subscriptionService: SubscriptionService, wishlistService: WishlistService, orderService: OrderService) {
    this.userService = userService;
    this.subscriptionService = subscriptionService;
    this.wishlistService = wishlistService;
    this.orderService = orderService;

    this.userService.currentUser.subscribe(user => {
      this.userWishlist = user.wishlists;
    });
    this.subscriptionService.getSubscriptions().subscribe((data: Object) => {
      this.subscriptions = Object.values(data);
    });
  }

  ngOnInit(): void {
  }

  public calculateTotalPrice(subscriptionPricePerDay: number, daysAmount: number): number {
    let discount: Discount | undefined = this.wishlistItem?.subscription?.discounts.find((item: Discount) => {
      if (item.subscriptionId === this.wishlistItem?.subscriptionId) {
        return item;
      }
      return undefined;
    })
    if (discount?.isActive) {
      let wishlistItemPriceWithDiscount = subscriptionPricePerDay - (subscriptionPricePerDay * discount.discountPercentage / 100)
      return wishlistItemPriceWithDiscount * daysAmount;
    }
    return Math.round(daysAmount * subscriptionPricePerDay);
  }

  public increaseDaysBy(days: number): number {
    return this.subscriptionDuration! + days < 1 ? 1 : this.subscriptionDuration! += days;
  }

  public toggleWishlistItem(): void {
    let wishlistData = {
      subscriptionId: this.wishlistItem?.subscriptionId,
      subscriptionDuration: this.wishlistItem?.daysAmount
    }
    this.wishlistService.toggleWishlistItem(wishlistData).subscribe(() => this.removeEvent.emit());
  }

  public updateWishlistItem(): void {
    let wishlistItem = {
      id: this.wishlistItem?.id,
      subscriptionId: this.subscriptions?.find((subscription: Subscription) => subscription.title === this.subscriptionTitle)?.id!,
      subscriptionDuration: this.subscriptionDuration
    };
    this.wishlistService.updateWishlistItem(wishlistItem).subscribe(() => {
      this.isEditing = false;
      this.wishlistItem!.daysAmount = this.subscriptionDuration!;
      this.wishlistItem!.subscription!.title = this.subscriptionTitle!;
    });
  }

  public buySubscription(): void {
    let orderData = {
      userId: this.wishlistItem?.userId,
      subscriptionId: this.wishlistItem?.subscriptionId,
      daysAmount: this.wishlistItem?.daysAmount
    }
    this.orderService.buySubscription(orderData).subscribe(() => this.removeEvent.emit());
  }

  public setSubscriptionTitle() {
    this.subscriptionTitle = this.wishlistItem?.subscription?.title;
  }

  public isSubscriptionInWishlist(subscriptionId: number) {
    return !!this.userWishlist?.find(item => item.subscriptionId === subscriptionId);
  }
}
