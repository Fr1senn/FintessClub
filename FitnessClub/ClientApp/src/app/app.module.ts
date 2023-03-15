import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from "./components/navigation-bar/navigation-bar.component";
import { FooterBarComponent } from "./components/footer-bar/footer-bar.component";
import { SubscriptionsModule } from "./modules/subscriptions/subscriptions.module";
import { RegistrationComponent } from "./components/registration/registration.component";
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { LoginComponent } from "./components/login/login.component";
import { JwtExpirationInterceptor } from './interceptors/jwt-expiration.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { ProfileModule } from "./modules/profile/profile.module";

export function tokenGetter() {
  return localStorage.getItem('ACCESS_TOKEN_KEY');
}

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
      {path: 'Registration', component: RegistrationComponent, canActivate: [AuthenticatedGuard]},
      {path: 'Login', component: LoginComponent, canActivate: [AuthenticatedGuard]}
    ]),
    SubscriptionsModule,
    ProfileModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.baseApiUrl, environment.baseAppUrl],
        disallowedRoutes: []
      }
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtExpirationInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
