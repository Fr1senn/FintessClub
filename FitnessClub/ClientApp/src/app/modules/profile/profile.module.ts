import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialsComponent } from "./components/credentials/credentials.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NotAuthenticatedGuard } from "../../guards/not-authenticated.guard";
import { UserReviewsComponent } from "./components/user-reviews/user-reviews.component";
import { UserReviewComponent } from "./components/user-reviews/user-review/user-review.component";


@NgModule({
  declarations: [
    CredentialsComponent,
    UserReviewsComponent,
    UserReviewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'Profile', component: CredentialsComponent, canActivate: [NotAuthenticatedGuard],
        children: [
          {path: 'Reviews', component: UserReviewsComponent},
        ]
      }
    ]),
  ],
  exports: [
    CredentialsComponent,
    UserReviewsComponent,
    UserReviewComponent
  ]
})
export class ProfileModule {
}
