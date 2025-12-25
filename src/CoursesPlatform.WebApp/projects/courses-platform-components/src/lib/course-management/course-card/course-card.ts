import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CourseStatusBadge, CourseStatus } from '../course-status-badge/course-status-badge';

export interface CourseCardData {
  courseId: string;
  title: string;
  subtitle?: string;
  thumbnailUrl?: string;
  status: CourseStatus;
  enrollmentCount: number;
  rating?: number;
  lastUpdated: Date;
}

@Component({
  selector: 'lib-course-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CourseStatusBadge,
  ],
  templateUrl: './course-card.html',
  styleUrl: './course-card.scss',
})
export class CourseCard {
  @Input() course!: CourseCardData;
  @Input() showActions = true;

  @Output() edit = new EventEmitter<string>();
  @Output() preview = new EventEmitter<string>();
  @Output() publish = new EventEmitter<string>();
  @Output() unpublish = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  get defaultThumbnail(): string {
    return 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180">
        <rect fill="#e0e0e0" width="320" height="180"/>
        <text x="50%" y="50%" fill="#9e9e9e" font-family="sans-serif" font-size="14" text-anchor="middle" dy=".3em">
          No Thumbnail
        </text>
      </svg>
    `);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  onEdit(): void {
    this.edit.emit(this.course.courseId);
  }

  onPreview(): void {
    this.preview.emit(this.course.courseId);
  }

  onPublish(): void {
    this.publish.emit(this.course.courseId);
  }

  onUnpublish(): void {
    this.unpublish.emit(this.course.courseId);
  }

  onDelete(): void {
    this.delete.emit(this.course.courseId);
  }
}
