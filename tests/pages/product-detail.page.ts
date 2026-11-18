import { expect, Locator, Page } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
  }

  async expectOpened(productName: string) {
    await expect(this.page).toHaveURL(/\/product_details\/\d+$/);
    await expect(this.page.getByRole('heading', { name: productName, exact: true })).toBeVisible();
  }

  async fillQuantity(quantity: number) {
    await this.quantityInput.fill(String(quantity));
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }
}
