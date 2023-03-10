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
  subscriptionDuration: number = 1;

  constructor() { }

  ngOnInit(): void {
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
}
