import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ErrorMessageComponent } from "../../../shared/components/ui/error-message/error-message.component";
import { CustomInputComponent } from "../../../shared/components/ui/custom-input/custom-input.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ErrorMessageComponent, CustomInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  apiError!: string;
  isCallingAPI: boolean = false;
  toggleInput: boolean = false;
  subscription: Subscription = new Subscription()


  loginForm!: FormGroup 

  private _authService = inject(AuthService);
  private _router = inject(Router);


   ngOnInit(): void {
       this.initform()
  }
  
  initform() {
     this.loginForm = new FormGroup
      ({
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
  }



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
          localStorage.setItem("userToken", res.token)
          this._authService.saveUser()
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



  togglePassword()
  {
    this.toggleInput = !this.toggleInput
  }



  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
