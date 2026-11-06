import { expect, Page } from '@playwright/test';

export class HomePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/');
    await this.expectOpened();
  }

  async expectOpened() {
    await expect(this.page).toHaveURL('/');
    await expect(this.page.locator('#slider')).toBeVisible();
  }
}
