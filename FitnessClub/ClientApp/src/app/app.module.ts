import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from "./components/navigation-bar/navigation-bar.component";
import { FooterBarComponent } from "./components/footer-bar/footer-bar.component";
import { SubscriptionsModule } from "./modules/subscriptions/subscriptions.module";
import { RegistrationComponent } from "./components/registration/registration.component";
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { LoginComponent } from "./components/login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    FooterBarComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'Registration', component: RegistrationComponent},
      {path: 'Login', component: LoginComponent}
    ]),
    SubscriptionsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {

        allowedDomains: environment.tokenAllowedDomains
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
