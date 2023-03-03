import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../../../services/subscription.service';
import { Subscription } from "../../../../models/subscription";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  public subscriptions: Array<Subscription> = [];
  private readonly subscriptionService: SubscriptionService;

  constructor(subscriptionService: SubscriptionService) {
    this.subscriptionService = subscriptionService;
  }

  ngOnInit(): void {
    this.getSubscriptions();
  }

  private getSubscriptions(): void {
    this.subscriptionService.getSubscriptions().subscribe(data => {
      this.subscriptions = Object.values(data);
    })
  }

}
