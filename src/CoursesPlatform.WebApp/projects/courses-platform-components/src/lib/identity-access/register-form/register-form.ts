import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PasswordInput } from '../password-input/password-input';

export interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'lib-register-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    PasswordInput,
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  @Input() isLoading = false;
  @Input() errorMessage = '';
  @Input() successMessage = '';

  @Output() register = new EventEmitter<RegistrationData>();
  @Output() login = new EventEmitter<void>();

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
        lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordStrengthValidator,
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    const valid = hasUppercase && hasLowercase && hasNumber;
    return valid ? null : { passwordStrength: true };
  }

  private passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  getFieldError(fieldName: string): string {
    const control = this.registerForm.get(fieldName);
    if (!control?.touched || !control?.errors) return '';

    if (control.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (control.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control.hasError('minlength')) {
      const minLength = control.getError('minlength').requiredLength;
      return `${this.getFieldLabel(fieldName)} must be at least ${minLength} characters`;
    }
    if (control.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `${this.getFieldLabel(fieldName)} must not exceed ${maxLength} characters`;
    }
    if (control.hasError('passwordStrength')) {
      return 'Password must contain uppercase, lowercase, and number';
    }
    return '';
  }

  get confirmPasswordError(): string {
    const control = this.registerForm.get('confirmPassword');
    if (!control?.touched) return '';

    if (control.hasError('required')) {
      return 'Please confirm your password';
    }
    if (this.registerForm.hasError('passwordMismatch')) {
      return 'Passwords do not match';
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
    };
    return labels[fieldName] || fieldName;
  }

  onSubmit(): void {
    if (this.registerForm.valid && !this.isLoading) {
      const { confirmPassword, ...data } = this.registerForm.value;
      this.register.emit(data as RegistrationData);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  onLogin(): void {
    this.login.emit();
  }
}
