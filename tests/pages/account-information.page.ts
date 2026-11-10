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
    // Uu tien getByRole / getByLabel; field form va select dung getByTestId (data-qa) de khop dung 1 phan tu (strict mode)
    this.titleMr = page.getByRole('radio', { name: 'Mr.', exact: true });
    this.titleMrs = page.getByRole('radio', { name: 'Mrs.', exact: true });
    this.name = page.getByTestId('name');
    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.birthDay = page.getByTestId('days');
    this.birthMonth = page.getByTestId('months');
    this.birthYear = page.getByTestId('years');
    this.newsletter = page.getByLabel('Sign up for our newsletter!');
    this.partnerOffers = page.getByLabel('Receive special offers from our partners!');
    this.firstName = page.getByTestId('first_name');
    this.lastName = page.getByTestId('last_name');
    this.company = page.getByTestId('company');
    this.address1 = page.getByTestId('address');
    this.address2 = page.getByTestId('address2');
    this.country = page.getByTestId('country');
    this.state = page.getByTestId('state');
    this.city = page.getByTestId('city');
    this.zipcode = page.getByTestId('zipcode');
    this.mobileNumber = page.getByTestId('mobile_number');
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
  }

  // Password va cac o text dia chi (khong gom Name/Email da prefill)
  get passwordAndAddressTextFields(): Locator[] {
    return [
      this.password,
      this.firstName,
      this.lastName,
      this.company,
      this.address1,
      this.address2,
      this.state,
      this.city,
      this.zipcode,
      this.mobileNumber,
    ];
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/\/signup/);
    await expect(this.heading).toBeVisible();
  }

  // Dien tat ca field dang trong; KHONG dong vao Name va Email (da prefill tu buoc signup)
  async fillDetails(user: User) {
    await (user.title === 'Mrs.' ? this.titleMrs : this.titleMr).check();
    await this.password.fill(user.password);
    await this.birthDay.selectOption(user.birthDay);
    await this.birthMonth.selectOption(user.birthMonth);
    await this.birthYear.selectOption(user.birthYear);
    await this.newsletter.check();
    await this.partnerOffers.check();
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.company.fill(user.company);
    await this.address1.fill(user.address1);
    await this.address2.fill(user.address2);
    await this.country.selectOption(user.country);
    await this.state.fill(user.state);
    await this.city.fill(user.city);
    await this.zipcode.fill(user.zipcode);
    await this.mobileNumber.fill(user.mobileNumber);
  }

  async clickCreateAccount() {
    await this.createAccountButton.click();
  }
}
