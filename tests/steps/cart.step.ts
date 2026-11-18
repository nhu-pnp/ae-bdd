import { Given, Then, When } from '../support/bdd';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { CartModal } from '../pages/components/cart-model.component';
import { ProductDetailPage } from '../pages/product-detail.page';

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

// TC-188: so luong san pham trong gio; khong tao account -> khong dung accountsToDelete
// Buoc "user clicks View Cart" dung lai tu TC-184 o tren

Given('user is on the product detail page of {string}', async ({ page }, productName: string) => {
  const products = new ProductsPage(page);
  await products.open();
  await products.openProductDetail(productName);
  await new ProductDetailPage(page).expectOpened(productName);
});

When('user enters {int} in the Quantity field', async ({ page }, quantity: number) => {
  await new ProductDetailPage(page).fillQuantity(quantity);
});

When('user clicks the Add to cart button', async ({ page }) => {
  await new ProductDetailPage(page).clickAddToCart();
});

Then(
  'the cart shows {string} with quantity {int}',
  async ({ page }, productName: string, quantity: number) => {
    const cart = new CartPage(page);
    await cart.expectOpened();
    await cart.expectProductQuantity(productName, quantity);
  },
);

Then(
  'the cart total of {string} equals {int} times its price',
  async ({ page }, productName: string, quantity: number) => {
    await new CartPage(page).expectTotalIsQuantityTImesPrice(productName, quantity);
  },
);
