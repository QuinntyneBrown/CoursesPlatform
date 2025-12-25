import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginForm, LoginCredentials } from 'courses-platform-components';
import { AuthService } from '../../services';

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

  isLoading = false;
  errorMessage = '';
  lockoutMessage = '';

  onLogin(credentials: LoginCredentials): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.lockoutMessage = '';

    this.authService.login({
      email: credentials.email,
      password: credentials.password,
      rememberMe: credentials.rememberMe
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.router.navigate(['/courses']);
        } else {
          if (response.error?.includes('locked')) {
            this.lockoutMessage = response.error;
          } else {
            this.errorMessage = response.error || 'Login failed';
          }
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred. Please try again.';
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
