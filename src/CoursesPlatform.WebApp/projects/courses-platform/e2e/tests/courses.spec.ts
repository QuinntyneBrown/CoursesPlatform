import { test, expect } from './fixtures';
import {
  setupAuthenticatedSession,
  mockGetCourses,
  mockGetCoursesEmpty,
  mockGetCategories,
  mockCreateCourse,
  mockCreateCourseFailure,
  mockDeleteCourse,
  mockPublishCourse,
  mockUnpublishCourse,
  mockUsers,
  mockCourses,
  MockCourse,
} from './mocks';

test.describe('Courses List Page', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuthenticatedSession(page, mockUsers[0]);
  });

  test('should display courses list page with title and create button', async ({ coursesListPage, page }) => {
    await mockGetCourses(page);

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    await expect(coursesListPage.pageTitle).toHaveText('My Courses');
    await expect(coursesListPage.createCourseButton).toBeVisible();
  });

  test('should show loading spinner while fetching courses', async ({ coursesListPage, page }) => {
    await page.route('**/api/courses*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ courses: mockCourses, total: mockCourses.length }),
      });
    });

    await coursesListPage.goto();

    await expect(coursesListPage.loadingSpinner).toBeVisible();
  });

  test('should display empty state when no courses exist', async ({ coursesListPage, page }) => {
    await mockGetCoursesEmpty(page);

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    await expect(coursesListPage.emptyState).toBeVisible();
    await expect(page.getByText('No courses yet')).toBeVisible();
    await expect(page.getByRole('button', { name: /create your first course/i })).toBeVisible();
  });

  test('should display course cards when courses exist', async ({ coursesListPage, page }) => {
    await mockGetCourses(page);

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    await expect(coursesListPage.coursesGrid).toBeVisible();
    await expect(coursesListPage.courseCards).toHaveCount(3);
  });

  test('should display correct course information in cards', async ({ coursesListPage, page }) => {
    await mockGetCourses(page);

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    const firstCourse = coursesListPage.getCourseCard(0);
    await expect(firstCourse.locator('.course-card__title')).toHaveText('Introduction to TypeScript');
  });

  test('should navigate to create course page when clicking create button', async ({ coursesListPage, page }) => {
    await mockGetCourses(page);
    await mockGetCategories(page);

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    await coursesListPage.createCourseButton.click();

    await page.waitForURL('**/courses/new');
    await expect(page.locator('.course-wizard')).toBeVisible();
  });

  test('should navigate to create course from empty state button', async ({ coursesListPage, page }) => {
    await mockGetCoursesEmpty(page);
    await mockGetCategories(page);

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    await page.getByRole('button', { name: /create your first course/i }).click();

    await page.waitForURL('**/courses/new');
  });

  test('should show course status badge on cards', async ({ coursesListPage, page }) => {
    await mockGetCourses(page);

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    const firstCard = coursesListPage.getCourseCard(0);
    await expect(firstCard.locator('lib-course-status-badge')).toBeVisible();
  });

  test('should show edit button on course cards', async ({ coursesListPage, page }) => {
    await mockGetCourses(page);

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    const firstCard = coursesListPage.getCourseCard(0);
    await expect(firstCard.locator('button', { hasText: /edit/i })).toBeVisible();
  });

  test('should open course actions menu', async ({ coursesListPage, page }) => {
    await mockGetCourses(page);

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    await coursesListPage.openCourseMenu(0);

    await expect(page.locator('mat-menu')).toBeVisible();
    await expect(page.getByRole('menuitem', { name: /preview/i })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: /delete/i })).toBeVisible();
  });

  test('should show publish option for draft course', async ({ coursesListPage, page }) => {
    const draftCourse: MockCourse = {
      ...mockCourses[0],
      status: 'Draft',
    };
    await mockGetCourses(page, [draftCourse]);

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    await coursesListPage.openCourseMenu(0);

    await expect(page.getByRole('menuitem', { name: /publish/i })).toBeVisible();
  });

  test('should show unpublish option for published course', async ({ coursesListPage, page }) => {
    const publishedCourse: MockCourse = {
      ...mockCourses[0],
      status: 'Published',
    };
    await mockGetCourses(page, [publishedCourse]);

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    await coursesListPage.openCourseMenu(0);

    await expect(page.getByRole('menuitem', { name: /unpublish/i })).toBeVisible();
  });

  test('should publish a draft course', async ({ coursesListPage, page }) => {
    const draftCourse: MockCourse = {
      ...mockCourses[0],
      courseId: 'course-1',
      status: 'Draft',
    };
    await mockGetCourses(page, [draftCourse]);
    await mockPublishCourse(page, 'course-1');

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    await coursesListPage.clickPublishOnCourse(0);

    // Wait for the API call to complete
    await page.waitForResponse('**/api/courses/course-1/publish');
  });

  test('should unpublish a published course', async ({ coursesListPage, page }) => {
    const publishedCourse: MockCourse = {
      ...mockCourses[0],
      courseId: 'course-1',
      status: 'Published',
    };
    await mockGetCourses(page, [publishedCourse]);
    await mockUnpublishCourse(page, 'course-1');

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    await coursesListPage.clickUnpublishOnCourse(0);

    await page.waitForResponse('**/api/courses/course-1/unpublish');
  });

  test('should show confirmation dialog before deleting course', async ({ coursesListPage, page }) => {
    await mockGetCourses(page);
    await mockDeleteCourse(page, 'course-1');

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    // Set up dialog handler
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('delete');
      await dialog.accept();
    });

    await coursesListPage.clickDeleteOnCourse(0);
  });

  test('should delete course when confirmed', async ({ coursesListPage, page }) => {
    await mockGetCourses(page, [mockCourses[0]]);
    await mockDeleteCourse(page, 'course-1');

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    // Handle confirmation dialog
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    await coursesListPage.clickDeleteOnCourse(0);

    await page.waitForResponse('**/api/courses/course-1');
  });

  test('should not delete course when cancelled', async ({ coursesListPage, page }) => {
    await mockGetCourses(page, [mockCourses[0]]);

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    // Handle confirmation dialog - dismiss it
    page.on('dialog', async dialog => {
      await dialog.dismiss();
    });

    await coursesListPage.clickDeleteOnCourse(0);

    // Course should still be visible
    await expect(coursesListPage.courseCards).toHaveCount(1);
  });
});

