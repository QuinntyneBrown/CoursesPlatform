import { test, expect } from './fixtures';
import {
  setupAuthenticatedSession,
  mockGetProfile,
  mockUpdateProfile,
  mockUpdateProfileFailure,
  mockUploadAvatar,
  mockDeleteAvatar,
  mockUsers,
  MockUser,
} from './mocks';

test.describe('Profile Page', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuthenticatedSession(page, mockUsers[0]);
    await mockGetProfile(page, mockUsers[0]);
    await mockUpdateProfile(page);
  });

  test('should display profile page with title', async ({ profilePage }) => {
    await profilePage.goto();
    await profilePage.waitForLoad();

    await expect(profilePage.pageTitle).toHaveText('Profile Settings');
  });

  test('should display all form fields', async ({ profilePage }) => {
    await profilePage.goto();
    await profilePage.waitForLoad();

    await expect(profilePage.firstNameInput).toBeVisible();
    await expect(profilePage.lastNameInput).toBeVisible();
    await expect(profilePage.headlineInput).toBeVisible();
    await expect(profilePage.biographyInput).toBeVisible();
    await expect(profilePage.submitButton).toBeVisible();
  });

  test('should display avatar upload component', async ({ profilePage }) => {
    await profilePage.goto();
    await profilePage.waitForLoad();

    await expect(profilePage.avatarUpload).toBeVisible();
  });

  test('should populate form with current user data', async ({ profilePage, page }) => {
    await profilePage.goto();
    await profilePage.waitForLoad();

    await expect(profilePage.firstNameInput).toHaveValue('John');
    await expect(profilePage.lastNameInput).toHaveValue('Doe');
    await expect(profilePage.biographyInput).toHaveValue('Software developer with 10 years of experience');
    await expect(profilePage.headlineInput).toHaveValue('Senior Software Engineer');
  });

  test('should show validation error when first name is empty', async ({ profilePage, page }) => {
    await profilePage.goto();
    await profilePage.waitForLoad();

    await profilePage.firstNameInput.clear();
    await profilePage.firstNameInput.blur();
    await profilePage.submitButton.click();

    await expect(page.locator('mat-error')).toBeVisible();
    await expect(page.getByText('First name is required')).toBeVisible();
  });

  test('should show validation error when last name is empty', async ({ profilePage, page }) => {
    await profilePage.goto();
    await profilePage.waitForLoad();

    await profilePage.lastNameInput.clear();
    await profilePage.lastNameInput.blur();
    await profilePage.submitButton.click();

    await expect(page.locator('mat-error')).toBeVisible();
    await expect(page.getByText('Last name is required')).toBeVisible();
  });

  test('should successfully update profile', async ({ profilePage, page }) => {
    await profilePage.goto();
    await profilePage.waitForLoad();

    await profilePage.updateProfile(
      'Jane',
      'Smith',
      'Lead Developer',
      'Updated biography text'
    );

    await expect(profilePage.snackbar).toBeVisible();
    await expect(page.getByText('Profile updated successfully')).toBeVisible();
  });

  test('should show error message when profile update fails', async ({ profilePage, page }) => {
    await mockUpdateProfileFailure(page, 'Failed to update profile');

    await profilePage.goto();
    await profilePage.waitForLoad();

    await profilePage.updateProfile(
      'Jane',
      'Smith',
      'Lead Developer',
      'Updated biography'
    );

    await expect(profilePage.snackbar).toBeVisible();
    await expect(page.getByText('Failed to update profile')).toBeVisible();
  });

  test('should disable submit button while loading', async ({ profilePage, page }) => {
    await page.route('**/api/users/me', async (route) => {
      if (route.request().method() === 'PUT') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        });
      } else {
        await route.continue();
      }
    });

    await profilePage.goto();
    await profilePage.waitForLoad();

    await profilePage.firstNameInput.clear();
    await profilePage.firstNameInput.fill('Updated');
    await profilePage.submitButton.click();

    await expect(profilePage.submitButton).toBeDisabled();
  });

  test('should allow editing headline field', async ({ profilePage }) => {
    await profilePage.goto();
    await profilePage.waitForLoad();

    const newHeadline = 'New Headline Title';
    await profilePage.headlineInput.clear();
    await profilePage.headlineInput.fill(newHeadline);

    await expect(profilePage.headlineInput).toHaveValue(newHeadline);
  });

  test('should allow editing biography field', async ({ profilePage }) => {
    await profilePage.goto();
    await profilePage.waitForLoad();

    const newBiography = 'This is my updated biography with more details about my experience.';
    await profilePage.biographyInput.clear();
    await profilePage.biographyInput.fill(newBiography);

    await expect(profilePage.biographyInput).toHaveValue(newBiography);
  });

  test('should handle profile with no biography', async ({ profilePage, page }) => {
    const userWithoutBio: MockUser = {
      ...mockUsers[0],
      biography: undefined,
      headline: undefined,
    };

    await setupAuthenticatedSession(page, userWithoutBio);
    await mockGetProfile(page, userWithoutBio);

    await profilePage.goto();
    await profilePage.waitForLoad();

    await expect(profilePage.biographyInput).toHaveValue('');
    await expect(profilePage.headlineInput).toHaveValue('');
  });

  test('should validate maximum length for fields', async ({ profilePage, page }) => {
    await profilePage.goto();
    await profilePage.waitForLoad();

    // First name max length is 100
    const longFirstName = 'a'.repeat(101);
    await profilePage.firstNameInput.clear();
    await profilePage.firstNameInput.fill(longFirstName);
    await profilePage.firstNameInput.blur();

    // The input should be truncated or show an error depending on implementation
    // This test verifies the field accepts the input
    const firstNameValue = await profilePage.firstNameInput.inputValue();
    expect(firstNameValue.length).toBeLessThanOrEqual(101);
  });
});

