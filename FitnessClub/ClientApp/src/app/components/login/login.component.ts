import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage: string | undefined;

  private readonly authService: AuthService;
  private readonly formBuilder: FormBuilder;
  private readonly router: Router;

  constructor(authService: AuthService, formBuilder: FormBuilder, router: Router) {
    this.authService = authService;
    this.formBuilder = formBuilder;
    this.router = router;
    this.form = this.getFormGroupInstance();
  }

  ngOnInit(): void {
  }

  public submit() {
    this.authService.login(this.form)
      .then(() => this.router.navigate(['']))
      .catch((error: HttpErrorResponse) => {
        if (error.status === 400) this.errorMessage = error.error
        else this.errorMessage = 'Unknown error occurred';
      });
  }

  private getFormGroupInstance() {
    return this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&_])[A-Za-z\\d@$!%*#?&_]{8,}$')]),
    });
  }
}
