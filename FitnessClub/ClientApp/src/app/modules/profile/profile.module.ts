import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialsComponent } from "./components/credentials/credentials.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NotAuthenticatedGuard } from "../../guards/not-authenticated.guard";
import { UserReviewsComponent } from "./components/user-reviews/user-reviews.component";
import { UserReviewComponent } from "./components/user-reviews/user-review/user-review.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WishlistComponent } from "./components/wishlist/wishlist.component";


@NgModule({
  declarations: [
    CredentialsComponent,
    UserReviewsComponent,
    UserReviewComponent,
    WishlistComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'Profile', component: CredentialsComponent, canActivate: [NotAuthenticatedGuard],
        children: [
          {path: 'Reviews', component: UserReviewsComponent},
          {path: 'Wishlist', component: WishlistComponent}
        ]
      }
    ]),
  ],
  exports: [
    CredentialsComponent,
    UserReviewsComponent,
    UserReviewComponent,
    WishlistComponent
  ]
})
export class ProfileModule {
}
