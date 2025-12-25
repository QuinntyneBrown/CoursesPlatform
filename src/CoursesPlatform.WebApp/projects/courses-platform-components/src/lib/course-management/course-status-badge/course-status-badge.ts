import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

export type CourseStatus = 'draft' | 'pending_review' | 'published' | 'unpublished' | 'rejected';

export interface CourseStatusConfig {
  label: string;
  color: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'lib-course-status-badge',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatTooltipModule, MatIconModule],
  templateUrl: './course-status-badge.html',
  styleUrl: './course-status-badge.scss',
})
export class CourseStatusBadge {
  @Input() status: CourseStatus = 'draft';
  @Input() showIcon = true;
  @Input() showTooltip = true;

  private statusConfigs: Record<CourseStatus, CourseStatusConfig> = {
    draft: {
      label: 'Draft',
      color: 'default',
      icon: 'edit_note',
      description: 'Course is being edited and is not visible to students',
    },
    pending_review: {
      label: 'Pending Review',
      color: 'accent',
      icon: 'pending',
      description: 'Course is submitted for review by platform administrators',
    },
    published: {
      label: 'Published',
      color: 'primary',
      icon: 'check_circle',
      description: 'Course is live and visible to students',
    },
    unpublished: {
      label: 'Unpublished',
      color: 'warn',
      icon: 'visibility_off',
      description: 'Course has been taken offline and is not visible to students',
    },
    rejected: {
      label: 'Rejected',
      color: 'warn',
      icon: 'cancel',
      description: 'Course did not meet platform guidelines and needs revision',
    },
  };

  get config(): CourseStatusConfig {
    return this.statusConfigs[this.status] || this.statusConfigs.draft;
  }
}
