import { expect, Locator, Page } from '@playwright/test';

export class CartModal {
  readonly modal: Locator;
  readonly addTittle: Locator;
  readonly viewCartLink: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.modal = page.locator('#cartModal');
    this.addTittle = this.modal.getByText('Added!', { exact: true });
    this.viewCartLink = this.modal.getByRole('link', { name: 'View Cart' });
    this.continueShoppingButton = this.modal.getByRole('button', { name: 'Continue Shopping' });
  }

  async expectShown() {
    await expect(this.addTittle).toBeVisible();
    await expect(this.viewCartLink).toBeVisible();
    await expect(this.continueShoppingButton).toBeVisible();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
    await expect(this.modal).toBeHidden();
  }

  async viewCart() {
    await this.viewCartLink.click();
  }
}
