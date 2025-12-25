import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterForm, RegistrationData } from 'courses-platform-components';
import { AuthService } from '../../services';

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

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  onRegister(data: RegistrationData): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(data).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = response.message;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.error || 'Registration failed. Please try again.';
      }
    });
  }

  onLogin(): void {
    this.router.navigate(['/login']);
  }
}
