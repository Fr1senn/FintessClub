import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from "./components/admin-panel/admin-panel.component";
import { RouterModule } from "@angular/router";
import { AttendanceComponent } from "./components/attendance/attendance.component";
import { NotAuthenticatedGuard } from "../../guards/not-authenticated.guard";
import { FormsModule } from "@angular/forms";
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { SubscriptionComponent } from './components/subscriptions/subscription/subscription.component';
import { StaffOnlyGuard } from '../../guards/staff-only.guard';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderComponent } from './components/orders/order/order.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/users/user/user.component';


@NgModule({
  declarations: [
    AdminPanelComponent,
    AttendanceComponent,
    SubscriptionsComponent,
    SubscriptionComponent,
    OrdersComponent,
    OrderComponent,
    UsersComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'AdminPanel', component: AdminPanelComponent, canActivate: [StaffOnlyGuard, NotAuthenticatedGuard],
        children: [
          { path: '', redirectTo: 'Attendance', pathMatch: 'full' },
          { path: 'Attendance', component: AttendanceComponent },
          { path: 'Subscriptions', component: SubscriptionsComponent },
          { path: 'Orders', component: OrdersComponent },
          { path: 'Users', component: UsersComponent }
        ]
      }
    ]),
    FormsModule
  ],
  exports: [
    AdminPanelComponent,
    AttendanceComponent,
    SubscriptionsComponent,
    SubscriptionComponent,
    OrdersComponent,
    OrderComponent,
    UsersComponent,
    UserComponent
  ]
})
export class AdminPanelModule {
}
