import { test as base, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill('input[formcontrolname="email"]', email);
    await this.page.fill('input[formcontrolname="password"]', password);
    await this.page.click('button[type="submit"]');
  }

  async getErrorMessage() {
    const error = this.page.locator('.login-page__error, mat-error');
    return error.textContent();
  }
}

export class RegisterPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/register');
  }

  async register(firstName: string, lastName: string, email: string, password: string) {
    await this.page.fill('input[formcontrolname="firstName"]', firstName);
    await this.page.fill('input[formcontrolname="lastName"]', lastName);
    await this.page.fill('input[formcontrolname="email"]', email);
    await this.page.fill('input[formcontrolname="password"]', password);
    await this.page.fill('input[formcontrolname="confirmPassword"]', password);
    await this.page.click('button[type="submit"]');
  }
}

export class CoursesListPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/courses');
  }

  async getCreateButton() {
    return this.page.locator('button:has-text("Create"), a:has-text("Create")');
  }

  async getCourseCards() {
    return this.page.locator('.courses-list-page__card, lib-course-card');
  }

  async clickCreateCourse() {
    await this.page.click('button:has-text("Create"), a:has-text("Create")');
  }
}

export class CourseCreatePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/courses/new');
  }

  async fillBasicInfo(title: string, subtitle: string, description: string) {
    await this.page.fill('input[formcontrolname="title"]', title);
    if (subtitle) {
      await this.page.fill('input[formcontrolname="subtitle"]', subtitle);
    }
    if (description) {
      await this.page.fill('textarea[formcontrolname="description"]', description);
    }
  }

  async clickNext() {
    await this.page.click('button:has-text("Next")');
  }

  async clickComplete() {
    await this.page.click('button:has-text("Complete"), button:has-text("Publish")');
  }
}

export class ProfilePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/profile');
  }

  async updateProfile(firstName: string, lastName: string) {
    await this.page.fill('input[formcontrolname="firstName"]', firstName);
    await this.page.fill('input[formcontrolname="lastName"]', lastName);
    await this.page.click('button:has-text("Save")');
  }

  async getFirstName() {
    return this.page.inputValue('input[formcontrolname="firstName"]');
  }
}

type TestFixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  coursesListPage: CoursesListPage;
  courseCreatePage: CourseCreatePage;
  profilePage: ProfilePage;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
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
