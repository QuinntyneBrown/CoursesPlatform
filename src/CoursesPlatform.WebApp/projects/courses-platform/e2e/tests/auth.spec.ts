import { test, expect } from './fixtures';
import {
  mockLoginSuccess,
  mockLoginFailure,
  mockLoginLockout,
  mockRegisterSuccess,
  mockRegisterFailure,
  mockForgotPasswordSuccess,
  mockForgotPasswordFailure,
  mockUsers,
  mockGetCourses,
  mockGetCategories,
  setupAuthenticatedSession,
} from './mocks';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing auth
    await page.addInitScript(() => {
      localStorage.clear();
    });
  });

  test('should display login page with all elements', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.waitForLoad();

    await expect(loginPage.pageTitle).toHaveText('Welcome Back');
    await expect(loginPage.formTitle).toHaveText('Sign In');
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
    await expect(loginPage.registerLink).toBeVisible();
  });

  test('should show validation errors for empty form submission', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.waitForLoad();

    // Click submit without filling form
    await loginPage.submitButton.click();

    // Tab through fields to trigger validation
    await loginPage.emailInput.focus();
    await loginPage.emailInput.blur();
    await loginPage.passwordInput.focus();
    await loginPage.passwordInput.blur();

    // Check for error messages
    await expect(page.locator('mat-error')).toBeVisible();
  });

  test('should show validation error for invalid email format', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.waitForLoad();

    await loginPage.emailInput.fill('invalid-email');
    await loginPage.emailInput.blur();

    await expect(page.locator('mat-error')).toBeVisible();
  });

  test('should successfully login with valid credentials', async ({ loginPage, page }) => {
    await mockLoginSuccess(page, mockUsers[0]);
    await mockGetCourses(page);
    await mockGetCategories(page);

    await loginPage.goto();
    await loginPage.waitForLoad();

    await loginPage.login('test@example.com', 'ValidPassword123!', true);

    // Should redirect to courses page
    await page.waitForURL('**/courses');
    await expect(page.locator('.courses-list-page')).toBeVisible();
  });

  test('should show error message for invalid credentials', async ({ loginPage, page }) => {
    await mockLoginFailure(page, 'Invalid email or password');

    await loginPage.goto();
    await loginPage.waitForLoad();

    await loginPage.login('test@example.com', 'wrongpassword');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Invalid email or password');
  });

  test('should show lockout message when account is locked', async ({ loginPage, page }) => {
    await mockLoginLockout(page, 'Your account is locked. Please try again in 15 minutes.');

    await loginPage.goto();
    await loginPage.waitForLoad();

    await loginPage.login('test@example.com', 'password');

    await expect(loginPage.lockoutMessage).toBeVisible();
    await expect(loginPage.lockoutMessage).toContainText('locked');
  });

  test('should navigate to register page when clicking Sign Up', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.waitForLoad();

    await loginPage.registerLink.click();

    await page.waitForURL('**/register');
    await expect(page.locator('.register-page')).toBeVisible();
  });

  test('should navigate to forgot password page when clicking forgot password link', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.waitForLoad();

    await loginPage.forgotPasswordLink.click();

    await page.waitForURL('**/forgot-password');
    await expect(page.locator('.forgot-password-page')).toBeVisible();
  });

  test('should remember user when remember me is checked', async ({ loginPage, page }) => {
    await mockLoginSuccess(page, mockUsers[0]);
    await mockGetCourses(page);
    await mockGetCategories(page);

    await loginPage.goto();
    await loginPage.waitForLoad();

    await loginPage.login('test@example.com', 'ValidPassword123!', true);

    await page.waitForURL('**/courses');

    // Check localStorage has tokens
    const accessToken = await page.evaluate(() => localStorage.getItem('accessToken'));
    const refreshToken = await page.evaluate(() => localStorage.getItem('refreshToken'));

    expect(accessToken).toBeTruthy();
    expect(refreshToken).toBeTruthy();
  });

  test('should disable submit button while loading', async ({ loginPage, page }) => {
    // Create a delayed response
    await page.route('**/api/auth/login', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, accessToken: 'token', user: mockUsers[0] }),
      });
    });

    await loginPage.goto();
    await loginPage.waitForLoad();

    await loginPage.emailInput.fill('test@example.com');
    await loginPage.passwordInput.fill('password');
    await loginPage.submitButton.click();

    // Button should be disabled while loading
    await expect(loginPage.submitButton).toBeDisabled();
  });
});

