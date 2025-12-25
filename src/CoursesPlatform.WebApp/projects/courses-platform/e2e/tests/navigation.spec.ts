import { test, expect } from './fixtures';
import {
  setupAuthenticatedSession,
  mockGetCourses,
  mockGetCategories,
  mockGetProfile,
  mockUsers,
} from './mocks';

test.describe('Route Navigation', () => {
  test.describe('Unauthenticated Routes', () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.clear();
      });
    });

    test('should redirect root path to login', async ({ page }) => {
      await page.goto('/');

      await page.waitForURL('**/login');
      await expect(page.locator('.login-page')).toBeVisible();
    });

    test('should allow access to login page', async ({ page }) => {
      await page.goto('/login');

      await expect(page.locator('.login-page')).toBeVisible();
    });

    test('should allow access to register page', async ({ page }) => {
      await page.goto('/register');

      await expect(page.locator('.register-page')).toBeVisible();
    });

    test('should allow access to forgot-password page', async ({ page }) => {
      await page.goto('/forgot-password');

      await expect(page.locator('.forgot-password-page')).toBeVisible();
    });

    test('should redirect unknown routes to login', async ({ page }) => {
      await page.goto('/unknown-route');

      await page.waitForURL('**/login');
      await expect(page.locator('.login-page')).toBeVisible();
    });

    test('should redirect /courses to login when unauthenticated', async ({ page }) => {
      await page.goto('/courses');

      await page.waitForURL('**/login');
      await expect(page.locator('.login-page')).toBeVisible();
    });

    test('should redirect /courses/new to login when unauthenticated', async ({ page }) => {
      await page.goto('/courses/new');

      await page.waitForURL('**/login');
      await expect(page.locator('.login-page')).toBeVisible();
    });

    test('should redirect /profile to login when unauthenticated', async ({ page }) => {
      await page.goto('/profile');

      await page.waitForURL('**/login');
      await expect(page.locator('.login-page')).toBeVisible();
    });
  });

  test.describe('Authenticated Routes', () => {
    test.beforeEach(async ({ page }) => {
      await setupAuthenticatedSession(page, mockUsers[0]);
      await mockGetCourses(page);
      await mockGetCategories(page);
      await mockGetProfile(page, mockUsers[0]);
    });

    test('should allow access to courses page', async ({ page }) => {
      await page.goto('/courses');

      await expect(page.locator('.courses-list-page')).toBeVisible();
    });

    test('should allow access to course create page', async ({ page }) => {
      await page.goto('/courses/new');

      await expect(page.locator('.course-wizard')).toBeVisible();
    });

    test('should allow access to profile page', async ({ page }) => {
      await page.goto('/profile');

      await expect(page.locator('.profile-page')).toBeVisible();
    });

    test('should redirect root to login (or dashboard)', async ({ page }) => {
      await page.goto('/');

      // Depending on implementation, may redirect to login or a dashboard
      await page.waitForURL('**/login');
    });
  });

  test.describe('Navigation Between Pages', () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.clear();
      });
    });

    test('should navigate from login to register', async ({ loginPage, page }) => {
      await loginPage.goto();
      await loginPage.waitForLoad();

      await loginPage.registerLink.click();

      await page.waitForURL('**/register');
      await expect(page.locator('.register-page')).toBeVisible();
    });

    test('should navigate from login to forgot password', async ({ loginPage, page }) => {
      await loginPage.goto();
      await loginPage.waitForLoad();

      await loginPage.forgotPasswordLink.click();

      await page.waitForURL('**/forgot-password');
      await expect(page.locator('.forgot-password-page')).toBeVisible();
    });

    test('should navigate from register to login', async ({ registerPage, page }) => {
      await registerPage.goto();
      await registerPage.waitForLoad();

      await registerPage.loginLink.click();

      await page.waitForURL('**/login');
      await expect(page.locator('.login-page')).toBeVisible();
    });

    test('should navigate from forgot password to login', async ({ forgotPasswordPage, page }) => {
      await forgotPasswordPage.goto();
      await forgotPasswordPage.waitForLoad();

      await forgotPasswordPage.backToLoginButton.click();

      await page.waitForURL('**/login');
      await expect(page.locator('.login-page')).toBeVisible();
    });
  });

  test.describe('Authenticated Navigation Flow', () => {
    test.beforeEach(async ({ page }) => {
      await setupAuthenticatedSession(page, mockUsers[0]);
      await mockGetCourses(page);
      await mockGetCategories(page);
      await mockGetProfile(page, mockUsers[0]);
    });

    test('should navigate from courses to create course', async ({ coursesListPage, page }) => {
      await coursesListPage.goto();
      await coursesListPage.waitForLoad();

      await coursesListPage.createCourseButton.click();

      await page.waitForURL('**/courses/new');
      await expect(page.locator('.course-wizard')).toBeVisible();
    });

    test('should navigate from create course back to courses via cancel', async ({ courseCreatePage, page }) => {
      await courseCreatePage.goto();
      await courseCreatePage.waitForLoad();

      await courseCreatePage.cancelButton.click();

      await page.waitForURL('**/courses');
      await expect(page.locator('.courses-list-page')).toBeVisible();
    });
  });
});

