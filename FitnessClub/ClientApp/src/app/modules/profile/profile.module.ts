import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialsComponent } from "./components/credentials/credentials.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NotAuthenticatedGuard } from "../../guards/not-authenticated.guard";


@NgModule({
  declarations: [
    CredentialsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'Profile', component: CredentialsComponent, canActivate: [NotAuthenticatedGuard]}
    ]),
  ],
  exports: [
    CredentialsComponent,
  ]
})
export class ProfileModule {
}
