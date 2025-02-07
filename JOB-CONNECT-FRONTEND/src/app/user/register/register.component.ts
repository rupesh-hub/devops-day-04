import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {AuthenticationService} from "../authentication-service.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator()
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
  }

  passwordStrengthValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      const errors: ValidationErrors = {};

      if (!hasUpperCase) errors['noUpperCase'] = true;
      if (!hasLowerCase) errors['noLowerCase'] = true;
      if (!hasNumeric) errors['noNumeric'] = true;
      if (!hasSpecialChar) errors['noSpecialChar'] = true;

      return Object.keys(errors).length ? errors : null;
    };
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.pristine || confirmPassword?.pristine) {
      return null;
    }

    return password && confirmPassword && password.value !== confirmPassword.value ?
      {'passwordMismatch': true} : null;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.authenticationService.register(this.registrationForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Registration failed:', error);
          }
        })
    }
  }

  // Helper methods for error messages
  getErrorMessage(controlName: string): string {
    const control = this.registrationForm.get(controlName);

    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return `${controlName} is required`;
    }

    if (control.errors['email']) {
      return 'Please enter a valid email address';
    }

    if (controlName === 'password') {
      const errors: string[] = [];

      if (control.errors['minlength']) {
        errors.push('Password must be at least 8 characters long');
      }
      if (control.errors['noUpperCase']) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (control.errors['noLowerCase']) {
        errors.push('Password must contain at least one lowercase letter');
      }
      if (control.errors['noNumeric']) {
        errors.push('Password must contain at least one number');
      }
      if (control.errors['noSpecialChar']) {
        errors.push('Password must contain at least one special character');
      }

      return errors.join(', ');
    }

    return '';
  }
}
