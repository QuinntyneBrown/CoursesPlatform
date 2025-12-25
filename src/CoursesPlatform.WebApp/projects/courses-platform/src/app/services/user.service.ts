import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.config';
import { User } from './auth.service';

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  biography?: string;
  headline?: string;
}

export interface Session {
  sessionId: string;
  deviceType?: string;
  browser?: string;
  operatingSystem?: string;
  location?: string;
  createdAt: string;
  lastActivityAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_BASE_URL);

  getProfile(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(`${this.baseUrl}/api/users/me`);
  }

  updateProfile(request: UpdateProfileRequest): Observable<{ success: boolean; user?: User; error?: string }> {
    return this.http.put<{ success: boolean; user?: User; error?: string }>(`${this.baseUrl}/api/users/me`, request);
  }

  uploadAvatar(file: File): Observable<{ success: boolean; avatarUrl?: string; error?: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ success: boolean; avatarUrl?: string; error?: string }>(`${this.baseUrl}/api/users/me/avatar`, formData);
  }

  deleteAvatar(): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.baseUrl}/api/users/me/avatar`);
  }

  getSessions(): Observable<{ sessions: Session[] }> {
    return this.http.get<{ sessions: Session[] }>(`${this.baseUrl}/api/users/me/sessions`);
  }

  terminateSession(sessionId: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.baseUrl}/api/users/me/sessions/${sessionId}`);
  }

  terminateAllSessions(): Observable<{ success: boolean; terminatedCount: number; message: string }> {
    return this.http.delete<{ success: boolean; terminatedCount: number; message: string }>(`${this.baseUrl}/api/users/me/sessions`);
  }
}
