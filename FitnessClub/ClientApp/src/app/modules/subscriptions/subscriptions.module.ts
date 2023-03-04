import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { SubscriptionsComponent } from "./components/subscriptions/subscriptions.component";
import { SubscriptionComponent } from "./components/subscription/subscription.component";


@NgModule({
  declarations: [
    SubscriptionsComponent,
    SubscriptionComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'Subscriptions', component: SubscriptionsComponent}
    ])
  ],
  exports: [
    SubscriptionsComponent,
    SubscriptionComponent
  ]
})
export class SubscriptionsModule {
}
