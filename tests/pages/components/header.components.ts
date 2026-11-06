import { expect, Locator, Page } from '@playwright/test';

export class Header {
  readonly signupLoginLink: Locator;
  readonly loggedInAs: Locator;
  readonly loggedInName: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;

  constructor(page: Page) {
    const header = page.locator('#header'); //css selector
    this.signupLoginLink = header.getByRole('link', { name: 'Signup / Login' });
    this.loggedInAs = header.getByText('Loggin in as'); //playwright selector
    this.loggedInName = this.loggedInAs.locator('b'); //css selector
    this.logoutLink = header.getByRole('link', { name: 'logout' });
    this.deleteAccountLink = header.getByRole('link', { name: 'Delete Account' });
  }

  async expectLoggedInAs(name: string) {
    await expect(this.loggedInName).toHaveText(name);
    await expect(this.logoutLink).toBeVisible();
  }

  async expectLoggedOut() {
    await expect(this.signupLoginLink).toBeVisible();
    await expect(this.loggedInAs).toBeHidden();
  }
}