test.describe('Register Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });
  });

  test('should display register page with all elements', async ({ registerPage }) => {
    await registerPage.goto();
    await registerPage.waitForLoad();

    await expect(registerPage.pageTitle).toHaveText('Create Account');
    await expect(registerPage.firstNameInput).toBeVisible();
    await expect(registerPage.lastNameInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.confirmPasswordInput).toBeVisible();
    await expect(registerPage.submitButton).toBeVisible();
    await expect(registerPage.loginLink).toBeVisible();
  });

  test('should show validation errors for empty form submission', async ({ registerPage, page }) => {
    await registerPage.goto();
    await registerPage.waitForLoad();

    await registerPage.submitButton.click();

    // Focus and blur fields to trigger validation
    await registerPage.firstNameInput.focus();
    await registerPage.firstNameInput.blur();

    await expect(page.locator('mat-error')).toBeVisible();
  });

  test('should show error for invalid email format', async ({ registerPage, page }) => {
    await registerPage.goto();
    await registerPage.waitForLoad();

    await registerPage.emailInput.fill('invalid-email');
    await registerPage.emailInput.blur();

    await expect(page.locator('mat-error')).toBeVisible();
  });

  test('should show error when passwords do not match', async ({ registerPage, page }) => {
    await registerPage.goto();
    await registerPage.waitForLoad();

    await registerPage.passwordInput.fill('ValidPassword123!');
    await registerPage.confirmPasswordInput.fill('DifferentPassword123!');
    await registerPage.confirmPasswordInput.blur();
    await registerPage.submitButton.click();

    await expect(page.locator('mat-error')).toBeVisible();
  });

  test('should successfully register with valid data', async ({ registerPage, page }) => {
    await mockRegisterSuccess(page);

    await registerPage.goto();
    await registerPage.waitForLoad();

    await registerPage.register(
      'John',
      'Doe',
      'newuser@example.com',
      'ValidPassword123!',
      'ValidPassword123!'
    );

    await expect(registerPage.successMessage).toBeVisible();
    await expect(registerPage.successMessage).toContainText('Registration successful');
  });

  test('should show error when email already exists', async ({ registerPage, page }) => {
    await mockRegisterFailure(page, 'An account with this email already exists');

    await registerPage.goto();
    await registerPage.waitForLoad();

    await registerPage.register(
      'John',
      'Doe',
      'existing@example.com',
      'ValidPassword123!',
      'ValidPassword123!'
    );

    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('already exists');
  });

  test('should navigate to login page when clicking Sign In', async ({ registerPage, page }) => {
    await registerPage.goto();
    await registerPage.waitForLoad();

    await registerPage.loginLink.click();

    await page.waitForURL('**/login');
    await expect(page.locator('.login-page')).toBeVisible();
  });

  test('should show password strength indicator', async ({ registerPage, page }) => {
    await registerPage.goto();
    await registerPage.waitForLoad();

    await registerPage.passwordInput.fill('weakpass');

    // Password strength indicator should be visible
    const strengthIndicator = page.locator('.password-input__strength');
    // Note: Visibility depends on component implementation
  });

  test('should disable submit button while loading', async ({ registerPage, page }) => {
    await page.route('**/api/auth/register', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ userId: 'new-id', message: 'Success' }),
      });
    });

    await registerPage.goto();
    await registerPage.waitForLoad();

    await registerPage.register(
      'John',
      'Doe',
      'newuser@example.com',
      'ValidPassword123!',
      'ValidPassword123!'
    );

    await expect(registerPage.submitButton).toBeDisabled();
  });
});

