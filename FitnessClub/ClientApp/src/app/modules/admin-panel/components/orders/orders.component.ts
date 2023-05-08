import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../../models/order';
import { Subscription } from '../../../../models/subscription';
import { User } from '../../../../models/user';
import { OrderService } from '../../../../services/order.service';
import { SubscriptionService } from '../../../../services/subscription.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public orders: Order[] = [];
  public users: User[] = [];
  public subscriptions: Subscription[] = [];
  public ordersDateFrom: string = '';
  public ordersDateTill: string = '';
  public userName: string = '';
  public newOrderData = {
    userName: '',
    subscriptionTitle: '',
    daysAmount: 1
  }

  private readonly orderService: OrderService;
  private readonly userService: UserService;
  private readonly subscriptionService: SubscriptionService;
  private readonly router: Router;

  constructor(orderService: OrderService, userService: UserService, subscriptionService: SubscriptionService, router: Router) {
    this.orderService = orderService;
    this.userService = userService;
    this.subscriptionService = subscriptionService;
    this.router = router;
  }

  ngOnInit(): void {
    this.getOrders();
    this.getUsers();
    this.getSubscriptions();
  }

  public getOrders() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = Object.values(data);
    });
  }

  public getOrdersFromTill() {
    this.orderService.getOrdersFromTill(this.ordersDateFrom, this.ordersDateTill).subscribe(data => {
      this.orders = Object.values(data);
    });
  }

  public getOrdersByUser() {
    let userName: string[] = [];
    if (this.userName === '') {
      userName[0] = this.getUniqueUsers()[0]?.user?.firstName!;
      userName[1] = this.getUniqueUsers()[0]?.user?.lastName!;
    } else {
      userName = this.userName.split(' ');
    }
    this.orderService.getOrdersByUser(userName[0], userName[1]).subscribe(data => {
      this.orders = Object.values(data);
    });
  }

  public removeOrder(id: number) {
    this.orders = this.orders.filter(order => order.id !== id);
  }

  public getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = Object.values(data);
    });
  }

  public getSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe(data => {
      this.subscriptions = Object.values(data);
    });
  }

  public buySubscription() {
    const orderDTO = this.createOrderDTO();
    this.orderService.buySubscription(orderDTO).subscribe(() => {
      window.location.reload();
    });
  }

  public getUniqueUsers(): Order[] {
    let uniqueAttendanceSet = new Set();
    let uniqueAttendanceArr = [];

    for (let i = 0; i < this.orders.length; i++) {
      let order = this.orders[i];

      if (!uniqueAttendanceSet.has(order.userId)) {
        uniqueAttendanceSet.add(order.userId);
        uniqueAttendanceArr.push(order);
      }
    }
    return uniqueAttendanceArr;
  }

  private getUser() {
    const userName = this.newOrderData.userName;
    const users = this.users;
    return users.find(u => u.firstName + ' ' + u.lastName === userName) || users[0];
  }

  private getSubscription() {
    const subscriptionTitle = this.newOrderData.subscriptionTitle;
    const subscriptions = this.subscriptions;
    return subscriptions.find(s => s.title === subscriptionTitle) || subscriptions[0];
  }

  private createOrderDTO() {
    const user = this.getUser();
    const subscription = this.getSubscription();
    return {
      userId: user.id,
      subscriptionId: subscription.id,
      daysAmount: this.newOrderData.daysAmount
    };
  }
}
