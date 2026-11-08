import { expect, Locator, Page } from '@playwright/test';

export class SignupLoginPage {
  readonly signupHeading: Locator;
  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupButton: Locator;

  constructor(private readonly page: Page) {
    this.signupHeading = page.getByRole('heading', { name: 'New User Signup!' });
    this.signupName = page.getByPlaceholder('Name');
    this.signupEmail = page.getByPlaceholder('Email Address');
    this.signupButton = page.getByRole('button', { name: 'Signup' });
  }

  async open() {
    await this.page.goto('/login');
    await expect(this.signupHeading).toBeVisible();
  }

  async fillSignup(name: string, email: string) {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
  }
  async clickSignup() {
    await this.signupButton.click();
  }
}
