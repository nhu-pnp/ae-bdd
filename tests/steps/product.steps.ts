import { Given, Then, When } from '../support/bdd';
import { ProductsPage } from '../pages/products.page';

// TC-171: tim kiem san pham theo tu khoa; khong tao account -> khong dung accountsToDelete
Given('user is on the All Products page', async ({ page }) => {
  await new ProductsPage(page).open();
});

When('user enters {string} in the Search Product field', async ({ page }, keyword: string) => {
  await new ProductsPage(page).fillSearch(keyword);
});

When('user clicks the search button', async ({ page }) => {
  await new ProductsPage(page).clickSearch();
});

Then('the {string} heading is displayed', async ({ page }, text: string) => {
  await new ProductsPage(page).expectHeading(text);
});

Then('at least 1 product is displayed', async ({ page }) => {
  await new ProductsPage(page).expectHasProducts();
});

Then('every product name contains {string}', async ({ page }, keyword: string) => {
  await new ProductsPage(page).expectAllNamesContain(keyword);
});