test.describe('Course Create Page', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuthenticatedSession(page, mockUsers[0]);
    await mockGetCategories(page);
  });

  test('should display course wizard with title', async ({ courseCreatePage, page }) => {
    await courseCreatePage.goto();
    await courseCreatePage.waitForLoad();

    await expect(courseCreatePage.wizardTitle).toHaveText('Create New Course');
  });

  test('should display stepper with all steps', async ({ courseCreatePage, page }) => {
    await courseCreatePage.goto();
    await courseCreatePage.waitForLoad();

    await expect(courseCreatePage.stepper).toBeVisible();
    await expect(page.getByText('Basic Information')).toBeVisible();
    await expect(page.getByText('Media')).toBeVisible();
    await expect(page.getByText('Settings')).toBeVisible();
    await expect(page.getByText('Learning Objectives')).toBeVisible();
  });

  test('should display save draft and cancel buttons', async ({ courseCreatePage }) => {
    await courseCreatePage.goto();
    await courseCreatePage.waitForLoad();

    await expect(courseCreatePage.saveDraftButton).toBeVisible();
    await expect(courseCreatePage.cancelButton).toBeVisible();
  });

  test('should start on Basic Information step', async ({ courseCreatePage, page }) => {
    await courseCreatePage.goto();
    await courseCreatePage.waitForLoad();

    await expect(page.locator('.mat-step-label-selected')).toContainText('Basic Information');
  });

  test('should show basic info form fields on first step', async ({ courseCreatePage }) => {
    await courseCreatePage.goto();
    await courseCreatePage.waitForLoad();

    await expect(courseCreatePage.titleInput).toBeVisible();
    await expect(courseCreatePage.subtitleInput).toBeVisible();
    await expect(courseCreatePage.descriptionInput).toBeVisible();
    await expect(courseCreatePage.nextButton).toBeVisible();
  });

  test('should disable next button when basic info is incomplete', async ({ courseCreatePage }) => {
    await courseCreatePage.goto();
    await courseCreatePage.waitForLoad();

    await expect(courseCreatePage.nextButton).toBeDisabled();
  });

  test('should enable next button when basic info is complete', async ({ courseCreatePage }) => {
    await courseCreatePage.goto();
    await courseCreatePage.waitForLoad();

    await courseCreatePage.fillBasicInfo(
      'Test Course Title',
      'Test Course Subtitle',
      'This is a comprehensive description of the test course.'
    );

    await expect(courseCreatePage.nextButton).toBeEnabled();
  });

  test('should navigate to Media step after completing basic info', async ({ courseCreatePage, page }) => {
    await courseCreatePage.goto();
    await courseCreatePage.waitForLoad();

    await courseCreatePage.fillBasicInfo(
      'Test Course Title',
      'Test Course Subtitle',
      'This is a comprehensive description of the test course.'
    );

    await courseCreatePage.goToNextStep();

    await expect(page.locator('.mat-step-label-selected')).toContainText('Media');
    await expect(courseCreatePage.thumbnailUpload).toBeVisible();
  });

  test('should display thumbnail upload on Media step', async ({ courseCreatePage, page }) => {
    await courseCreatePage.goto();
    await courseCreatePage.waitForLoad();

    await courseCreatePage.fillBasicInfo('Title', 'Subtitle', 'Description');
    await courseCreatePage.goToNextStep();

    await expect(courseCreatePage.thumbnailUpload).toBeVisible();
    await expect(page.getByText('Course Thumbnail')).toBeVisible();
  });

  test('should navigate to Settings step', async ({ courseCreatePage, page }) => {
    await courseCreatePage.goto();
    await courseCreatePage.waitForLoad();

    await courseCreatePage.fillBasicInfo('Title', 'Subtitle', 'Description');
    await courseCreatePage.goToNextStep(); // Media
    await courseCreatePage.goToNextStep(); // Settings

    await expect(page.locator('.mat-step-label-selected')).toContainText('Settings');
    await expect(courseCreatePage.categorySelector).toBeVisible();
    await expect(courseCreatePage.levelSelector).toBeVisible();
    await expect(courseCreatePage.languageSelector).toBeVisible();
  });

  test('should navigate to Learning Objectives step', async ({ courseCreatePage, page }) => {
    await courseCreatePage.goto();
    await courseCreatePage.waitForLoad();

    await courseCreatePage.fillBasicInfo('Title', 'Subtitle', 'Description');
    await courseCreatePage.goToNextStep(); // Media
    await courseCreatePage.goToNextStep(); // Settings

    // Select required fields
    await courseCreatePage.levelSelector.click();
    await page.getByRole('option').first().click();

    await courseCreatePage.languageSelector.click();
    await page.getByRole('option').first().click();

    await courseCreatePage.goToNextStep(); // Learning Objectives

    await expect(page.locator('.mat-step-label-selected')).toContainText('Learning Objectives');
    await expect(courseCreatePage.objectivesList).toBeVisible();
    await expect(courseCreatePage.createCourseButton).toBeVisible();
  });

  test('should navigate back to previous steps', async ({ courseCreatePage, page }) => {
    await courseCreatePage.goto();
    await courseCreatePage.waitForLoad();

    await courseCreatePage.fillBasicInfo('Title', 'Subtitle', 'Description');
    await courseCreatePage.goToNextStep(); // Media

    await expect(page.locator('.mat-step-label-selected')).toContainText('Media');

    await courseCreatePage.goToPreviousStep();

    await expect(page.locator('.mat-step-label-selected')).toContainText('Basic Information');
  });

  test('should navigate back to courses list when clicking cancel', async ({ courseCreatePage, page }) => {
    await mockGetCourses(page);

    await courseCreatePage.goto();
    await courseCreatePage.waitForLoad();

    await courseCreatePage.cancelButton.click();

    await page.waitForURL('**/courses');
  });

  test('should show snackbar when saving draft', async ({ courseCreatePage, page }) => {
    await courseCreatePage.goto();
    await courseCreatePage.waitForLoad();

    await courseCreatePage.fillBasicInfo('Title', 'Subtitle', 'Description');
    await courseCreatePage.saveDraftButton.click();

    await expect(page.locator('mat-snack-bar-container')).toBeVisible();
    await expect(page.getByText('Draft saved')).toBeVisible();
  });

  test('should successfully create a course', async ({ courseCreatePage, page }) => {
    await mockCreateCourse(page, 'new-course-id');
    await mockGetCourses(page);

    await courseCreatePage.goto();
    await courseCreatePage.waitForLoad();

    // Step 1: Basic Info
    await courseCreatePage.fillBasicInfo(
      'New Course Title',
      'New Course Subtitle',
      'This is a complete course description for testing purposes.'
    );
    await courseCreatePage.goToNextStep();

    // Step 2: Media (skip thumbnail for now)
    await courseCreatePage.goToNextStep();

    // Step 3: Settings
    await courseCreatePage.levelSelector.click();
    await page.getByRole('option').first().click();

    await courseCreatePage.languageSelector.click();
    await page.getByRole('option').first().click();

    await courseCreatePage.goToNextStep();

    // Step 4: Create
    await courseCreatePage.createCourseButton.click();

    // Should show success message
    await expect(page.locator('mat-snack-bar-container')).toBeVisible();
    await expect(page.getByText('Course created successfully')).toBeVisible();
  });

  test('should show error message when course creation fails', async ({ courseCreatePage, page }) => {
    await mockCreateCourseFailure(page, 'Failed to create course');

    await courseCreatePage.goto();
    await courseCreatePage.waitForLoad();

    // Complete wizard steps
    await courseCreatePage.fillBasicInfo('Title', 'Subtitle', 'Description');
    await courseCreatePage.goToNextStep();
    await courseCreatePage.goToNextStep();

    await courseCreatePage.levelSelector.click();
    await page.getByRole('option').first().click();
    await courseCreatePage.languageSelector.click();
    await page.getByRole('option').first().click();

    await courseCreatePage.goToNextStep();
    await courseCreatePage.createCourseButton.click();

    await expect(page.locator('mat-snack-bar-container')).toBeVisible();
    await expect(page.getByText('Failed to create course')).toBeVisible();
  });

  test('should preserve form data when navigating between steps', async ({ courseCreatePage, page }) => {
    await courseCreatePage.goto();
    await courseCreatePage.waitForLoad();

    const title = 'Preserved Title';
    const subtitle = 'Preserved Subtitle';
    const description = 'Preserved Description';

    await courseCreatePage.fillBasicInfo(title, subtitle, description);
    await courseCreatePage.goToNextStep();
    await courseCreatePage.goToPreviousStep();

    await expect(courseCreatePage.titleInput).toHaveValue(title);
    await expect(courseCreatePage.subtitleInput).toHaveValue(subtitle);
    await expect(courseCreatePage.descriptionInput).toHaveValue(description);
  });
});

