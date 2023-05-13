import { Component, Input, OnInit } from '@angular/core';
import { Discount } from '../../../../../models/discount';
import { Subscription } from '../../../../../models/subscription';
import { SubscriptionService } from '../../../../../services/subscription.service';

@Component({
  selector: '[app-subscription]',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  @Input() public subscription: Subscription | undefined;
  @Input() public userRole: string | undefined;
  public isEditing: boolean = false;
  public editedSubscription = {
    id: 0,
    title: '',
    pricePerDay: 0,
    discountPercentage: 0,
    isActive: false
  };

  private readonly subscriptionService: SubscriptionService;

  constructor(subscriptionService: SubscriptionService) {
    this.subscriptionService = subscriptionService;
  }

  ngOnInit(): void {
    this.setDefaultSubscriptionValue();
  }

  public getSubscriptionDiscount() {
    return this.subscription?.discounts.find((discount: Discount) => discount.subscriptionId === this.subscription?.id);
  }

  public updateSubscription() {
    if (this.editedSubscription.isActive === undefined) {
      this.editedSubscription.isActive = false;
    }
    this.subscriptionService.updateSubscription(this.editedSubscription).subscribe(() => {
      this.subscription!.title = this.editedSubscription.title;
      this.subscription!.pricePerDay = this.editedSubscription.pricePerDay;
      this.subscription!.discounts.find(discount => discount.subscriptionId === this.subscription?.id)!.discountPercentage = this.editedSubscription.discountPercentage;
      this.subscription!.discounts.find(discount => discount.subscriptionId === this.subscription?.id)!.isActive = this.editedSubscription.isActive;
    })
  }

  private setDefaultSubscriptionValue() {
    this.editedSubscription.id = this.subscription?.id!;
    this.editedSubscription.title = this.subscription?.title!;
    this.editedSubscription.pricePerDay = this.subscription?.pricePerDay!;
    this.editedSubscription.discountPercentage = this.subscription?.discounts.find(discount => discount.subscriptionId === this.subscription?.id)?.discountPercentage!;
    this.editedSubscription.isActive = this.subscription?.discounts.find(discount => discount.subscriptionId === this.subscription?.id)?.isActive!;
  }

}
