import { Page, Route } from '@playwright/test';

// API Base URL
const API_BASE_URL = 'http://localhost:5081';

// Mock Data Types
export interface MockUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  biography?: string;
  headline?: string;
  avatarUrl?: string;
}

export interface MockCourse {
  courseId: string;
  title: string;
  subtitle?: string;
  description: string;
  status: 'Draft' | 'PendingReview' | 'Published' | 'Unpublished' | 'Rejected' | 'Archived';
  level: number;
  language: string;
  categoryId?: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MockCategory {
  categoryId: string;
  name: string;
  description?: string;
  subcategories?: MockCategory[];
}

// Default Mock Data
export const mockUsers: MockUser[] = [
  {
    userId: 'user-1',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    biography: 'Software developer with 10 years of experience',
    headline: 'Senior Software Engineer',
    avatarUrl: '',
  },
  {
    userId: 'user-2',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    biography: 'Web development instructor',
    headline: 'Lead Instructor',
    avatarUrl: '',
  },
];

export const mockCourses: MockCourse[] = [
  {
    courseId: 'course-1',
    title: 'Introduction to TypeScript',
    subtitle: 'Learn TypeScript from scratch',
    description: 'A comprehensive course on TypeScript fundamentals',
    status: 'Published',
    level: 1,
    language: 'English',
    categoryId: 'cat-1',
    thumbnailUrl: '',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    courseId: 'course-2',
    title: 'Advanced Angular Development',
    subtitle: 'Master Angular framework',
    description: 'Deep dive into Angular features and best practices',
    status: 'Draft',
    level: 2,
    language: 'English',
    categoryId: 'cat-1',
    thumbnailUrl: '',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-10T00:00:00Z',
  },
  {
    courseId: 'course-3',
    title: 'React Fundamentals',
    subtitle: 'Build modern web apps with React',
    description: 'Learn React.js from the ground up',
    status: 'Unpublished',
    level: 1,
    language: 'English',
    categoryId: 'cat-2',
    thumbnailUrl: '',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-05T00:00:00Z',
  },
];

export const mockCategories: MockCategory[] = [
  {
    categoryId: 'cat-1',
    name: 'Web Development',
    description: 'Learn web development technologies',
    subcategories: [
      { categoryId: 'cat-1-1', name: 'Frontend Development' },
      { categoryId: 'cat-1-2', name: 'Backend Development' },
    ],
  },
  {
    categoryId: 'cat-2',
    name: 'Mobile Development',
    description: 'Build mobile applications',
    subcategories: [
      { categoryId: 'cat-2-1', name: 'iOS Development' },
      { categoryId: 'cat-2-2', name: 'Android Development' },
    ],
  },
  {
    categoryId: 'cat-3',
    name: 'Data Science',
    description: 'Learn data science and machine learning',
  },
];

// Token generation helper
export function generateMockToken(): string {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTEiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJleHAiOjk5OTk5OTk5OTl9.mock';
}

// Setup authentication in localStorage
export async function setupAuthenticatedSession(page: Page, user: MockUser = mockUsers[0]) {
  await page.addInitScript((data) => {
    localStorage.setItem('accessToken', data.token);
    localStorage.setItem('refreshToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }, { token: generateMockToken(), user });
}

// Clear authentication
export async function clearAuthentication(page: Page) {
  await page.addInitScript(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  });
}

// Mock API Response Helper
export interface MockApiResponse {
  status?: number;
  body: unknown;
  headers?: Record<string, string>;
}

async function handleRoute(route: Route, response: MockApiResponse) {
  await route.fulfill({
    status: response.status || 200,
    contentType: 'application/json',
    headers: response.headers || {},
    body: JSON.stringify(response.body),
  });
}

// Auth API Mocks
export async function mockLoginSuccess(page: Page, user: MockUser = mockUsers[0]) {
  await page.route(`${API_BASE_URL}/api/auth/login`, async (route) => {
    await handleRoute(route, {
      body: {
        success: true,
        accessToken: generateMockToken(),
        refreshToken: generateMockToken(),
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
        user,
      },
    });
  });
}

export async function mockLoginFailure(page: Page, errorMessage = 'Invalid credentials') {
  await page.route(`${API_BASE_URL}/api/auth/login`, async (route) => {
    await handleRoute(route, {
      body: { success: false, error: errorMessage },
    });
  });
}

export async function mockLoginLockout(page: Page, lockoutMessage: string) {
  await page.route(`${API_BASE_URL}/api/auth/login`, async (route) => {
    await handleRoute(route, {
      body: { success: false, error: lockoutMessage },
    });
  });
}

export async function mockRegisterSuccess(page: Page) {
  await page.route(`${API_BASE_URL}/api/auth/register`, async (route) => {
    await handleRoute(route, {
      body: {
        userId: 'new-user-id',
        message: 'Registration successful! Please check your email to verify your account.',
      },
    });
  });
}

export async function mockRegisterFailure(page: Page, errorMessage = 'Email already exists') {
  await page.route(`${API_BASE_URL}/api/auth/register`, async (route) => {
    await handleRoute(route, {
      status: 400,
      body: { error: errorMessage },
    });
  });
}

export async function mockForgotPasswordSuccess(page: Page) {
  await page.route(`${API_BASE_URL}/api/auth/forgot-password`, async (route) => {
    await handleRoute(route, {
      body: {
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.',
      },
    });
  });
}

export async function mockForgotPasswordFailure(page: Page) {
  await page.route(`${API_BASE_URL}/api/auth/forgot-password`, async (route) => {
    await handleRoute(route, {
      status: 500,
      body: { error: 'An error occurred' },
    });
  });
}

export async function mockLogout(page: Page) {
  await page.route(`${API_BASE_URL}/api/auth/logout`, async (route) => {
    await handleRoute(route, {
      body: { success: true },
    });
  });
}

// Courses API Mocks
export async function mockGetCourses(page: Page, courses: MockCourse[] = mockCourses) {
  await page.route(`${API_BASE_URL}/api/courses*`, async (route) => {
    if (route.request().method() === 'GET') {
      await handleRoute(route, {
        body: { courses, total: courses.length },
      });
    } else {
      await route.continue();
    }
  });
}

export async function mockGetCoursesEmpty(page: Page) {
  await page.route(`${API_BASE_URL}/api/courses*`, async (route) => {
    if (route.request().method() === 'GET') {
      await handleRoute(route, {
        body: { courses: [], total: 0 },
      });
    } else {
      await route.continue();
    }
  });
}

export async function mockGetCourse(page: Page, course: MockCourse) {
  await page.route(`${API_BASE_URL}/api/courses/${course.courseId}`, async (route) => {
    if (route.request().method() === 'GET') {
      await handleRoute(route, { body: course });
    } else {
      await route.continue();
    }
  });
}

export async function mockCreateCourse(page: Page, courseId = 'new-course-id') {
  await page.route(`${API_BASE_URL}/api/courses`, async (route) => {
    if (route.request().method() === 'POST') {
      const body = route.request().postDataJSON();
      await handleRoute(route, {
        body: {
          courseId,
          ...body,
          status: 'Draft',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    } else {
      await route.continue();
    }
  });
}

export async function mockCreateCourseFailure(page: Page, errorMessage = 'Failed to create course') {
  await page.route(`${API_BASE_URL}/api/courses`, async (route) => {
    if (route.request().method() === 'POST') {
      await handleRoute(route, {
        status: 400,
        body: { error: errorMessage },
      });
    } else {
      await route.continue();
    }
  });
}

export async function mockUpdateCourse(page: Page, courseId: string) {
  await page.route(`${API_BASE_URL}/api/courses/${courseId}`, async (route) => {
    if (route.request().method() === 'PUT') {
      const body = route.request().postDataJSON();
      await handleRoute(route, {
        body: {
          courseId,
          ...body,
          updatedAt: new Date().toISOString(),
        },
      });
    } else {
      await route.continue();
    }
  });
}

export async function mockDeleteCourse(page: Page, courseId: string) {
  await page.route(`${API_BASE_URL}/api/courses/${courseId}`, async (route) => {
    if (route.request().method() === 'DELETE') {
      await handleRoute(route, {
        body: { success: true },
      });
    } else {
      await route.continue();
    }
  });
}

export async function mockPublishCourse(page: Page, courseId: string) {
  await page.route(`${API_BASE_URL}/api/courses/${courseId}/publish`, async (route) => {
    await handleRoute(route, {
      body: { success: true, status: 'Published' },
    });
  });
}

export async function mockUnpublishCourse(page: Page, courseId: string) {
  await page.route(`${API_BASE_URL}/api/courses/${courseId}/unpublish`, async (route) => {
    await handleRoute(route, {
      body: { success: true, status: 'Unpublished' },
    });
  });
}

// Categories API Mocks
export async function mockGetCategories(page: Page, categories: MockCategory[] = mockCategories) {
  await page.route(`${API_BASE_URL}/api/categories`, async (route) => {
    await handleRoute(route, {
      body: { categories },
    });
  });
}

// User Profile API Mocks
export async function mockGetProfile(page: Page, user: MockUser = mockUsers[0]) {
  await page.route(`${API_BASE_URL}/api/users/me`, async (route) => {
    if (route.request().method() === 'GET') {
      await handleRoute(route, { body: user });
    } else {
      await route.continue();
    }
  });
}

export async function mockUpdateProfile(page: Page) {
  await page.route(`${API_BASE_URL}/api/users/me`, async (route) => {
    if (route.request().method() === 'PUT') {
      const body = route.request().postDataJSON();
      await handleRoute(route, {
        body: {
          success: true,
          ...body,
        },
      });
    } else {
      await route.continue();
    }
  });
}

export async function mockUpdateProfileFailure(page: Page, errorMessage = 'Failed to update profile') {
  await page.route(`${API_BASE_URL}/api/users/me`, async (route) => {
    if (route.request().method() === 'PUT') {
      await handleRoute(route, {
        body: { success: false, error: errorMessage },
      });
    } else {
      await route.continue();
    }
  });
}

export async function mockUploadAvatar(page: Page, avatarUrl = 'https://example.com/avatar.jpg') {
  await page.route(`${API_BASE_URL}/api/users/me/avatar`, async (route) => {
    if (route.request().method() === 'POST') {
      await handleRoute(route, {
        body: { success: true, avatarUrl },
      });
    } else {
      await route.continue();
    }
  });
}

export async function mockDeleteAvatar(page: Page) {
  await page.route(`${API_BASE_URL}/api/users/me/avatar`, async (route) => {
    if (route.request().method() === 'DELETE') {
      await handleRoute(route, {
        body: { success: true },
      });
    } else {
      await route.continue();
    }
  });
}

// Session Management Mocks
export async function mockGetSessions(page: Page) {
  await page.route(`${API_BASE_URL}/api/users/me/sessions`, async (route) => {
    if (route.request().method() === 'GET') {
      await handleRoute(route, {
        body: {
          sessions: [
            {
              sessionId: 'session-1',
              deviceType: 'Desktop',
              browser: 'Chrome',
              operatingSystem: 'Windows 10',
              ipAddress: '192.168.1.1',
              lastActiveAt: new Date().toISOString(),
              isCurrent: true,
            },
            {
              sessionId: 'session-2',
              deviceType: 'Mobile',
              browser: 'Safari',
              operatingSystem: 'iOS 17',
              ipAddress: '192.168.1.2',
              lastActiveAt: new Date(Date.now() - 86400000).toISOString(),
              isCurrent: false,
            },
          ],
        },
      });
    } else {
      await route.continue();
    }
  });
}

export async function mockTerminateSession(page: Page, sessionId: string) {
  await page.route(`${API_BASE_URL}/api/users/me/sessions/${sessionId}`, async (route) => {
    if (route.request().method() === 'DELETE') {
      await handleRoute(route, {
        body: { success: true },
      });
    } else {
      await route.continue();
    }
  });
}

// Composite mock setup for common scenarios
export async function setupMocksForAuthenticatedUser(page: Page, user: MockUser = mockUsers[0]) {
  await setupAuthenticatedSession(page, user);
  await mockLogout(page);
  await mockGetProfile(page, user);
  await mockUpdateProfile(page);
  await mockGetSessions(page);
}

export async function setupMocksForCourseManagement(page: Page, courses: MockCourse[] = mockCourses) {
  await mockGetCourses(page, courses);
  await mockGetCategories(page);
  await mockCreateCourse(page);

  // Setup individual course mocks
  for (const course of courses) {
    await mockGetCourse(page, course);
    await mockUpdateCourse(page, course.courseId);
    await mockDeleteCourse(page, course.courseId);
    await mockPublishCourse(page, course.courseId);
    await mockUnpublishCourse(page, course.courseId);
  }
}

export async function setupAllMocks(page: Page, user: MockUser = mockUsers[0], courses: MockCourse[] = mockCourses) {
  await setupMocksForAuthenticatedUser(page, user);
  await setupMocksForCourseManagement(page, courses);
}
