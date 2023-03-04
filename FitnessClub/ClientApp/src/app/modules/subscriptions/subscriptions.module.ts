import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { SubscriptionsComponent } from "./components/subscriptions/subscriptions.component";
import { SubscriptionComponent } from "./components/subscription/subscription.component";
import { SubscriptionDetailComponent } from "./components/subscription-detail/subscription-detail.component";


@NgModule({
  declarations: [
    SubscriptionsComponent,
    SubscriptionComponent,
    SubscriptionDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'Subscriptions', component: SubscriptionsComponent},
      {path: 'Subscriptions/Details/:id', component: SubscriptionDetailComponent}
    ])
  ],
  exports: [
    SubscriptionsComponent,
    SubscriptionComponent,
    SubscriptionDetailComponent
  ]
})
export class SubscriptionsModule {
}
