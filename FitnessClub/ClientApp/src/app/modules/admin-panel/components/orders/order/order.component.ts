import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from '../../../../../models/order';
import { OrderService } from '../../../../../services/order.service';

@Component({
  selector: '[app-order]',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() public order: Order | undefined;
  @Output() public removeEvent: any = new EventEmitter<any>();
  public isAllowedToCancel: boolean = false;

  private readonly orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  ngOnInit(): void {
    this.checkIfAllowedToCancel();
  }

  public deleteOrder() {
    this.orderService.deleteOrder(this.order?.id!).subscribe(() => {
      this.removeEvent.emit();
    });
  }

  private checkIfAllowedToCancel(): void {
    if (this.calculateDaysSincePurchase() > 14) {
      this.isAllowedToCancel = false;
    } else {
      this.isAllowedToCancel = true;
    }
  }

  private calculateDaysSincePurchase(): number {
    let purchaseDate = new Date(this.order?.purchaseDate!);
    let currentDate = new Date();
    let differenceBetweenDatesInDays = Math.floor((currentDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
    return differenceBetweenDatesInDays;
  }

}
