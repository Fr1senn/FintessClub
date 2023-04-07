import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public orders: Order[] | undefined;

  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => this.orders = user.orders);
  }

  public calculateDaysLeft(purchaseDate: Date, daysAmount: number) {
    let currentDate: Date = new Date();
    let expirationDate: Date = new Date(new Date(purchaseDate).getTime() + (1000 * 60 * 60 * 24 * daysAmount));
    return Math.round((expirationDate.getTime() - currentDate.getTime()) / 86400000);
  }

}
