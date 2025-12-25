import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { API_BASE_URL } from './api.config';

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  biography?: string;
  headline?: string;
  avatarUrl?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
  deviceType?: string;
  browser?: string;
  operatingSystem?: string;
}

export interface LoginResponse {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  user?: User;
  error?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  userId: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_BASE_URL);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor() {
    this.loadStoredAuth();
  }

  private loadStoredAuth(): void {
    const token = this.getAccessToken();
    const userJson = localStorage.getItem('user');
    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch {
        this.clearAuth();
      }
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    this.isLoadingSubject.next(true);
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/auth/login`, request).pipe(
      tap(response => {
        this.isLoadingSubject.next(false);
        if (response.success && response.accessToken && response.user) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken || '');
          localStorage.setItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);
        }
      }),
      catchError(error => {
        this.isLoadingSubject.next(false);
        return of({ success: false, error: error.error?.error || 'Login failed' });
      })
    );
  }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    this.isLoadingSubject.next(true);
    return this.http.post<RegisterResponse>(`${this.baseUrl}/api/auth/register`, request).pipe(
      tap(() => this.isLoadingSubject.next(false)),
      catchError(error => {
        this.isLoadingSubject.next(false);
        throw error;
      })
    );
  }

  logout(): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.baseUrl}/api/auth/logout`, {}).pipe(
      tap(() => this.clearAuth()),
      catchError(() => {
        this.clearAuth();
        return of({ success: true });
      })
    );
  }

  forgotPassword(email: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/api/auth/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/api/auth/reset-password`, { token, newPassword });
  }

  verifyEmail(token: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/api/auth/verify-email`, { token });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(`${this.baseUrl}/api/auth/change-password`, { currentPassword, newPassword });
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/auth/refresh`, { refreshToken }).pipe(
      tap(response => {
        if (response.success && response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken || '');
        }
      })
    );
  }

  private clearAuth(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
