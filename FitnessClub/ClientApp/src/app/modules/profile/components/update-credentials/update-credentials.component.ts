import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../../services/user.service";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { User } from "../../../../models/user";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../../../../services/auth.service";

@Component({
  selector: 'app-update-credentials',
  templateUrl: './update-credentials.component.html',
  styleUrls: ['./update-credentials.component.css']
})
export class UpdateCredentialsComponent implements OnInit {
  public form!: FormGroup;
  public errorMessage: string | undefined;

  private user!: User;
  private readonly userService: UserService;
  private readonly authService: AuthService;
  private readonly formBuilder: FormBuilder;
  private readonly router: Router;

  constructor(userService: UserService, authService: AuthService, formBuilder: FormBuilder, router: Router) {
    this.userService = userService;
    this.authService = authService;
    this.formBuilder = formBuilder;
    this.router = router;

    this.userService.currentUser.subscribe(user => {
      this.user = user;
      this.form = this.getFormGroupInstance();
    })
  }

  ngOnInit(): void {
  }

  public submit() {
    if (!this.form.get('password')?.value || !this.form.get('passwordConfirm')?.value) {
      this.form.get('password')?.setValue(null);
      this.form.get('passwordConfirm')?.setValue(null);
    }

    this.userService.updateUserCredentials(this.form).subscribe(response => {
        if (!!this.form.get('password')?.value) {
          this.authService.logout();
          this.router.navigateByUrl('Login');
        } else {
          this.router.navigateByUrl('');
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      })
  }

  private getFormGroupInstance() {
    let registrationForm: FormGroup;
    registrationForm = this.formBuilder.group({
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&_])[A-Za-z\\d@$!%*#?&_]{8,}$")]),
      passwordConfirm: new FormControl('')
    }, {validators: this.matchValidator("password", "passwordConfirm")});
    return registrationForm;
  }

  private matchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? {mismatch: true}
        : null;
    };
  }

}
