import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import type { CourseStatus } from '../course-status-badge/course-status-badge';

export interface CourseActionEvent {
  action: string;
  courseId: string;
}

@Component({
  selector: 'lib-course-actions-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './course-actions-menu.html',
  styleUrl: './course-actions-menu.scss',
})
export class CourseActionsMenu {
  @Input() courseId!: string;
  @Input() status: CourseStatus = 'draft';

  @Output() actionSelected = new EventEmitter<CourseActionEvent>();

  get canPublish(): boolean {
    return this.status === 'draft' || this.status === 'unpublished';
  }

  get canUnpublish(): boolean {
    return this.status === 'published';
  }

  get canSubmitForReview(): boolean {
    return this.status === 'draft' || this.status === 'rejected';
  }

  onAction(action: string): void {
    this.actionSelected.emit({ action, courseId: this.courseId });
  }
}
