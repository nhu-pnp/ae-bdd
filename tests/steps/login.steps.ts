import { expect } from '@playwright/test';
import { createUser } from '../data/user';
import { Header } from '../pages/components/header.components';
import { SignupLoginPage } from '../pages/signup-login.page';
import { createAccountViaApi } from '../support/account-api';
import { Given, Then, When } from '../support/bdd';
import { currentUser, world } from '../support/world';

// TC-154: tao account qua API lam dieu kien tien quyet; push vao accountsToDelete ngay khi tao
Given('a registered account exists', async ({ request }) => {
  const user = createUser();
  world.user = user;
  world.accountsToDelete.push(user);
  await createAccountViaApi(request, user);
});

When(
  'user enters the registered email and correct password in the login form',
  async ({ page }) => {
    const user = currentUser();
    await new SignupLoginPage(page).fillLogin(user.email, user.password);
  },
);

// TC-158: email moi tao ngau nhien nen chac chan chua dang ky;
// khong tao account tren server -> khong push vao accountsToDelete
When('user enters an unregistered email and any password in the login form', async ({ page }) => {
  const user = createUser();
  await new SignupLoginPage(page).fillLogin(user.email, user.password);
});

When('user clicks the Login button', async ({ page }) => {
  await new SignupLoginPage(page).clickLogin();
});

Then('the login error {string} is displayed', async ({ page }, message: string) => {
  await expect(new SignupLoginPage(page).loginError).toHaveText(message);
});

Then('user is not logged in', async ({ page }) => {
  await new Header(page).expectLoggedOut();
});
