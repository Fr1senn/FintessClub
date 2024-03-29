import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { SubscriptionsComponent } from "./components/subscriptions/subscriptions.component";
import { SubscriptionComponent } from "./components/subscription/subscription.component";
import { FormsModule } from "@angular/forms";
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    SubscriptionsComponent,
    SubscriptionComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'Subscriptions', pathMatch: 'full'},
      {path: 'Subscriptions', component: SubscriptionsComponent}
    ]),
    FormsModule,
    NgxSliderModule
  ],
  exports: [
    SubscriptionsComponent,
    SubscriptionComponent
  ]
})
export class SubscriptionsModule {
}
