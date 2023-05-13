import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../../../models/subscription';
import { SubscriptionService } from '../../../../services/subscription.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  public subscriptions: Subscription[] = [];
  public userRole: string = '';
  public newSubscriptionData = {
    title: '',
    pricePerDay: 0.1,
    isCreateDiscount: false,
    discountPercentage: 1,
    isDiscountActive: false
  };

  private readonly subscriptionService: SubscriptionService;
  private readonly userService: UserService;

  constructor(subscriptionService: SubscriptionService, userService: UserService) {
    this.subscriptionService = subscriptionService;
    this.userService = userService;
  }

  ngOnInit(): void {
    this.getSubscirptions();

    this.userService.currentUser.subscribe(user => {
      this.userRole = user.role?.title!;
    })
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
