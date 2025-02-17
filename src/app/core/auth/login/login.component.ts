import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  apiError!: string;
  isCallingAPI: boolean = false;
  subscription: Subscription = new Subscription()

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    ]),
  });

  private _authService = inject(AuthService);
  private _router = inject(Router);

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.apiError = '';
      this.isCallingAPI = true;

      if (this.subscription) this.subscription.unsubscribe();
      this.subscription = this._authService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          this.isCallingAPI = false;
          this._router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          this.apiError = err.error.message;
          this.isCallingAPI = false;
        },
        complete: () => {
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
