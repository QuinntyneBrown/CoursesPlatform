import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { AuthService, LoginRequest, RegisterRequest } from './auth.service';
import { API_BASE_URL } from './api.config';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:5000';

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: baseUrl }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should login successfully and store tokens', async () => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'Password123!',
        rememberMe: false
      };

      const mockResponse = {
        success: true,
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        user: {
          userId: '123',
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe'
        }
      };

      const responsePromise = firstValueFrom(service.login(loginRequest));

      const req = httpMock.expectOne(`${baseUrl}/api/auth/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(loginRequest);
      req.flush(mockResponse);

      const response = await responsePromise;

      expect(response.success).toBe(true);
      expect(localStorage.getItem('accessToken')).toBe('mock-access-token');
      expect(localStorage.getItem('refreshToken')).toBe('mock-refresh-token');
      expect(service.isAuthenticated).toBe(true);
      expect(service.currentUser?.email).toBe('test@example.com');
    });

    it('should return error on failed login', async () => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'wrong',
        rememberMe: false
      };

      const responsePromise = firstValueFrom(service.login(loginRequest));

      const req = httpMock.expectOne(`${baseUrl}/api/auth/login`);
      req.error(new ErrorEvent('error'), { status: 401 });

      const response = await responsePromise;

      expect(response.success).toBe(false);
      expect(service.isAuthenticated).toBe(false);
    });
  });

  describe('register', () => {
    it('should register successfully', async () => {
      const registerRequest: RegisterRequest = {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'John',
        lastName: 'Doe'
      };

      const mockResponse = {
        userId: '123',
        message: 'Registration successful'
      };

      const responsePromise = firstValueFrom(service.register(registerRequest));

      const req = httpMock.expectOne(`${baseUrl}/api/auth/register`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);

      const response = await responsePromise;

      expect(response.userId).toBe('123');
      expect(response.message).toBe('Registration successful');
    });
  });

  describe('logout', () => {
    it('should clear auth state on logout', async () => {
      localStorage.setItem('accessToken', 'token');
      localStorage.setItem('refreshToken', 'refresh');
      localStorage.setItem('user', JSON.stringify({ userId: '123' }));

      const responsePromise = firstValueFrom(service.logout());

      const req = httpMock.expectOne(`${baseUrl}/api/auth/logout`);
      req.flush({ success: true });

      await responsePromise;

      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
      expect(service.isAuthenticated).toBe(false);
    });
  });

  describe('forgotPassword', () => {
    it('should send forgot password request', async () => {
      const email = 'test@example.com';

      const responsePromise = firstValueFrom(service.forgotPassword(email));

      const req = httpMock.expectOne(`${baseUrl}/api/auth/forgot-password`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email });
      req.flush({ success: true, message: 'Email sent' });

      const response = await responsePromise;

      expect(response.success).toBe(true);
    });
  });

  describe('getAccessToken', () => {
    it('should return stored access token', () => {
      localStorage.setItem('accessToken', 'test-token');
      expect(service.getAccessToken()).toBe('test-token');
    });

    it('should return null when no token stored', () => {
      expect(service.getAccessToken()).toBeNull();
    });
  });
});
