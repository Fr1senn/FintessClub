import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from "../../../../../models/review";
import { ReviewService } from "../../../../../services/review.service";

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent implements OnInit {
  @Input() public review: Review | undefined;
  public isEditing: boolean = false;
  public form!: FormGroup;
  public estimation: number = 1;
  private readonly formBuilder: FormBuilder;
  private readonly reviewService: ReviewService;

  constructor(formBuilder: FormBuilder, reviewService: ReviewService) {
    this.formBuilder = formBuilder;
    this.reviewService = reviewService;
  }

  ngOnInit(): void {
    this.form = this.getFormGroupInstance();
    this.estimation = this.review?.estimation!;
  }

  public saveChanges() {
    this.form.get('estimation')?.setValue(this.estimation);
    this.reviewService.edit(this.form).subscribe(() => {
      this.isEditing = false;
      this.review!.estimation = this.estimation;
      this.review!.reviewText = this.form.get('reviewText')?.value;
    });
  }

  public changeEstimation(index: number) {
    this.estimation = index + 1;
  }

  private getFormGroupInstance() {
    return this.formBuilder.group({
      id: new FormControl(this.review?.id),
      userId: new FormControl(this.review?.userId),
      subscriptionId: new FormControl(this.review?.subscriptionId),
      reviewText: new FormControl(this.review?.reviewText, [Validators.required, Validators.maxLength(5000)]),
      estimation: new FormControl(Math.round(this.review?.estimation!), [Validators.required])
    });
  }
}
