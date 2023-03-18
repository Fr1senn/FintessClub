import { Component, Input, OnInit } from '@angular/core';
import { Review } from "../../../../../models/review";

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent implements OnInit {
  @Input() review: Review | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
