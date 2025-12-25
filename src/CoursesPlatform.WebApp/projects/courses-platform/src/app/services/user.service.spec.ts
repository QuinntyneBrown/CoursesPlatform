import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
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
    it('should get user profile', fakeAsync(() => {
      let response: any;
      service.getProfile().subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/users/me`);
      expect(req.request.method).toBe('GET');
      req.flush({ user: mockUser });

      tick();

      expect(response.user.userId).toBe('123');
      expect(response.user.email).toBe('test@example.com');
    }));
  });

  describe('updateProfile', () => {
    it('should update user profile', fakeAsync(() => {
      const updateRequest: UpdateProfileRequest = {
        firstName: 'Jane',
        lastName: 'Smith',
        biography: 'Updated bio',
        headline: 'Senior Developer'
      };

      let response: any;
      service.updateProfile(updateRequest).subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/users/me`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updateRequest);
      req.flush({ success: true, user: { ...mockUser, ...updateRequest } });

      tick();

      expect(response.success).toBe(true);
      expect(response.user.firstName).toBe('Jane');
    }));
  });

  describe('uploadAvatar', () => {
    it('should upload avatar', fakeAsync(() => {
      const file = new File([''], 'avatar.png', { type: 'image/png' });

      let response: any;
      service.uploadAvatar(file).subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/users/me/avatar`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body instanceof FormData).toBe(true);
      req.flush({ success: true, avatarUrl: 'http://example.com/avatar.png' });

      tick();

      expect(response.success).toBe(true);
      expect(response.avatarUrl).toBe('http://example.com/avatar.png');
    }));
  });

  describe('deleteAvatar', () => {
    it('should delete avatar', fakeAsync(() => {
      let response: any;
      service.deleteAvatar().subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/users/me/avatar`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, message: 'Avatar deleted' });

      tick();

      expect(response.success).toBe(true);
    }));
  });

  describe('sessions', () => {
    it('should get sessions', fakeAsync(() => {
      const mockSessions = [
        { sessionId: '1', deviceType: 'desktop', createdAt: new Date().toISOString() },
        { sessionId: '2', deviceType: 'mobile', createdAt: new Date().toISOString() }
      ];

      let response: any;
      service.getSessions().subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/users/me/sessions`);
      expect(req.request.method).toBe('GET');
      req.flush({ sessions: mockSessions });

      tick();

      expect(response.sessions.length).toBe(2);
    }));

    it('should terminate session', fakeAsync(() => {
      let response: any;
      service.terminateSession('session-1').subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/users/me/sessions/session-1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, message: 'Session terminated' });

      tick();

      expect(response.success).toBe(true);
    }));

    it('should terminate all sessions', fakeAsync(() => {
      let response: any;
      service.terminateAllSessions().subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/users/me/sessions`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, terminatedCount: 5, message: 'All sessions terminated' });

      tick();

      expect(response.success).toBe(true);
      expect(response.terminatedCount).toBe(5);
    }));
  });
});