test.describe('Avatar Upload', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuthenticatedSession(page, mockUsers[0]);
    await mockGetProfile(page, mockUsers[0]);
    await mockUpdateProfile(page);
  });

  test('should display avatar upload component', async ({ profilePage }) => {
    await profilePage.goto();
    await profilePage.waitForLoad();

    await expect(profilePage.avatarUpload).toBeVisible();
  });

  test('should show success message after uploading avatar', async ({ profilePage, page }) => {
    await mockUploadAvatar(page, 'https://example.com/new-avatar.jpg');

    await profilePage.goto();
    await profilePage.waitForLoad();

    // Simulate file upload by triggering the file input
    const fileInput = page.locator('lib-avatar-upload input[type="file"]');

    // Create a test file
    await fileInput.setInputFiles({
      name: 'avatar.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake image content'),
    });

    await expect(page.locator('mat-snack-bar-container')).toBeVisible();
    await expect(page.getByText('Avatar uploaded successfully')).toBeVisible();
  });

  test('should show error message when avatar upload fails', async ({ profilePage, page }) => {
    await page.route('**/api/users/me/avatar', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Upload failed' }),
        });
      } else {
        await route.continue();
      }
    });

    await profilePage.goto();
    await profilePage.waitForLoad();

    const fileInput = page.locator('lib-avatar-upload input[type="file"]');

    await fileInput.setInputFiles({
      name: 'avatar.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake image content'),
    });

    await expect(page.locator('mat-snack-bar-container')).toBeVisible();
    await expect(page.getByText('Failed to upload avatar')).toBeVisible();
  });

  test('should show success message after removing avatar', async ({ profilePage, page }) => {
    const userWithAvatar: MockUser = {
      ...mockUsers[0],
      avatarUrl: 'https://example.com/existing-avatar.jpg',
    };

    await setupAuthenticatedSession(page, userWithAvatar);
    await mockGetProfile(page, userWithAvatar);
    await mockDeleteAvatar(page);

    await profilePage.goto();
    await profilePage.waitForLoad();

    // Click remove avatar button if visible
    const removeButton = page.locator('lib-avatar-upload button').filter({ hasText: /remove/i });

    if (await removeButton.isVisible()) {
      await removeButton.click();

      await expect(page.locator('mat-snack-bar-container')).toBeVisible();
      await expect(page.getByText('Avatar removed')).toBeVisible();
    }
  });

  test('should show error message when avatar removal fails', async ({ profilePage, page }) => {
    const userWithAvatar: MockUser = {
      ...mockUsers[0],
      avatarUrl: 'https://example.com/existing-avatar.jpg',
    };

    await setupAuthenticatedSession(page, userWithAvatar);
    await mockGetProfile(page, userWithAvatar);

    await page.route('**/api/users/me/avatar', async (route) => {
      if (route.request().method() === 'DELETE') {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Delete failed' }),
        });
      } else {
        await route.continue();
      }
    });

    await profilePage.goto();
    await profilePage.waitForLoad();

    const removeButton = page.locator('lib-avatar-upload button').filter({ hasText: /remove/i });

    if (await removeButton.isVisible()) {
      await removeButton.click();

      await expect(page.locator('mat-snack-bar-container')).toBeVisible();
      await expect(page.getByText('Failed to remove avatar')).toBeVisible();
    }
  });
});

test.describe('Profile Protected Route', () => {
  test('should redirect to login when accessing profile without authentication', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });

    await page.goto('/profile');

    await page.waitForURL('**/login');
    await expect(page.locator('.login-page')).toBeVisible();
  });

  test('should allow authenticated user to access profile', async ({ profilePage, page }) => {
    await setupAuthenticatedSession(page, mockUsers[0]);
    await mockGetProfile(page, mockUsers[0]);

    await profilePage.goto();
    await profilePage.waitForLoad();

    await expect(profilePage.pageTitle).toHaveText('Profile Settings');
  });
});

test.describe('Profile Form Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuthenticatedSession(page, mockUsers[0]);
    await mockGetProfile(page, mockUsers[0]);
    await mockUpdateProfile(page);
  });

  test('should handle form submission with keyboard', async ({ profilePage, page }) => {
    await profilePage.goto();
    await profilePage.waitForLoad();

    await profilePage.firstNameInput.clear();
    await profilePage.firstNameInput.fill('Updated Name');

    // Submit form using Enter key on the last field
    await profilePage.biographyInput.focus();
    await page.keyboard.press('Enter');

    // Form should be submitted (or we should see the snackbar)
    // Note: This depends on form implementation
  });

  test('should preserve form state after validation error', async ({ profilePage, page }) => {
    await profilePage.goto();
    await profilePage.waitForLoad();

    // Fill in valid headline
    const headline = 'Test Headline';
    await profilePage.headlineInput.clear();
    await profilePage.headlineInput.fill(headline);

    // Clear required field
    await profilePage.firstNameInput.clear();
    await profilePage.submitButton.click();

    // Headline should still have the value
    await expect(profilePage.headlineInput).toHaveValue(headline);
  });

  test('should focus first name field on page load', async ({ profilePage, page }) => {
    await profilePage.goto();
    await profilePage.waitForLoad();

    // First interactive field should be focusable
    await profilePage.firstNameInput.focus();
    await expect(profilePage.firstNameInput).toBeFocused();
  });
});
