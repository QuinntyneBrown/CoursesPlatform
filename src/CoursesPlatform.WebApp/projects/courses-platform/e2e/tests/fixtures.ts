import { test as base, Page, expect } from '@playwright/test';

// Page Object Models
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async waitForLoad() {
    await this.page.waitForSelector('.login-page');
  }

  get emailInput() {
    return this.page.locator('input[formcontrolname="email"]');
  }

  get passwordInput() {
    return this.page.locator('lib-password-input input');
  }

  get rememberMeCheckbox() {
    return this.page.locator('mat-checkbox[formcontrolname="rememberMe"]');
  }

  get submitButton() {
    return this.page.locator('button[type="submit"]');
  }

  get forgotPasswordLink() {
    return this.page.getByRole('button', { name: /forgot password/i });
  }

  get registerLink() {
    return this.page.getByRole('button', { name: /sign up/i });
  }

  get errorMessage() {
    return this.page.locator('.login-form__error');
  }

  get lockoutMessage() {
    return this.page.locator('.login-form__lockout');
  }

  get pageTitle() {
    return this.page.locator('.login-page__title');
  }

  get formTitle() {
    return this.page.locator('.login-form__title');
  }

  async login(email: string, password: string, rememberMe = false) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    if (rememberMe) {
      await this.rememberMeCheckbox.click();
    }
    await this.submitButton.click();
  }

  async expectEmailError(message: string) {
    await expect(this.page.locator('mat-error').filter({ hasText: message })).toBeVisible();
  }

  async expectPasswordError(message: string) {
    await expect(this.page.locator('mat-error').filter({ hasText: message })).toBeVisible();
  }
}

export class RegisterPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/register');
  }

  async waitForLoad() {
    await this.page.waitForSelector('.register-page');
  }

  get firstNameInput() {
    return this.page.locator('input[formcontrolname="firstName"]');
  }

  get lastNameInput() {
    return this.page.locator('input[formcontrolname="lastName"]');
  }

  get emailInput() {
    return this.page.locator('input[formcontrolname="email"]');
  }

  get passwordInput() {
    return this.page.locator('lib-password-input').first().locator('input');
  }

  get confirmPasswordInput() {
    return this.page.locator('lib-password-input').last().locator('input');
  }

  get submitButton() {
    return this.page.locator('button[type="submit"]');
  }

  get loginLink() {
    return this.page.getByRole('button', { name: /sign in/i });
  }

  get errorMessage() {
    return this.page.locator('.register-form__error');
  }

  get successMessage() {
    return this.page.locator('.register-form__success');
  }

  get pageTitle() {
    return this.page.locator('.register-page__title');
  }

  async register(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.submitButton.click();
  }
}

export class ForgotPasswordPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/forgot-password');
  }

  async waitForLoad() {
    await this.page.waitForSelector('.forgot-password-page');
  }

  get emailInput() {
    return this.page.locator('input[formcontrolname="email"]');
  }

  get submitButton() {
    return this.page.locator('button[type="submit"]');
  }

  get backToLoginButton() {
    return this.page.getByRole('button', { name: /back to login/i });
  }

  get errorMessage() {
    return this.page.locator('.forgot-password-page__error');
  }

  get successMessage() {
    return this.page.locator('.forgot-password-page__success');
  }

  get pageTitle() {
    return this.page.locator('.forgot-password-page__title');
  }

  async requestPasswordReset(email: string) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }
}

export class CoursesListPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/courses');
  }

  async waitForLoad() {
    await this.page.waitForSelector('.courses-list-page');
  }

  get pageTitle() {
    return this.page.locator('.courses-list-page__title');
  }

  get createCourseButton() {
    return this.page.getByRole('button', { name: /create course/i }).first();
  }

  get loadingSpinner() {
    return this.page.locator('.courses-list-page__loading mat-spinner');
  }

  get emptyState() {
    return this.page.locator('.courses-list-page__empty');
  }

  get courseCards() {
    return this.page.locator('lib-course-card');
  }

  get coursesGrid() {
    return this.page.locator('.courses-list-page__grid');
  }

  getCourseCard(index: number) {
    return this.courseCards.nth(index);
  }

  getCourseCardByTitle(title: string) {
    return this.page.locator('lib-course-card').filter({ hasText: title });
  }

  async clickEditOnCourse(index: number) {
    const card = this.getCourseCard(index);
    await card.locator('button', { hasText: /edit/i }).click();
  }

  async openCourseMenu(index: number) {
    const card = this.getCourseCard(index);
    await card.locator('button[aria-label="More options"]').click();
  }

  async clickPublishOnCourse(index: number) {
    await this.openCourseMenu(index);
    await this.page.getByRole('menuitem', { name: /publish/i }).click();
  }

  async clickUnpublishOnCourse(index: number) {
    await this.openCourseMenu(index);
    await this.page.getByRole('menuitem', { name: /unpublish/i }).click();
  }

  async clickDeleteOnCourse(index: number) {
    await this.openCourseMenu(index);
    await this.page.getByRole('menuitem', { name: /delete/i }).click();
  }
}

