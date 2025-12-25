import { test, expect } from './fixtures';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });

  test('should display login page', async ({ loginPage, page }) => {
    await loginPage.goto();
    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1, h2').first()).toContainText(/login|sign in/i);
  });

  test('should show validation errors for empty form', async ({ loginPage, page }) => {
    await loginPage.goto();
    await page.click('button[type="submit"]');
    await expect(page.locator('mat-error')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login('invalid@example.com', 'wrongpassword');
    await expect(page.locator('.error, mat-error, .login-page__error')).toBeVisible({ timeout: 5000 });
  });

  test('should navigate to register page', async ({ loginPage, page }) => {
    await loginPage.goto();
    await page.click('a:has-text("Register"), a:has-text("Sign up")');
    await expect(page).toHaveURL('/register');
  });

  test('should navigate to forgot password page', async ({ loginPage, page }) => {
    await loginPage.goto();
    await page.click('a:has-text("Forgot")');
    await expect(page).toHaveURL('/forgot-password');
  });
});

test.describe('Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });

  test('should display registration page', async ({ registerPage, page }) => {
    await registerPage.goto();
    await expect(page).toHaveURL('/register');
    await expect(page.locator('h1, h2').first()).toContainText(/register|sign up|create account/i);
  });

  test('should show validation errors for invalid input', async ({ registerPage, page }) => {
    await registerPage.goto();
    await page.fill('input[formcontrolname="email"]', 'invalid-email');
    await page.fill('input[formcontrolname="password"]', 'weak');
    await page.click('button[type="submit"]');
    await expect(page.locator('mat-error')).toBeVisible();
  });

  test('should show password mismatch error', async ({ registerPage, page }) => {
    await registerPage.goto();
    await page.fill('input[formcontrolname="password"]', 'Password123!');
    await page.fill('input[formcontrolname="confirmPassword"]', 'Password456!');
    await page.click('button[type="submit"]');
    await expect(page.locator('mat-error')).toContainText(/match|same/i);
  });

  test('should navigate to login page', async ({ registerPage, page }) => {
    await registerPage.goto();
    await page.click('a:has-text("Login"), a:has-text("Sign in")');
    await expect(page).toHaveURL('/login');
  });
});

test.describe('Forgot Password', () => {
  test('should display forgot password page', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page).toHaveURL('/forgot-password');
    await expect(page.locator('h1, h2').first()).toContainText(/password|reset/i);
  });

  test('should show validation error for invalid email', async ({ page }) => {
    await page.goto('/forgot-password');
    await page.fill('input[formcontrolname="email"]', 'invalid-email');
    await page.click('button[type="submit"]');
    await expect(page.locator('mat-error')).toBeVisible();
  });
});
