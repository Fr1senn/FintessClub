import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../../../models/subscription';
import { SubscriptionService } from '../../../../services/subscription.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  public subscriptions: Subscription[] = [];
  public newSubscriptionData = {
    title: '',
    pricePerDay: 0.1,
    isCreateDiscount: false,
    discountPercentage: 1,
    isDiscountActive: false
  };

  private readonly subscriptionService: SubscriptionService;

  constructor(subscriptionService: SubscriptionService) {
    this.subscriptionService = subscriptionService;
  }

  ngOnInit(): void {
    this.getSubscirptions();
  }

  public getSubscirptions() {
    this.subscriptionService.getSubscriptions().subscribe(data => {
      this.subscriptions = Object.values(data);
    });
  }

  public createSubscription() {
    this.subscriptionService.createSubscription(this.newSubscriptionData).subscribe(() => {
      window.location.reload();
    });
  }
}
