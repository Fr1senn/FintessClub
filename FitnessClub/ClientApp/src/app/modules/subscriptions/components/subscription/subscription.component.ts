import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from "../../../../models/subscription";
import { Discount } from "../../../../models/discount";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  @Input() subscription: Subscription | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  public calculateDiscountPrice() {
    let discount: Discount | undefined = this.subscription?.discounts.find(discount => discount.subscriptionId === this.subscription?.id);
    if (discount !== undefined && this.subscription !== undefined) {
      if (discount.isActive) {
        return this.subscription.pricePerDay - (this.subscription.pricePerDay * discount.discountPercentage / 100);
      }
    }
    return this.subscription?.pricePerDay;
  }

  public isDiscountActive() {
    let discount: Discount | undefined = this.subscription?.discounts.find(discount => discount.subscriptionId === this.subscription?.id);
    if (discount === undefined) {
      return false;
    }
    return discount?.isActive;
  }
}
