import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-password-restore',
  templateUrl: './password-restore.component.html',
  styleUrls: ['./password-restore.component.css']
})
export class PasswordRestoreComponent implements OnInit {
  public form!: FormGroup;
  public errorMessage: string | undefined;

  private readonly formBuilder: FormBuilder;
  private readonly userService: UserService;
  private readonly router: Router;

  constructor(formBuilder: FormBuilder, userService: UserService, router: Router) {
    this.formBuilder = formBuilder;
    this.userService = userService;
    this.router = router;

    this.form = this.getFormGroupInstance();
  }

  ngOnInit(): void {
  }

  public submit() {
    this.userService.passwordRestore(this.form).subscribe(
      () => {
        this.router.navigate(['Login']);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400)
          this.errorMessage = 'User with such email does not exist';
      });
  }

  private getFormGroupInstance() {
    let registrationForm: FormGroup;
    registrationForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&_])[A-Za-z\\d@$!%*#?&_]{8,}$")]),
      passwordConfirm: new FormControl('')
    }, { validators: this.matchValidator("password", "passwordConfirm") });
    return registrationForm;
  }

  private matchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}
