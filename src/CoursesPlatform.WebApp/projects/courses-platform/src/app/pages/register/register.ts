import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterForm, RegistrationData } from 'courses-platform-components';
import { AuthService } from '../../services';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

interface RegisterViewModel {
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RegisterForm],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  private isLoading$ = new BehaviorSubject<boolean>(false);
  private errorMessage$ = new BehaviorSubject<string>('');
  private successMessage$ = new BehaviorSubject<string>('');

  viewModel$ = combineLatest([
    this.isLoading$,
    this.errorMessage$,
    this.successMessage$
  ]).pipe(
    map(([isLoading, errorMessage, successMessage]) => ({
      isLoading,
      errorMessage,
      successMessage
    } as RegisterViewModel))
  );

  onRegister(data: RegistrationData): void {
    this.isLoading$.next(true);
    this.errorMessage$.next('');
    this.successMessage$.next('');

    this.authService.register(data).subscribe({
      next: (response) => {
        this.isLoading$.next(false);
        this.successMessage$.next(response.message);
      },
      error: (error) => {
        this.isLoading$.next(false);
        this.errorMessage$.next(error.error?.error || 'Registration failed. Please try again.');
      }
    });
  }

  onLogin(): void {
    this.router.navigate(['/login']);
  }
}
