import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CourseWizard, CourseWizardData } from 'courses-platform-components';
import { CourseService, CategoryService, Category } from '../../services';
import { map, startWith, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface CourseCreateViewModel {
  categories: Category[];
  isLoading: boolean;
}

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

  viewModel$ = this.categoryService.getCategories().pipe(
    map(response => ({
      categories: response.categories,
      isLoading: false
    } as CourseCreateViewModel)),
    startWith<CourseCreateViewModel>({ categories: [], isLoading: true }),
    catchError(() => of<CourseCreateViewModel>({ categories: [], isLoading: false }))
  );

  onComplete(data: CourseWizardData): void {
    const request = {
      title: data.basicInfo.title,
      subtitle: data.basicInfo.subtitle || '',
      description: data.basicInfo.description,
      level: this.convertLevelToNumber(data.level || 'all_levels'),
      language: data.language || '',
      categoryId: data.category?.categoryId || ''
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

  onSaveDraft(data: Partial<CourseWizardData>): void {
    this.snackBar.open('Draft saved!', 'Close', { duration: 2000 });
  }

  private convertLevelToNumber(level: string): number {
    const levelMap: Record<string, number> = {
      'beginner': 1,
      'intermediate': 2,
      'advanced': 3,
      'all_levels': 0
    };
    return levelMap[level] || 0;
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }
}
