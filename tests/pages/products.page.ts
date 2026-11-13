import { expect, Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly allProductsHeading: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productNames: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.allProductsHeading = page.getByRole('heading', { name: 'All Products' });
    this.searchInput = page.getByPlaceholder('Search Product');
    this.searchButton = page.locator('#submit_search');
    this.productNames = page.locator('.features_items .productinfo p');
  }

  async open() {
    await this.page.goto('/products');
    await this.expectOpened();
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/\/products$/);
    await expect(this.allProductsHeading).toBeVisible();
  }

  async fillSearch(keyword: string) {
    await this.searchInput.fill(keyword);
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async expectHeading(text: string) {
    await expect(
      this.page.getByRole('heading', { name: new RegExp(`^${text}$`, 'i') }),
    ).toBeVisible();
  }
  async expectHasProducts() {
    await expect(this.productNames.first()).toBeVisible();
  }

  async expectAllNamesContain(keyword: string) {
    await this.expectHasProducts();
    const names = await this.productNames.allTextContents();
    for (const name of names) {
      expect(name.toLowerCase()).toContain(keyword.toLowerCase());
    }
  }
}
