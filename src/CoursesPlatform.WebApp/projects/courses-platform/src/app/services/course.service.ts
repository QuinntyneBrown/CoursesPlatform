import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { API_BASE_URL } from './api.config';

export type CourseStatus = 'Draft' | 'PendingReview' | 'Published' | 'Unpublished' | 'Rejected' | 'Archived';
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'AllLevels';

export interface LearningObjective {
  learningObjectiveId: string;
  description: string;
  sortOrder: number;
}

export interface Course {
  courseId: string;
  title: string;
  subtitle?: string;
  description?: string;
  thumbnailUrl?: string;
  status: CourseStatus;
  level: CourseLevel;
  language?: string;
  categoryId?: string;
  categoryName?: string;
  instructorId: string;
  instructorName?: string;
  createdAt: string;
  updatedAt?: string;
  publishedAt?: string;
  learningObjectives: LearningObjective[];
}

export interface CreateCourseRequest {
  title: string;
  subtitle?: string;
  description?: string;
  level: number;
  language?: string;
  categoryId?: string;
}

export interface UpdateCourseRequest {
  title: string;
  subtitle?: string;
  description?: string;
  level: number;
  language?: string;
  categoryId?: string;
}

export interface CoursesResponse {
  courses: Course[];
  totalCount: number;
  page: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_BASE_URL);

  private coursesSubject = new BehaviorSubject<Course[]>([]);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  courses$ = this.coursesSubject.asObservable();
  isLoading$ = this.isLoadingSubject.asObservable();

  getCourses(params?: {
    instructorId?: string;
    status?: number;
    categoryId?: string;
    page?: number;
    pageSize?: number;
  }): Observable<CoursesResponse> {
    let httpParams = new HttpParams();
    if (params?.instructorId) httpParams = httpParams.set('instructorId', params.instructorId);
    if (params?.status !== undefined) httpParams = httpParams.set('status', params.status.toString());
    if (params?.categoryId) httpParams = httpParams.set('categoryId', params.categoryId);
    if (params?.page) httpParams = httpParams.set('page', params.page.toString());
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());

    this.isLoadingSubject.next(true);
    return this.http.get<CoursesResponse>(`${this.baseUrl}/api/courses`, { params: httpParams }).pipe(
      tap(response => {
        this.coursesSubject.next(response.courses);
        this.isLoadingSubject.next(false);
      })
    );
  }

  getCourse(courseId: string): Observable<{ course: Course }> {
    return this.http.get<{ course: Course }>(`${this.baseUrl}/api/courses/${courseId}`);
  }

  createCourse(request: CreateCourseRequest): Observable<{ courseId: string; course: Course }> {
    return this.http.post<{ courseId: string; course: Course }>(`${this.baseUrl}/api/courses`, request);
  }

  updateCourse(courseId: string, request: UpdateCourseRequest): Observable<{ success: boolean; course?: Course; error?: string }> {
    return this.http.put<{ success: boolean; course?: Course; error?: string }>(`${this.baseUrl}/api/courses/${courseId}`, request);
  }

  deleteCourse(courseId: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.baseUrl}/api/courses/${courseId}`);
  }

  publishCourse(courseId: string): Observable<{ success: boolean; course?: Course; error?: string }> {
    return this.http.post<{ success: boolean; course?: Course; error?: string }>(`${this.baseUrl}/api/courses/${courseId}/publish`, {});
  }

  unpublishCourse(courseId: string): Observable<{ success: boolean; course?: Course; error?: string }> {
    return this.http.post<{ success: boolean; course?: Course; error?: string }>(`${this.baseUrl}/api/courses/${courseId}/unpublish`, {});
  }

  uploadThumbnail(courseId: string, file: File): Observable<{ success: boolean; thumbnailUrl?: string; error?: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ success: boolean; thumbnailUrl?: string; error?: string }>(`${this.baseUrl}/api/courses/${courseId}/thumbnail`, formData);
  }

  addObjective(courseId: string, description: string): Observable<{ success: boolean; objective?: LearningObjective; error?: string }> {
    return this.http.post<{ success: boolean; objective?: LearningObjective; error?: string }>(`${this.baseUrl}/api/courses/${courseId}/objectives`, { description });
  }

  updateObjective(courseId: string, objectiveId: string, description: string): Observable<{ success: boolean; objective?: LearningObjective; error?: string }> {
    return this.http.put<{ success: boolean; objective?: LearningObjective; error?: string }>(`${this.baseUrl}/api/courses/${courseId}/objectives/${objectiveId}`, { description });
  }

  deleteObjective(courseId: string, objectiveId: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.baseUrl}/api/courses/${courseId}/objectives/${objectiveId}`);
  }

  reorderObjectives(courseId: string, objectiveIds: string[]): Observable<{ success: boolean; objectives?: LearningObjective[]; error?: string }> {
    return this.http.put<{ success: boolean; objectives?: LearningObjective[]; error?: string }>(`${this.baseUrl}/api/courses/${courseId}/objectives/reorder`, { objectiveIds });
  }
}
