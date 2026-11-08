import { expect, Locator, Page } from '@playwright/test';
import { User } from '../data/user';

export class AccountInformationPage {
  readonly heading: Locator;
  readonly titleMr: Locator;
  readonly titleMrs: Locator;
  readonly name: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly birthDay: Locator;
  readonly birthMonth: Locator;
  readonly birthYear: Locator;
  readonly newsletter: Locator;
  readonly partnerOffers: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly company: Locator;
  readonly address1: Locator;
  readonly address2: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipcode: Locator;
  readonly mobileNumber: Locator;
  readonly createAccountButton: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Enter Account Information' });
    this.titleMr = page.getByRole('radio', { name: 'Mr' });
    this.titleMrs = page.getByRole('radio', { name: 'Mrs' });
    this.name = page.getByLabel('Name');
    this.email = page.getByLabel('Email');
    this.password = page.getByLabel('Password');
    this.birthDay = page.getByRole('combobox', { name: 'Day' });
    this.birthMonth = page.getByRole('combobox', { name: 'Month' });
    this.birthYear = page.getByRole('combobox', { name: 'Year' });
    this.newsletter = page.getByRole('checkbox', { name: 'newsletter!' });
    this.partnerOffers = page.getByRole('checkbox', { name: 'partners' });
    this.firstName = page.getByLabel('First name');
    this.lastName = page.getByLabel('Last name');
    this.company = page.getByLabel('Company');
    this.address1 = page.getByLabel(/Address/);
    this.address2 = page.getByLabel(/Address 2/);
    this.country = page.getByLabel(/Country/);
    this.state = page.getByLabel('State');
    this.city = page.getByLabel('City');
    this.zipcode = page.getByLabel('Zipcode');
    this.mobileNumber = page.getByLabel('Mobile Number');
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/\/signup/);
    await expect(this.heading).toBeVisible();
  }

  async fillDetails(user: User) {
    await this.titleMr.check();
    await this.password.fill(user.password);
    await this.birthDay.selectOption(user.birthDay);
    await this.birthMonth.selectOption(user.birthMonth);
    await this.birthYear.selectOption(user.birthYear);
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.company.fill(user.company);
    await this.address1.fill(user.address1);
    await this.address2.fill(user.address2);
    await this.country.fill(user.country);
    await this.state.fill(user.state);
    await this.city.fill(user.city);
    await this.zipcode.fill(user.zipcode);
    await this.mobileNumber.fill(user.mobileNumber);
  }

  async clickCreateAccount() {
    await this.createAccountButton.click();
  }
}
