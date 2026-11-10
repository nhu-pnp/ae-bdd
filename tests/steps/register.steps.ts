import { expect, Page } from '@playwright/test';
import { createUser, User } from '../data/user';
import { Header } from '../pages/components/header.components';
import { AccountCreatedPage } from '../pages/account-created.page';
import { AccountInformationPage } from '../pages/account-information.page';
import { HomePage } from '../pages/home.page';
import { SignupLoginPage } from '../pages/signup-login.page';
import { Given, Then, When } from '../support/bdd';
import { world } from '../support/world';

// Lay user da tao o buoc signup; bao loi ro rang neu chua tao
function currentUser(): User {
  if (!world.user) {
    throw new Error(
      'Chua tao user - hay chay buoc "user enters a valid name and a new email" truoc',
    );
  }
  return world.user;
}

// Tao user moi, cat vao world va dien form signup.
// cleanup=true: account se duoc tao tren server -> dua vao danh sach xoa sau test
async function fillSignupWithNewUser(page: Page, { cleanup }: { cleanup: boolean }) {
  const user = createUser();
  world.user = user;
  if (cleanup) world.accountsToDelete.push(user);
  await new SignupLoginPage(page).fillSignup(user.name, user.email);
}

Given('user is on the signup and login page', async ({ page }) => {
  await new SignupLoginPage(page).open();
});

When('user enters a valid name and a new email in the signup form', async ({ page }) => {
  await fillSignupWithNewUser(page, { cleanup: true });
});

When('user clicks the Signup button', async ({ page }) => {
  await new SignupLoginPage(page).clickSignup();
});

Then('the account information form is displayed', async ({ page }) => {
  await new AccountInformationPage(page).expectOpened();
});

Then('the email is prefilled from signup and disabled', async ({ page }) => {
  const form = new AccountInformationPage(page);
  await expect(form.email).toHaveValue(currentUser().email);
  await expect(form.email).toBeDisabled();
});

Then('the name is prefilled from signup and editable', async ({ page }) => {
  const form = new AccountInformationPage(page);
  await expect(form.name).toHaveValue(currentUser().name);
  await expect(form.name).toBeEditable();
});

When('user fills in all valid account and address information', async ({ page }) => {
  await new AccountInformationPage(page).fillDetails(currentUser());
});

When('user clicks the Create Account button', async ({ page }) => {
  await new AccountInformationPage(page).clickCreateAccount();
});

Then('the Account Created page is displayed', async ({ page }) => {
  await new AccountCreatedPage(page).expectOpened();
});

When('user clicks Continue', async ({ page }) => {
  await new AccountCreatedPage(page).clickContinue();
});

Then('the home page is displayed', async ({ page }) => {
  await new HomePage(page).expectOpened();
});

Then("the header shows the user's name", async ({ page }) => {
  await new Header(page).expectLoggedInAs(currentUser().name);
});

// TC-61: scenario khong bam Create Account nen khong co account tren server -> khong push vao accountsToDelete
Given(
  'user has opened the account information form with a new name and email',
  async ({ page }) => {
    const signupLogin = new SignupLoginPage(page);
    await signupLogin.open();
    await fillSignupWithNewUser(page, { cleanup: false });
    await signupLogin.clickSignup();
    await new AccountInformationPage(page).expectOpened();
  },
);

Then('neither Mr. nor Mrs. is selected', async ({ page }) => {
  const form = new AccountInformationPage(page);
  await expect(form.titleMr).not.toBeChecked();
  await expect(form.titleMrs).not.toBeChecked();
});

Then('password and all address text fields are empty', async ({ page }) => {
  for (const field of new AccountInformationPage(page).passwordAndAddressTextFields) {
    await expect(field).toHaveValue('');
  }
});

Then('newsletter and partner offers are unchecked', async ({ page }) => {
  const form = new AccountInformationPage(page);
  await expect(form.newsletter).not.toBeChecked();
  await expect(form.partnerOffers).not.toBeChecked();
});

Then('the selected country is {string}', async ({ page }, country: string) => {
  await expect(new AccountInformationPage(page).country).toHaveValue(country);
});
