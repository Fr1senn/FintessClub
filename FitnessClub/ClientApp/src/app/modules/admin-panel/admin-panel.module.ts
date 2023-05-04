import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from "./components/admin-panel/admin-panel.component";
import { RouterModule } from "@angular/router";
import { AttendanceComponent } from "./components/attendance/attendance.component";
import { NotAuthenticatedGuard } from "../../guards/not-authenticated.guard";
import { FormsModule } from "@angular/forms";
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';


@NgModule({
  declarations: [
    AdminPanelComponent,
    AttendanceComponent,
    SubscriptionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'AdminPanel', component: AdminPanelComponent, canActivate: [NotAuthenticatedGuard],
        children: [
          {path: '', redirectTo: 'Attendance', pathMatch: 'full'},
          { path: 'Attendance', component: AttendanceComponent },
          { path: 'Subscriptions', component: SubscriptionsComponent }
        ]
      }
    ]),
    FormsModule
  ],
  exports: [
    AdminPanelComponent,
    AttendanceComponent,
    SubscriptionsComponent
  ]
})
export class AdminPanelModule {
}
