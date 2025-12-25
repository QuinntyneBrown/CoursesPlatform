import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface AvatarUploadEvent {
  file: File;
  preview: string;
}

@Component({
  selector: 'lib-avatar-upload',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './avatar-upload.html',
  styleUrl: './avatar-upload.scss',
})
export class AvatarUpload {
  @Input() currentAvatar = '';
  @Input() size = 120;
  @Input() isLoading = false;
  @Input() maxFileSize = 5 * 1024 * 1024; // 5MB
  @Input() acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'];

  @Output() avatarChange = new EventEmitter<AvatarUploadEvent>();
  @Output() avatarRemove = new EventEmitter<void>();

  previewUrl = '';
  errorMessage = '';
  isDragOver = false;

  get displayUrl(): string {
    return this.previewUrl || this.currentAvatar;
  }

  get initials(): string {
    return '';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.processFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  private processFile(file: File): void {
    this.errorMessage = '';

    if (!this.acceptedTypes.includes(file.type)) {
      this.errorMessage = 'Please upload a valid image file (JPEG, PNG, or GIF)';
      return;
    }

    if (file.size > this.maxFileSize) {
      this.errorMessage = `File size must be less than ${this.maxFileSize / 1024 / 1024}MB`;
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrl = e.target?.result as string;
      this.avatarChange.emit({ file, preview: this.previewUrl });
    };
    reader.readAsDataURL(file);
  }

  onRemove(): void {
    this.previewUrl = '';
    this.avatarRemove.emit();
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }
}
