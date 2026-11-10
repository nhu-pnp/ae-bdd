import { expect, Locator, Page } from '@playwright/test';

export class AccountCreatedPage {
  readonly heading: Locator;
  readonly continueButton: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Account Created!' });
    this.continueButton = page.getByRole('link', { name: 'Continue', exact: true });
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/\/account_created/);
    await expect(this.heading).toBeVisible();
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}
