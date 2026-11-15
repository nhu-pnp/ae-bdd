import { Then, When } from '../support/bdd';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { CartModal } from '../pages/components/cart-model.component';

// TC-184: them san pham vao gio; khong tao account -> khong dung accountsToDelete
// Buoc "user is on the All Products page" dung lai tu product.steps.ts

When('user adds the first product to cart', async ({ page }) => {
  await new ProductsPage(page).addToCart(0);
});

When('user adds the second product to cart', async ({ page }) => {
  await new ProductsPage(page).addToCart(1);
});

Then(
  'the {string} popup is displayed with View Cart and Continue Shopping',
  async ({ page }, _title: string) => {
    await new CartModal(page).expectShown();
  },
);

When('user clicks Continue Shopping', async ({ page }) => {
  await new CartModal(page).continueShopping();
});

When('user clicks View Cart', async ({ page }) => {
  await new CartModal(page).viewCart();
});

Then('the cart shows {int} products', async ({ page }, count: number) => {
  const cart = new CartPage(page);
  await cart.expectOpened();
  await cart.expectProductCount(count);
});

Then(
  'each cart product shows its price, quantity {int} and total equal to price x quantity',
  async ({ page }, qty: number) => {
    await new CartPage(page).expectEachRowPriceQtyTotal(qty);
  },
);