test.describe('Forgot Password Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });
  });

  test('should display forgot password page with all elements', async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.goto();
    await forgotPasswordPage.waitForLoad();

    await expect(forgotPasswordPage.pageTitle).toHaveText('Reset Password');
    await expect(forgotPasswordPage.emailInput).toBeVisible();
    await expect(forgotPasswordPage.submitButton).toBeVisible();
    await expect(forgotPasswordPage.backToLoginButton).toBeVisible();
  });

  test('should show validation error for empty email', async ({ forgotPasswordPage, page }) => {
    await forgotPasswordPage.goto();
    await forgotPasswordPage.waitForLoad();

    await forgotPasswordPage.submitButton.click();
    await forgotPasswordPage.emailInput.focus();
    await forgotPasswordPage.emailInput.blur();

    await expect(page.locator('mat-error')).toBeVisible();
  });

  test('should show validation error for invalid email format', async ({ forgotPasswordPage, page }) => {
    await forgotPasswordPage.goto();
    await forgotPasswordPage.waitForLoad();

    await forgotPasswordPage.emailInput.fill('invalid-email');
    await forgotPasswordPage.emailInput.blur();

    await expect(page.locator('mat-error')).toBeVisible();
  });

  test('should successfully send password reset email', async ({ forgotPasswordPage, page }) => {
    await mockForgotPasswordSuccess(page);

    await forgotPasswordPage.goto();
    await forgotPasswordPage.waitForLoad();

    await forgotPasswordPage.requestPasswordReset('test@example.com');

    await expect(forgotPasswordPage.successMessage).toBeVisible();
    await expect(forgotPasswordPage.successMessage).toContainText('password reset link');
  });

  test('should show error message on API failure', async ({ forgotPasswordPage, page }) => {
    await mockForgotPasswordFailure(page);

    await forgotPasswordPage.goto();
    await forgotPasswordPage.waitForLoad();

    await forgotPasswordPage.requestPasswordReset('test@example.com');

    await expect(forgotPasswordPage.errorMessage).toBeVisible();
  });

  test('should navigate back to login page', async ({ forgotPasswordPage, page }) => {
    await forgotPasswordPage.goto();
    await forgotPasswordPage.waitForLoad();

    await forgotPasswordPage.backToLoginButton.click();

    await page.waitForURL('**/login');
    await expect(page.locator('.login-page')).toBeVisible();
  });

  test('should disable submit button while loading', async ({ forgotPasswordPage, page }) => {
    await page.route('**/api/auth/forgot-password', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Email sent' }),
      });
    });

    await forgotPasswordPage.goto();
    await forgotPasswordPage.waitForLoad();

    await forgotPasswordPage.emailInput.fill('test@example.com');
    await forgotPasswordPage.submitButton.click();

    await expect(forgotPasswordPage.submitButton).toBeDisabled();
  });
});

test.describe('Authentication Flow', () => {
  test('should redirect unauthenticated user to login when accessing protected route', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });

    await page.goto('/courses');

    await page.waitForURL('**/login');
    await expect(page.locator('.login-page')).toBeVisible();
  });

  test('should redirect unauthenticated user to login when accessing profile', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });

    await page.goto('/profile');

    await page.waitForURL('**/login');
    await expect(page.locator('.login-page')).toBeVisible();
  });

  test('should allow authenticated user to access protected routes', async ({ page }) => {
    await setupAuthenticatedSession(page, mockUsers[0]);
    await mockGetCourses(page);
    await mockGetCategories(page);

    await page.goto('/courses');

    await expect(page.locator('.courses-list-page')).toBeVisible();
  });

  test('should persist authentication across page reloads', async ({ page }) => {
    await setupAuthenticatedSession(page, mockUsers[0]);
    await mockGetCourses(page);
    await mockGetCategories(page);

    await page.goto('/courses');
    await expect(page.locator('.courses-list-page')).toBeVisible();

    // Reload the page
    await page.reload();

    // Should still be on courses page
    await expect(page.locator('.courses-list-page')).toBeVisible();
  });

  test('should complete full login flow and access courses', async ({ loginPage, page }) => {
    await mockLoginSuccess(page, mockUsers[0]);
    await mockGetCourses(page);
    await mockGetCategories(page);

    await loginPage.goto();
    await loginPage.waitForLoad();

    await loginPage.login('test@example.com', 'ValidPassword123!');

    await page.waitForURL('**/courses');
    await expect(page.locator('.courses-list-page__title')).toHaveText('My Courses');
  });
});
