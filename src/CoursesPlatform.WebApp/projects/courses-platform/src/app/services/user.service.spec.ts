import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { UserService, UpdateProfileRequest } from './user.service';
import { API_BASE_URL } from './api.config';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:5000';

  const mockUser = {
    userId: '123',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    biography: 'Test bio',
    headline: 'Developer'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: baseUrl }
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProfile', () => {
    it('should get user profile', async () => {
      const responsePromise = firstValueFrom(service.getProfile());

      const req = httpMock.expectOne(`${baseUrl}/api/users/me`);
      expect(req.request.method).toBe('GET');
      req.flush({ user: mockUser });

      const response = await responsePromise;

      expect(response.user.userId).toBe('123');
      expect(response.user.email).toBe('test@example.com');
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', async () => {
      const updateRequest: UpdateProfileRequest = {
        firstName: 'Jane',
        lastName: 'Smith',
        biography: 'Updated bio',
        headline: 'Senior Developer'
      };

      const responsePromise = firstValueFrom(service.updateProfile(updateRequest));

      const req = httpMock.expectOne(`${baseUrl}/api/users/me`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updateRequest);
      req.flush({ success: true, user: { ...mockUser, ...updateRequest } });

      const response = await responsePromise;

      expect(response.success).toBe(true);
      expect(response.user?.firstName).toBe('Jane');
    });
  });

  describe('uploadAvatar', () => {
    it('should upload avatar', async () => {
      const file = new File([''], 'avatar.png', { type: 'image/png' });

      const responsePromise = firstValueFrom(service.uploadAvatar(file));

      const req = httpMock.expectOne(`${baseUrl}/api/users/me/avatar`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body instanceof FormData).toBe(true);
      req.flush({ success: true, avatarUrl: 'http://example.com/avatar.png' });

      const response = await responsePromise;

      expect(response.success).toBe(true);
      expect(response.avatarUrl).toBe('http://example.com/avatar.png');
    });
  });

  describe('deleteAvatar', () => {
    it('should delete avatar', async () => {
      const responsePromise = firstValueFrom(service.deleteAvatar());

      const req = httpMock.expectOne(`${baseUrl}/api/users/me/avatar`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, message: 'Avatar deleted' });

      const response = await responsePromise;

      expect(response.success).toBe(true);
    });
  });

  describe('sessions', () => {
    it('should get sessions', async () => {
      const mockSessions = [
        { sessionId: '1', deviceType: 'desktop', createdAt: new Date().toISOString() },
        { sessionId: '2', deviceType: 'mobile', createdAt: new Date().toISOString() }
      ];

      const responsePromise = firstValueFrom(service.getSessions());

      const req = httpMock.expectOne(`${baseUrl}/api/users/me/sessions`);
      expect(req.request.method).toBe('GET');
      req.flush({ sessions: mockSessions });

      const response = await responsePromise;

      expect(response.sessions.length).toBe(2);
    });

    it('should terminate session', async () => {
      const responsePromise = firstValueFrom(service.terminateSession('session-1'));

      const req = httpMock.expectOne(`${baseUrl}/api/users/me/sessions/session-1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, message: 'Session terminated' });

      const response = await responsePromise;

      expect(response.success).toBe(true);
    });

    it('should terminate all sessions', async () => {
      const responsePromise = firstValueFrom(service.terminateAllSessions());

      const req = httpMock.expectOne(`${baseUrl}/api/users/me/sessions`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, terminatedCount: 5, message: 'All sessions terminated' });

      const response = await responsePromise;

      expect(response.success).toBe(true);
      expect(response.terminatedCount).toBe(5);
    });
  });
});