test.describe('Course Actions', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuthenticatedSession(page, mockUsers[0]);
  });

  test('should refresh course list after publishing', async ({ coursesListPage, page }) => {
    const draftCourse: MockCourse = {
      ...mockCourses[0],
      courseId: 'course-1',
      status: 'Draft',
    };

    let callCount = 0;
    await page.route('**/api/courses*', async (route) => {
      if (route.request().method() === 'GET') {
        callCount++;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            courses: callCount === 1
              ? [draftCourse]
              : [{ ...draftCourse, status: 'Published' }],
            total: 1,
          }),
        });
      } else {
        await route.continue();
      }
    });

    await mockPublishCourse(page, 'course-1');

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    await coursesListPage.clickPublishOnCourse(0);

    // Should have fetched courses again
    await page.waitForResponse('**/api/courses*');
    expect(callCount).toBe(2);
  });

  test('should refresh course list after unpublishing', async ({ coursesListPage, page }) => {
    const publishedCourse: MockCourse = {
      ...mockCourses[0],
      courseId: 'course-1',
      status: 'Published',
    };

    let callCount = 0;
    await page.route('**/api/courses*', async (route) => {
      if (route.request().method() === 'GET') {
        callCount++;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            courses: callCount === 1
              ? [publishedCourse]
              : [{ ...publishedCourse, status: 'Unpublished' }],
            total: 1,
          }),
        });
      } else {
        await route.continue();
      }
    });

    await mockUnpublishCourse(page, 'course-1');

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    await coursesListPage.clickUnpublishOnCourse(0);

    await page.waitForResponse('**/api/courses*');
    expect(callCount).toBe(2);
  });

  test('should refresh course list after deleting', async ({ coursesListPage, page }) => {
    let callCount = 0;
    await page.route('**/api/courses*', async (route) => {
      if (route.request().method() === 'GET') {
        callCount++;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            courses: callCount === 1 ? [mockCourses[0]] : [],
            total: callCount === 1 ? 1 : 0,
          }),
        });
      } else {
        await route.continue();
      }
    });

    await mockDeleteCourse(page, 'course-1');

    await coursesListPage.goto();
    await coursesListPage.waitForLoad();

    // Handle confirmation dialog
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    await coursesListPage.clickDeleteOnCourse(0);

    await page.waitForResponse(resp =>
      resp.url().includes('/api/courses/course-1') &&
      resp.request().method() === 'DELETE'
    );
  });
});

test.describe('Protected Routes', () => {
  test('should redirect to login when accessing courses without authentication', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });

    await page.goto('/courses');

    await page.waitForURL('**/login');
    await expect(page.locator('.login-page')).toBeVisible();
  });

  test('should redirect to login when accessing course create without authentication', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });

    await page.goto('/courses/new');

    await page.waitForURL('**/login');
    await expect(page.locator('.login-page')).toBeVisible();
  });
});
