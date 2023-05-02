import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from "./components/admin-panel/admin-panel.component";
import { RouterModule } from "@angular/router";
import { NotAuthenticatedGuard } from "../../guards/not-authenticated.guard";


@NgModule({
  declarations: [
    AdminPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'AdminPanel', component: AdminPanelComponent, canActivate: [NotAuthenticatedGuard]}
    ])
  ],
  exports: [
    AdminPanelComponent
  ]
})
export class AdminPanelModule {
}
