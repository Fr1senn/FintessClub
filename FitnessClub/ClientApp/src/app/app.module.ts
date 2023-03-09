import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from "./components/navigation-bar/navigation-bar.component";
import { FooterBarComponent } from "./components/footer-bar/footer-bar.component";
import { SubscriptionsModule } from "./modules/subscriptions/subscriptions.module";
import { RegistrationComponent } from "./components/registration/registration.component";

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    FooterBarComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'Registration', component: RegistrationComponent}
    ]),
    SubscriptionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
