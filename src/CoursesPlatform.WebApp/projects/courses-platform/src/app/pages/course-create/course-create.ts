import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CourseWizard } from 'courses-platform-components';
import { CourseService, CategoryService, Category } from '../../services';

@Component({
  selector: 'app-course-create',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, CourseWizard],
  templateUrl: './course-create.html',
  styleUrl: './course-create.scss'
})
export class CourseCreate {
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private courseService = inject(CourseService);
  private categoryService = inject(CategoryService);

  categories: Category[] = [];

  constructor() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.categories;
      }
    });
  }

  onComplete(data: Record<string, unknown>): void {
    const request = {
      title: data['title'] as string,
      subtitle: data['subtitle'] as string,
      description: data['description'] as string,
      level: data['level'] as number || 3,
      language: data['language'] as string,
      categoryId: data['categoryId'] as string
    };

    this.courseService.createCourse(request).subscribe({
      next: (response) => {
        this.snackBar.open('Course created successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/courses', response.courseId, 'edit']);
      },
      error: () => {
        this.snackBar.open('Failed to create course', 'Close', { duration: 3000 });
      }
    });
  }

  onSaveDraft(data: Record<string, unknown>): void {
    this.onComplete(data);
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }
}
