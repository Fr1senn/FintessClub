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
import { WishlistItemComponent } from "./components/wishlist/wishlist-item/wishlist-item.component";
import { OrdersComponent } from './components/orders/orders.component';
import { UpdateCredentialsComponent } from "./components/update-credentials/update-credentials.component";


@NgModule({
  declarations: [
    CredentialsComponent,
    UserReviewsComponent,
    UserReviewComponent,
    WishlistComponent,
    WishlistItemComponent,
    OrdersComponent,
    UpdateCredentialsComponent
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
          {path: '', redirectTo: 'Orders', pathMatch: 'full'},
          {path: 'Reviews', component: UserReviewsComponent},
          {path: 'Wishlist', component: WishlistComponent},
          {path: 'Orders', component: OrdersComponent},
          {path: 'Edit', component: UpdateCredentialsComponent}
        ]
      }
    ]),
  ],
  exports: [
    CredentialsComponent,
    UserReviewsComponent,
    UserReviewComponent,
    WishlistComponent,
    WishlistItemComponent,
    UpdateCredentialsComponent
  ]
})
export class ProfileModule {
}
