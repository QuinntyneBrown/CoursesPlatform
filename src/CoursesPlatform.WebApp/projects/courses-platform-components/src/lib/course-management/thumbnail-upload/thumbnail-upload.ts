import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface ThumbnailUploadEvent {
  file: File;
  preview: string;
}

@Component({
  selector: 'lib-thumbnail-upload',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './thumbnail-upload.html',
  styleUrl: './thumbnail-upload.scss',
})
export class ThumbnailUpload {
  @Input() currentThumbnail = '';
  @Input() aspectRatio = 16 / 9;
  @Input() isLoading = false;
  @Input() maxFileSize = 10 * 1024 * 1024; // 10MB
  @Input() acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  @Output() thumbnailChange = new EventEmitter<ThumbnailUploadEvent>();
  @Output() thumbnailRemove = new EventEmitter<void>();

  previewUrl = '';
  errorMessage = '';
  isDragOver = false;

  get displayUrl(): string {
    return this.previewUrl || this.currentThumbnail;
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
      this.errorMessage = 'Please upload a valid image file (JPEG, PNG, or WebP)';
      return;
    }

    if (file.size > this.maxFileSize) {
      this.errorMessage = `File size must be less than ${this.maxFileSize / 1024 / 1024}MB`;
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      this.validateImageDimensions(preview, file);
    };
    reader.readAsDataURL(file);
  }

  private validateImageDimensions(preview: string, file: File): void {
    const img = new Image();
    img.onload = () => {
      const ratio = img.width / img.height;
      const expectedRatio = this.aspectRatio;
      const tolerance = 0.1;

      if (Math.abs(ratio - expectedRatio) > tolerance) {
        this.errorMessage = `Image should have approximately ${this.aspectRatio.toFixed(1)}:1 aspect ratio`;
        return;
      }

      if (img.width < 1280 || img.height < 720) {
        this.errorMessage = 'Image should be at least 1280x720 pixels';
        return;
      }

      this.previewUrl = preview;
      this.thumbnailChange.emit({ file, preview });
    };
    img.src = preview;
  }

  onRemove(): void {
    this.previewUrl = '';
    this.thumbnailRemove.emit();
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }
}
