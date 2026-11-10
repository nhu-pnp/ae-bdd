import { expect, Locator, Page } from '@playwright/test';

export class SignupLoginPage {
  readonly signupHeading: Locator;
  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupButton: Locator;
  readonly page: Page;

  constructor(trang: Page) {
    this.page = trang;
    this.signupHeading = trang.getByRole('heading', { name: 'New User Signup!' });
    // getByTestId (data-qa) cho o nhap: tranh trung voi form Login; nut Signup dung getByRole
    this.signupName = trang.getByTestId('signup-name');
    this.signupEmail = trang.getByTestId('signup-email');
    this.signupButton = trang.getByRole('button', { name: 'Signup' });
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
