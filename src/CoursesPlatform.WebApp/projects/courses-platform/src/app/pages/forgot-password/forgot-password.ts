import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

interface ForgotPasswordViewModel {
  isLoading: boolean;
  successMessage: string;
  errorMessage: string;
}

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  private isLoading$ = new BehaviorSubject<boolean>(false);
  private successMessage$ = new BehaviorSubject<string>('');
  private errorMessage$ = new BehaviorSubject<string>('');

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  viewModel$ = combineLatest([
    this.isLoading$,
    this.successMessage$,
    this.errorMessage$
  ]).pipe(
    map(([isLoading, successMessage, errorMessage]) => ({
      isLoading,
      successMessage,
      errorMessage
    } as ForgotPasswordViewModel))
  );

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading$.next(true);
    this.errorMessage$.next('');
    this.successMessage$.next('');

    this.authService.forgotPassword(this.form.value.email).subscribe({
      next: (response) => {
        this.isLoading$.next(false);
        this.successMessage$.next(response.message);
      },
      error: () => {
        this.isLoading$.next(false);
        this.errorMessage$.next('An error occurred. Please try again.');
      }
    });
  }

  onBackToLogin(): void {
    this.router.navigate(['/login']);
  }
}