test.describe('Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });
  });

  test.describe('Mobile Viewport', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should display login page correctly on mobile', async ({ loginPage, page }) => {
      await loginPage.goto();
      await loginPage.waitForLoad();

      await expect(loginPage.pageTitle).toBeVisible();
      await expect(loginPage.emailInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.submitButton).toBeVisible();
    });

    test('should display register page correctly on mobile', async ({ registerPage }) => {
      await registerPage.goto();
      await registerPage.waitForLoad();

      await expect(registerPage.pageTitle).toBeVisible();
      await expect(registerPage.firstNameInput).toBeVisible();
      await expect(registerPage.lastNameInput).toBeVisible();
      await expect(registerPage.emailInput).toBeVisible();
    });

    test('should display forgot password page correctly on mobile', async ({ forgotPasswordPage }) => {
      await forgotPasswordPage.goto();
      await forgotPasswordPage.waitForLoad();

      await expect(forgotPasswordPage.pageTitle).toBeVisible();
      await expect(forgotPasswordPage.emailInput).toBeVisible();
      await expect(forgotPasswordPage.submitButton).toBeVisible();
    });

    test('should display courses page correctly on mobile', async ({ coursesListPage, page }) => {
      await setupAuthenticatedSession(page, mockUsers[0]);
      await mockGetCourses(page);

      await coursesListPage.goto();
      await coursesListPage.waitForLoad();

      await expect(coursesListPage.pageTitle).toBeVisible();
      await expect(coursesListPage.createCourseButton).toBeVisible();
    });

    test('should display profile page correctly on mobile', async ({ profilePage, page }) => {
      await setupAuthenticatedSession(page, mockUsers[0]);
      await mockGetProfile(page, mockUsers[0]);

      await profilePage.goto();
      await profilePage.waitForLoad();

      await expect(profilePage.pageTitle).toBeVisible();
      await expect(profilePage.firstNameInput).toBeVisible();
    });
  });

  test.describe('Tablet Viewport', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('should display login page correctly on tablet', async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.waitForLoad();

      await expect(loginPage.pageTitle).toBeVisible();
      await expect(loginPage.emailInput).toBeVisible();
    });

    test('should display courses page correctly on tablet', async ({ coursesListPage, page }) => {
      await setupAuthenticatedSession(page, mockUsers[0]);
      await mockGetCourses(page);

      await coursesListPage.goto();
      await coursesListPage.waitForLoad();

      await expect(coursesListPage.pageTitle).toBeVisible();
      await expect(coursesListPage.coursesGrid).toBeVisible();
    });
  });

  test.describe('Desktop Viewport', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should display login page correctly on desktop', async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.waitForLoad();

      await expect(loginPage.pageTitle).toBeVisible();
      await expect(loginPage.emailInput).toBeVisible();
    });

    test('should display courses page correctly on desktop', async ({ coursesListPage, page }) => {
      await setupAuthenticatedSession(page, mockUsers[0]);
      await mockGetCourses(page);

      await coursesListPage.goto();
      await coursesListPage.waitForLoad();

      await expect(coursesListPage.pageTitle).toBeVisible();
      await expect(coursesListPage.coursesGrid).toBeVisible();
    });
  });
});

