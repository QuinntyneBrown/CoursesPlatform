import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AvatarUpload, AvatarUploadEvent } from 'courses-platform-components';
import { AuthService, UserService } from '../../services';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    AvatarUpload
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(100)]],
    lastName: ['', [Validators.required, Validators.maxLength(100)]],
    biography: ['', Validators.maxLength(2000)],
    headline: ['', Validators.maxLength(200)]
  });

  avatarUrl: string | null = null;
  isLoading = false;

  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (user) {
      this.form.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        biography: user.biography || '',
        headline: user.headline || ''
      });
      this.avatarUrl = user.avatarUrl || null;
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.userService.updateProfile(this.form.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 });
        } else {
          this.snackBar.open(response.error || 'Failed to update profile', 'Close', { duration: 3000 });
        }
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('An error occurred', 'Close', { duration: 3000 });
      }
    });
  }

  onAvatarChange(event: AvatarUploadEvent): void {
    this.userService.uploadAvatar(event.file).subscribe({
      next: (response) => {
        if (response.success && response.avatarUrl) {
          this.avatarUrl = response.avatarUrl;
          this.snackBar.open('Avatar uploaded successfully', 'Close', { duration: 3000 });
        }
      },
      error: () => {
        this.snackBar.open('Failed to upload avatar', 'Close', { duration: 3000 });
      }
    });
  }

  onAvatarRemoved(): void {
    this.userService.deleteAvatar().subscribe({
      next: () => {
        this.avatarUrl = null;
        this.snackBar.open('Avatar removed', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to remove avatar', 'Close', { duration: 3000 });
      }
    });
  }
}
