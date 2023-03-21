import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Wishlist } from "../../../../../models/wishlist";
import { UserService } from "../../../../../services/user.service";
import { Discount } from "../../../../../models/discount";

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

  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
  }

  public calculateTotalPrice(): number {
    let discount: Discount | undefined = this.wishlistItem?.subscription?.discounts.find((item: Discount) => {
      if (item.subscriptionId === this.wishlistItem?.subscriptionId) {
        return item;
      }
      return undefined;
    })
    if (discount?.isActive) {
      let wishlistItemPriceWithDiscount = this.wishlistItem?.subscription?.pricePerDay! - (this.wishlistItem?.subscription?.pricePerDay! * discount.discountPercentage / 100)
      return wishlistItemPriceWithDiscount * this.wishlistItem?.daysAmount!;
    }
    return Math.round(this.wishlistItem?.daysAmount! * this.wishlistItem?.subscription?.pricePerDay!);
  }

  public increaseDaysBy(days: number): number {
    return this.subscriptionDuration! + days < 1 ? 1 : this.subscriptionDuration! += days;
  }

  public toggleWishlistItem(): void {
    let wishlistData = {
      subscriptionId: this.wishlistItem?.subscriptionId,
      subscriptionDuration: this.wishlistItem?.daysAmount
    }
    this.userService.toggleWishlistItem(wishlistData).subscribe(() => this.removeEvent.emit());
  }

  public updateWishlistItem(): void {
    let wishlistItem = {
      subscriptionId: this.wishlistItem?.subscriptionId,
      subscriptionDuration: this.subscriptionDuration
    };
    this.userService.updateWishlistItem(wishlistItem).subscribe((data: Wishlist) => {
      this.isEditing = false;
      this.wishlistItem!.daysAmount = this.subscriptionDuration!;
    });
  }

}
