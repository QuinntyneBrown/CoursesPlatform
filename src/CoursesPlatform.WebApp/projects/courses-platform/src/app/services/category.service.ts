import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { API_BASE_URL } from './api.config';

export interface Category {
  categoryId: string;
  name: string;
  description?: string;
  subcategories: Category[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_BASE_URL);

  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  getCategories(): Observable<{ categories: Category[] }> {
    return this.http.get<{ categories: Category[] }>(`${this.baseUrl}/api/categories`).pipe(
      tap(response => this.categoriesSubject.next(response.categories))
    );
  }
}
