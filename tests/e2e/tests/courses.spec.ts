import { test, expect } from './fixtures';

test.describe('Courses (Protected Routes)', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/courses');
    await expect(page).toHaveURL('/login');
  });

  test('should redirect to login when accessing create course', async ({ page }) => {
    await page.goto('/courses/new');
    await expect(page).toHaveURL('/login');
  });

  test('should redirect to login when accessing profile', async ({ page }) => {
    await page.goto('/profile');
    await expect(page).toHaveURL('/login');
  });
});

test.describe('Courses (Authenticated)', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authenticated state
    await page.addInitScript(() => {
      localStorage.setItem('accessToken', 'mock-token');
      localStorage.setItem('refreshToken', 'mock-refresh-token');
      localStorage.setItem('user', JSON.stringify({
        userId: '123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe'
      }));
    });
  });

  test('should display courses list page', async ({ coursesListPage, page }) => {
    await coursesListPage.goto();
    await expect(page).toHaveURL('/courses');
    await expect(page.locator('h1, h2').first()).toContainText(/course/i);
  });

  test('should have create course button', async ({ coursesListPage }) => {
    await coursesListPage.goto();
    const createButton = await coursesListPage.getCreateButton();
    await expect(createButton).toBeVisible();
  });

  test('should navigate to create course page', async ({ coursesListPage, page }) => {
    await coursesListPage.goto();
    await coursesListPage.clickCreateCourse();
    await expect(page).toHaveURL('/courses/new');
  });

  test('should display course create wizard', async ({ courseCreatePage, page }) => {
    await courseCreatePage.goto();
    await expect(page).toHaveURL('/courses/new');
    await expect(page.locator('h1, h2').first()).toContainText(/create|new/i);
    await expect(page.locator('lib-course-wizard, .course-wizard')).toBeVisible();
  });

  test('should show validation for required fields in course creation', async ({ courseCreatePage, page }) => {
    await courseCreatePage.goto();
    await courseCreatePage.clickNext();
    await expect(page.locator('mat-error')).toBeVisible();
  });
});

test.describe('Profile (Authenticated)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('accessToken', 'mock-token');
      localStorage.setItem('refreshToken', 'mock-refresh-token');
      localStorage.setItem('user', JSON.stringify({
        userId: '123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe'
      }));
    });
  });

  test('should display profile page', async ({ profilePage, page }) => {
    await profilePage.goto();
    await expect(page).toHaveURL('/profile');
    await expect(page.locator('h1, h2').first()).toContainText(/profile/i);
  });

  test('should show user information', async ({ profilePage, page }) => {
    await profilePage.goto();
    await expect(page.locator('input[formcontrolname="firstName"]')).toBeVisible();
    await expect(page.locator('input[formcontrolname="lastName"]')).toBeVisible();
  });
});
