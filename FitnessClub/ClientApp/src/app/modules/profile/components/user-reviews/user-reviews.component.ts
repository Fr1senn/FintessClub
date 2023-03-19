import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review';
import { UserService } from "../../../../services/user.service";

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit {
  public reviews: Review[] | undefined;
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
    this.userService.currentUser.subscribe(user => this.reviews = user.reviews);
  }

  ngOnInit(): void {
  }

  public remove(id: number) {
    this.reviews = this.reviews!.filter((item: Review) => item.id !== id);
  }
}
