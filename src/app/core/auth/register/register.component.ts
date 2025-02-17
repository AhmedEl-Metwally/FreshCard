import { JsonPipe } from '@angular/common';
import { Component, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule ],   //JsonPipe
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy
{

  apiError!: string
  isCallingAPI: boolean = false
  subscription: Subscription = new Subscription()

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z\u0600-\u06FF\s']+$/)
      ]),
    
    email: new FormControl('',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
      ],
      
    ),
      
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]),
    
    rePassword: new FormControl('',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]),
    
    phone: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/)
      ])
  },
    {
      validators:
        [
          this.passwordMatchValidator,
          this.passwordStrengthValidator,
          this.emailDomainValidator
        ]
    }
  );

  _authService = inject(AuthService)
  _router = inject(Router)


  //passwordMatchValidator
  private passwordMatchValidator(cotrol: AbstractControl) : ValidationErrors | null
  {
    const password = cotrol.get("password")?.value
    const rePassword = cotrol.get("rePassword")?.value

    return password == rePassword ? null : { mismatch:true}
  }

  //passwordStrengthValidator
  private passwordStrengthValidator(control: AbstractControl) : ValidationErrors | null
  {
    const password = control.get("password")?.value
    if (!password) return null;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasPassword = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);

    const errors: ValidationErrors = {};
    if (!hasUpperCase) errors['upperCase'] = true;
    if (!hasLowerCase) errors['lowerCase'] = true;
    if (!hasPassword) errors['password'] = true;
    if (!hasSpecialChar) errors['specialChar'] = true;

    return Object.keys(errors).length ? errors : null
  }

  //emailDomainValidator
  private emailDomainValidator(control: AbstractControl): ValidationErrors | null
  {
    const email = control.get("email")?.value;
    if (!email) return null;

    const blockedDomain = ['example.com', 'test.com', 'temp.com'];
    const domain = email.split('@')[1];

    return blockedDomain.includes(domain) ? { invalidDomain: true }: null;
  }


  register() {
    if (this.registerForm.invalid)
    {
      this.registerForm.markAllAsTouched()
    }
    else
    {
      this.apiError = ''


        this.isCallingAPI = true

      if (this.subscription) this.subscription.unsubscribe()
      this.subscription = this._authService.registerUser(this.registerForm.value).subscribe
        ({
          next: (res) => {
            this.isCallingAPI = false
            this._router.navigate(['/auth/login'])
          },
          error: (err : HttpErrorResponse) => {
            this.apiError = err.error.message
            this.isCallingAPI = false
          },
          complete: () => {
            
          }
        })
    }
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
