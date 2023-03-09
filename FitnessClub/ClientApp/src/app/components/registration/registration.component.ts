import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  errorMessage: string | undefined;
  maxAllowedBirthDate: string = new Date().getFullYear() - 6 + "-12" + "-31";
  minAllowedBirthDate: string = new Date().getFullYear() - 100 + "-01" + "-01";

  private readonly formBuilder: FormBuilder;
  private readonly router: Router;
  private readonly authService: AuthService;
  private readonly jwtHelperService: JwtHelperService;

  constructor(formBuilder: FormBuilder, router: Router, authService: AuthService, jwtHelperService: JwtHelperService) {
    this.formBuilder = formBuilder;
    this.router = router;
    this.authService = authService;
    this.jwtHelperService = jwtHelperService;

    this.form = this.getFormGroupInstance();
  }

  ngOnInit(): void {
  }

  public submit() {
    this.authService.registration(this.form).subscribe(() => {
        this.router.navigate(['']).then(() => alert('User has been successfully created'));
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400) this.errorMessage = error.error;
        else this.errorMessage = "Unknown error occurred";
      });
  }

  private getFormGroupInstance(): FormGroup {
    return this.formBuilder.group({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z]([a-zA-Z]| |-|')*$")]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z]([a-zA-Z]| |-|')*$")]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      birthDate: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&_])[A-Za-z\\d@$!%*#?&_]{8,}$")]),
      passwordConfirm: new FormControl(null, [Validators.required])
    }, {validators: this.matchValidator("password", "passwordConfirm")});
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