test.describe('Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });
  });

  test('should support tab navigation on login form', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.waitForLoad();

    // Tab through form elements
    await page.keyboard.press('Tab');
    await expect(loginPage.emailInput).toBeFocused();

    await page.keyboard.press('Tab');
    // Next focusable element (password or toggle)
  });

  test('should support tab navigation on register form', async ({ registerPage, page }) => {
    await registerPage.goto();
    await registerPage.waitForLoad();

    await page.keyboard.press('Tab');
    await expect(registerPage.firstNameInput).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(registerPage.lastNameInput).toBeFocused();
  });

  test('should allow form submission with Enter key on login', async ({ loginPage, page }) => {
    await page.route('**/api/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, error: 'Test error' }),
      });
    });

    await loginPage.goto();
    await loginPage.waitForLoad();

    await loginPage.emailInput.fill('test@example.com');
    await loginPage.passwordInput.fill('password');
    await page.keyboard.press('Enter');

    // Should trigger form submission
    await expect(loginPage.errorMessage).toBeVisible();
  });
});

test.describe('Browser History', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });
  });

  test('should navigate back from register to login', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('.login-page')).toBeVisible();

    await page.goto('/register');
    await expect(page.locator('.register-page')).toBeVisible();

    await page.goBack();
    await expect(page.locator('.login-page')).toBeVisible();
  });

  test('should navigate back from forgot password to login', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('.login-page')).toBeVisible();

    await page.goto('/forgot-password');
    await expect(page.locator('.forgot-password-page')).toBeVisible();

    await page.goBack();
    await expect(page.locator('.login-page')).toBeVisible();
  });

  test('should navigate forward after going back', async ({ page }) => {
    await page.goto('/login');
    await page.goto('/register');
    await page.goBack();

    await expect(page.locator('.login-page')).toBeVisible();

    await page.goForward();
    await expect(page.locator('.register-page')).toBeVisible();
  });
});

test.describe('Page Loading States', () => {
  test('should show loading state on courses page', async ({ page }) => {
    await setupAuthenticatedSession(page, mockUsers[0]);

    await page.route('**/api/courses*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ courses: [], total: 0 }),
      });
    });

    await page.goto('/courses');

    // Should show loading spinner
    await expect(page.locator('.courses-list-page__loading mat-spinner')).toBeVisible();

    // Wait for loading to complete
    await expect(page.locator('.courses-list-page__empty')).toBeVisible();
  });
});

test.describe('URL Parameters', () => {
  test('should handle query parameters gracefully', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });

    await page.goto('/login?redirect=/courses');

    await expect(page.locator('.login-page')).toBeVisible();
  });

  test('should handle hash fragments', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });

    await page.goto('/login#section');

    await expect(page.locator('.login-page')).toBeVisible();
  });
});

test.describe('Error Handling', () => {
  test('should handle network errors gracefully on login', async ({ loginPage, page }) => {
    await page.route('**/api/auth/login', async (route) => {
      await route.abort('failed');
    });

    await loginPage.goto();
    await loginPage.waitForLoad();

    await loginPage.login('test@example.com', 'password');

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('should handle network errors gracefully on courses page', async ({ coursesListPage, page }) => {
    await setupAuthenticatedSession(page, mockUsers[0]);

    await page.route('**/api/courses*', async (route) => {
      await route.abort('failed');
    });

    await coursesListPage.goto();

    // Should handle error gracefully (implementation dependent)
    await expect(page.locator('.courses-list-page')).toBeVisible();
  });
});
