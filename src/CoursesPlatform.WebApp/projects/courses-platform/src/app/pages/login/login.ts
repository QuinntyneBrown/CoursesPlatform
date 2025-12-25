import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginForm, LoginCredentials } from 'courses-platform-components';
import { AuthService } from '../../services';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

interface LoginViewModel {
  isLoading: boolean;
  errorMessage: string;
  lockoutMessage: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  private isLoading$ = new BehaviorSubject<boolean>(false);
  private errorMessage$ = new BehaviorSubject<string>('');
  private lockoutMessage$ = new BehaviorSubject<string>('');

  viewModel$ = combineLatest([
    this.isLoading$,
    this.errorMessage$,
    this.lockoutMessage$
  ]).pipe(
    map(([isLoading, errorMessage, lockoutMessage]) => ({
      isLoading,
      errorMessage,
      lockoutMessage
    } as LoginViewModel))
  );

  onLogin(credentials: LoginCredentials): void {
    this.isLoading$.next(true);
    this.errorMessage$.next('');
    this.lockoutMessage$.next('');

    this.authService.login({
      email: credentials.email,
      password: credentials.password,
      rememberMe: credentials.rememberMe
    }).subscribe({
      next: (response) => {
        this.isLoading$.next(false);
        if (response.success) {
          this.router.navigate(['/courses']);
        } else {
          if (response.error?.includes('locked')) {
            this.lockoutMessage$.next(response.error);
          } else {
            this.errorMessage$.next(response.error || 'Login failed');
          }
        }
      },
      error: () => {
        this.isLoading$.next(false);
        this.errorMessage$.next('An error occurred. Please try again.');
      }
    });
  }

  onForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  onRegister(): void {
    this.router.navigate(['/register']);
  }
}
