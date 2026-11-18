import { expect, Locator, Page } from '@playwright/test';

function parsePrice(text: string): number {
  const value = Number(text.replace(/[^\d]/g, ''));
  if (Number.isNaN(value)) {
    throw new Error(`Khong doc duoc gia tu chuoi: "${text}"`);
  }
  return value;
}
export class CartPage {
  readonly page: Page;
  readonly cartTable: Locator;
  readonly cartRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTable = page.locator('#cart_info_table');
    this.cartRows = this.cartTable.locator('tbody tr');
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/\/view_cart$/);
    await expect(this.cartTable).toBeVisible();
  }

  async expectProductCount(count: number) {
    await expect(this.cartRows).toHaveCount(count);
  }

  async expectEachRowPriceQtyTotal(expectedQty: number) {
    const count = await this.cartRows.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const row = this.cartRows.nth(i);
      // CSS class cot: cell trong bang khong co role/label rieng
      const price = parsePrice(await row.locator('.cart_price').innerText());
      await expect(row.locator('.cart_quantity')).toHaveText(String(expectedQty));
      const total = parsePrice(await row.locator('.cart_total').innerText());
      expect(total).toBe(price * expectedQty);
    }
  }

  rowByProduct(productName: string): Locator {
    return this.cartRows.filter({
      has: this.page.getByRole('link', { name: productName, exact: true }),
    });
  }
  async expectProductQuantity(productName: string, quantity: number) {
    const row = this.rowByProduct(productName);
    await expect(row).toHaveCount(1);
    await expect(row.locator('.cart_quantity')).toHaveText(String(quantity));
  }
  async expectTotalIsQuantityTImesPrice(productName: string, quantity: number) {
    const row = this.rowByProduct(productName);
    const price = parsePrice(await row.locator('.cart_price').innerText());
    const total = parsePrice(await row.locator('.cart_total').innerText());
    expect(total).toBe(price * quantity);
  }
}
