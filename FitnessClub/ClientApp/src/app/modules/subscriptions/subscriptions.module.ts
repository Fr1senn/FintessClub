import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { SubscriptionsComponent } from "./components/subscriptions/subscriptions.component";


@NgModule({
  declarations: [
    SubscriptionsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([])
  ],
  exports: [
    SubscriptionsComponent
  ]
})
export class SubscriptionsModule {
}
