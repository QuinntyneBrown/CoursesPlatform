import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CourseCard, CourseStatusBadge, CourseActionsMenu } from 'courses-platform-components';
import { AuthService, CourseService, Course } from '../../services';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CourseCard,
    CourseStatusBadge,
    CourseActionsMenu
  ],
  templateUrl: './courses-list.html',
  styleUrl: './courses-list.scss'
})
export class CoursesList implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private courseService = inject(CourseService);

  courses: Course[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    const user = this.authService.currentUser;
    if (!user) return;

    this.isLoading = true;
    this.courseService.getCourses({ instructorId: user.userId }).subscribe({
      next: (response) => {
        this.courses = response.courses;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onCreateCourse(): void {
    this.router.navigate(['/courses/new']);
  }

  onEditCourse(course: Course): void {
    this.router.navigate(['/courses', course.courseId, 'edit']);
  }

  onPublishCourse(course: Course): void {
    this.courseService.publishCourse(course.courseId).subscribe({
      next: () => this.loadCourses()
    });
  }

  onUnpublishCourse(course: Course): void {
    this.courseService.unpublishCourse(course.courseId).subscribe({
      next: () => this.loadCourses()
    });
  }

  onDeleteCourse(course: Course): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(course.courseId).subscribe({
        next: () => this.loadCourses()
      });
    }
  }

  getStatusNumber(status: string): number {
    const statusMap: Record<string, number> = {
      'Draft': 0,
      'PendingReview': 1,
      'Published': 2,
      'Unpublished': 3,
      'Rejected': 4,
      'Archived': 5
    };
    return statusMap[status] ?? 0;
  }
}
