import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NotAuthenticatedGuard } from "../../guards/not-authenticated.guard";


@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'Profile', component: UserProfileComponent, canActivate: [NotAuthenticatedGuard]}
    ]),
  ],
  exports: [
    UserProfileComponent,
  ]
})
export class ProfileModule {
}
