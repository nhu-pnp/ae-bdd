import { expect, Locator, Page } from '@playwright/test';

export class SignupLoginPage {
  readonly signupHeading: Locator;
  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupButton: Locator;
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  readonly loginButton: Locator;
  readonly loginError: Locator;
  readonly page: Page;

  constructor(trang: Page) {
    this.page = trang;
    this.signupHeading = trang.getByRole('heading', { name: 'New User Signup!' });
    // getByTestId (data-qa) cho o nhap: tranh trung voi form Login; nut Signup dung getByRole
    this.signupName = trang.getByTestId('signup-name');
    this.signupEmail = trang.getByTestId('signup-email');
    this.signupButton = trang.getByRole('button', { name: 'Signup' });
    // Form Login: o nhap dung getByTestId (data-qa), nut Login dung getByRole (exact de khong khop nham)
    this.loginEmail = trang.getByTestId('login-email');
    this.loginPassword = trang.getByTestId('login-password');
    this.loginButton = trang.getByRole('button', { name: 'Login', exact: true });
    // Thong bao loi khong co role/label/test id -> getByText (text duy nhat tren trang)
    this.loginError = trang.getByText('Your email or password is incorrect!');
  }

  async open() {
    await this.page.goto('/login');
    await this.expectOpened();
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/\/login$/);
    await expect(this.signupHeading).toBeVisible();
  }

  async fillSignup(name: string, email: string) {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
  }

  async clearSignup() {
    await this.signupName.fill('');
    await this.signupEmail.fill('');
  }

  async clickSignup() {
    await this.signupButton.click();
  }

  async fillLogin(email: string, password: string) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}
