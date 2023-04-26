import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../../../services/subscription.service';
import { Subscription } from "../../../../models/subscription";
import { Discount } from "../../../../models/discount";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss', './dropdownmenu.css']
})
export class SubscriptionsComponent implements OnInit {
  public subscriptions: Array<Subscription> = [];
  public possibleSubscriptions: string = '';
  public isNotDataLoaded: boolean = true;
  public minPriceValue: number = 0;
  public maxPriceValue: number = 0;

  private readonly subscriptionService: SubscriptionService;

  constructor(subscriptionService: SubscriptionService) {
    this.subscriptionService = subscriptionService;

    this.subscriptionService.getSubscriptions().subscribe(data => {
      this.subscriptions = Object.values(data);
      this.maxPriceValue = this.getMaxSubscriptionsPrice();
      this.isNotDataLoaded = false;
    });
  }

  ngOnInit(): void {
  }

  public getSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe(data => {
      this.subscriptions = Object.values(data);
    })
  }

  public getSubscriptionsBySearchedValue() {
    if (this.possibleSubscriptions.length === 0) {
      this.subscriptionService.getSubscriptions().subscribe(data => {
        this.subscriptions = Object.values(data);
      })
    }
    this.subscriptionService.getSubscriptionBySearchedValue(this.possibleSubscriptions).subscribe(data => {
      this.subscriptions = Object.values(data);
    })
  }

  public getMaxSubscriptionsPrice() {
    let subscriptionPrices: number[] = [];
    this.subscriptions.forEach((subscription: Subscription) => {
      let price = this.getSubscriptionPrice(subscription);
      subscriptionPrices.push(price);
    })
    return Math.round(Math.max(...subscriptionPrices));
  }

  public getSubscriptionsBetweenPrices() {
    this.subscriptions = this.subscriptions.filter((subscription: Subscription) => {
      let price = this.getSubscriptionPrice(subscription);
      if (price >= this.minPriceValue && price <= this.maxPriceValue) return subscription;
      else return;
    })
  }


  public sortByPrice() {
    this.subscriptions = this.insertionSort(this.subscriptions, 'pricePerDay');
    return this.subscriptions;
  }

  public sortByRating() {
    this.subscriptions = this.insertionSort(this.subscriptions, 'rating');
    return this.subscriptions;
  }

  private getSubscriptionPrice(subscription: Subscription): number {
    let discount = subscription.discounts.find((discount: Discount) => discount.subscriptionId === subscription.id);
    return discount?.isActive ? subscription.pricePerDay - subscription.pricePerDay * discount.discountPercentage / 100 : subscription.pricePerDay;
  }


  private insertionSort(subscriptions: Subscription[], sortField: 'pricePerDay' | 'rating') {
    for (let i = 1; i < subscriptions.length; i++) {
      const currentSubscription = subscriptions[i];
      const currentSortValue = sortField === 'pricePerDay' ? this.applyDiscount(currentSubscription.pricePerDay, currentSubscription.discounts) : currentSubscription.rating;
      let j = i - 1;
      while (j >= 0 && (sortField === 'pricePerDay' ? this.applyDiscount(subscriptions[j].pricePerDay, subscriptions[j].discounts) : subscriptions[j].rating) > currentSortValue) {
        subscriptions[j + 1] = subscriptions[j];
        j--;
      }
      subscriptions[j + 1] = currentSubscription;
    }
    return subscriptions;
  }

  private applyDiscount(pricePerDay: number, discounts: Discount[]) {
    let discountedPrice = pricePerDay;
    for (const discount of discounts) {
      if (discount.isActive) {
        const discountAmount = (discount.discountPercentage / 100) * pricePerDay;
        discountedPrice -= discountAmount;
      }
    }
    return discountedPrice;
  }
}
