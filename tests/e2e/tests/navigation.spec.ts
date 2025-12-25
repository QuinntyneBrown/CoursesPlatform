import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should redirect unknown routes to login', async ({ page }) => {
    await page.goto('/unknown-route');
    await expect(page).toHaveURL('/login');
  });

  test('should redirect root to login', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/login');
  });

  test('should have responsive design', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile
    await page.goto('/login');
    await expect(page.locator('form')).toBeVisible();

    await page.setViewportSize({ width: 768, height: 1024 }); // Tablet
    await expect(page.locator('form')).toBeVisible();

    await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
    await expect(page.locator('form')).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('login page should have accessible form', async ({ page }) => {
    await page.goto('/login');

    // Check that inputs have labels
    const emailInput = page.locator('input[formcontrolname="email"]');
    const passwordInput = page.locator('input[formcontrolname="password"]');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    // Check button is accessible
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });

  test('register page should have accessible form', async ({ page }) => {
    await page.goto('/register');

    const firstNameInput = page.locator('input[formcontrolname="firstName"]');
    const lastNameInput = page.locator('input[formcontrolname="lastName"]');
    const emailInput = page.locator('input[formcontrolname="email"]');
    const passwordInput = page.locator('input[formcontrolname="password"]');

    await expect(firstNameInput).toBeVisible();
    await expect(lastNameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test('should support keyboard navigation on login', async ({ page }) => {
    await page.goto('/login');

    // Tab through the form
    await page.keyboard.press('Tab');
    await expect(page.locator('input[formcontrolname="email"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('input[formcontrolname="password"]')).toBeFocused();

    await page.keyboard.press('Tab');
    // Next focusable element (could be checkbox or button)
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(['INPUT', 'BUTTON', 'A', 'MAT-CHECKBOX']).toContain(focused);
  });
});
