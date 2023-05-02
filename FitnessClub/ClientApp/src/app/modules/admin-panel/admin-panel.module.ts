import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from "./components/admin-panel/admin-panel.component";
import { RouterModule } from "@angular/router";
import { AttendanceComponent } from "./components/attendance/attendance.component";
import { NotAuthenticatedGuard } from "../../guards/not-authenticated.guard";


@NgModule({
  declarations: [
    AdminPanelComponent,
    AttendanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'AdminPanel', component: AdminPanelComponent, canActivate: [NotAuthenticatedGuard],
        children: [
          {path: 'Attendance', component: AttendanceComponent},
        ]
      }
    ])
  ],
  exports: [
    AdminPanelComponent,
    AttendanceComponent
  ]
})
export class AdminPanelModule {
}