export class CourseCreatePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/courses/new');
  }

  async waitForLoad() {
    await this.page.waitForSelector('.course-wizard');
  }

  get wizardTitle() {
    return this.page.locator('.course-wizard__title');
  }

  get saveDraftButton() {
    return this.page.getByRole('button', { name: /save draft/i });
  }

  get cancelButton() {
    return this.page.getByRole('button', { name: /cancel/i });
  }

  get stepper() {
    return this.page.locator('mat-stepper');
  }

  get currentStepLabel() {
    return this.page.locator('.mat-step-label-selected');
  }

  // Step 1: Basic Information
  get titleInput() {
    return this.page.locator('input[formcontrolname="title"]');
  }

  get subtitleInput() {
    return this.page.locator('input[formcontrolname="subtitle"]');
  }

  get descriptionInput() {
    return this.page.locator('textarea[formcontrolname="description"]');
  }

  get nextButton() {
    return this.page.getByRole('button', { name: /next/i });
  }

  get backButton() {
    return this.page.getByRole('button', { name: /back/i });
  }

  // Step 2: Media
  get thumbnailUpload() {
    return this.page.locator('lib-thumbnail-upload');
  }

  // Step 3: Settings
  get categorySelector() {
    return this.page.locator('lib-category-selector');
  }

  get levelSelector() {
    return this.page.locator('lib-level-selector');
  }

  get languageSelector() {
    return this.page.locator('lib-language-selector');
  }

  // Step 4: Learning Objectives
  get objectivesList() {
    return this.page.locator('lib-objectives-list');
  }

  get createCourseButton() {
    return this.page.getByRole('button', { name: /create course/i });
  }

  async fillBasicInfo(title: string, subtitle: string, description: string) {
    await this.titleInput.fill(title);
    await this.subtitleInput.fill(subtitle);
    await this.descriptionInput.fill(description);
  }

  async goToNextStep() {
    await this.nextButton.click();
  }

  async goToPreviousStep() {
    await this.backButton.click();
  }

  async selectLevel(level: string) {
    await this.levelSelector.click();
    await this.page.getByRole('option', { name: new RegExp(level, 'i') }).click();
  }

  async selectLanguage(language: string) {
    await this.languageSelector.click();
    await this.page.getByRole('option', { name: new RegExp(language, 'i') }).click();
  }

  async selectCategory(category: string) {
    await this.categorySelector.click();
    await this.page.getByRole('option', { name: new RegExp(category, 'i') }).click();
  }
}

export class ProfilePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/profile');
  }

  async waitForLoad() {
    await this.page.waitForSelector('.profile-page');
  }

  get pageTitle() {
    return this.page.locator('.profile-page__title');
  }

  get avatarUpload() {
    return this.page.locator('lib-avatar-upload');
  }

  get firstNameInput() {
    return this.page.locator('input[formcontrolname="firstName"]');
  }

  get lastNameInput() {
    return this.page.locator('input[formcontrolname="lastName"]');
  }

  get headlineInput() {
    return this.page.locator('input[formcontrolname="headline"]');
  }

  get biographyInput() {
    return this.page.locator('textarea[formcontrolname="biography"]');
  }

  get submitButton() {
    return this.page.getByRole('button', { name: /save changes/i });
  }

  get snackbar() {
    return this.page.locator('mat-snack-bar-container');
  }

  async updateProfile(firstName: string, lastName: string, headline: string, biography: string) {
    await this.firstNameInput.clear();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.clear();
    await this.lastNameInput.fill(lastName);
    await this.headlineInput.clear();
    await this.headlineInput.fill(headline);
    await this.biographyInput.clear();
    await this.biographyInput.fill(biography);
    await this.submitButton.click();
  }
}

// Extended test fixture with page objects
type Fixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  forgotPasswordPage: ForgotPasswordPage;
  coursesListPage: CoursesListPage;
  courseCreatePage: CourseCreatePage;
  profilePage: ProfilePage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
  },
  coursesListPage: async ({ page }, use) => {
    await use(new CoursesListPage(page));
  },
  courseCreatePage: async ({ page }, use) => {
    await use(new CourseCreatePage(page));
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
});

export { expect } from '@playwright/test';
