import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

@Component({
  selector: 'lib-password-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInput),
      multi: true,
    },
  ],
})
export class PasswordInput implements ControlValueAccessor {
  @Input() label = 'Password';
  @Input() placeholder = 'Enter password';
  @Input() showStrengthIndicator = true;
  @Input() hint = '';
  @Input() errorMessage = '';

  passwordControl = new FormControl('');
  hidePassword = true;
  strength: PasswordStrength = { score: 0, label: '', color: 'warn' };

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.passwordControl.setValue(value || '', { emitEvent: false });
    this.calculateStrength(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.passwordControl.disable();
    } else {
      this.passwordControl.enable();
    }
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
    this.calculateStrength(value);
  }

  onBlur(): void {
    this.onTouched();
  }

  toggleVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  calculateStrength(password: string): void {
    if (!password) {
      this.strength = { score: 0, label: '', color: 'warn' };
      return;
    }

    let score = 0;

    // Length check
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 10;

    // Uppercase check
    if (/[A-Z]/.test(password)) score += 20;

    // Lowercase check
    if (/[a-z]/.test(password)) score += 20;

    // Number check
    if (/[0-9]/.test(password)) score += 15;

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) score += 10;

    let label: string;
    let color: string;

    if (score < 30) {
      label = 'Weak';
      color = 'warn';
    } else if (score < 60) {
      label = 'Fair';
      color = 'accent';
    } else if (score < 80) {
      label = 'Good';
      color = 'primary';
    } else {
      label = 'Strong';
      color = 'primary';
    }

    this.strength = { score, label, color };
  }
}
