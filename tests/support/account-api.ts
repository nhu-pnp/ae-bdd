import { APIRequestContext, expect } from '@playwright/test';
import { User } from '../data/user';

// Tao account qua API (nhanh, khong phu thuoc UI signup) - dung cho buoc tien quyet "account da dang ky"
export async function createAccountViaApi(request: APIRequestContext, user: User) {
  const response = await request.post('/api/createAccount', {
    form: {
      name: user.name,
      email: user.email,
      password: user.password,
      title: user.title,
      birth_date: user.birthDay,
      birth_month: user.birthMonth,
      birth_year: user.birthYear,
      firstname: user.firstName,
      lastname: user.lastName,
      company: user.company,
      address1: user.address1,
      address2: user.address2,
      country: user.country,
      zipcode: user.zipcode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobileNumber,
    },
  });
  // API luon tra HTTP 200; ket qua that nam trong responseCode cua body
  // Khi site qua tai, API tra trang HTML thay vi JSON -> bao loi ro rang thay vi SyntaxError
  const text = await response.text();
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    throw new Error(
      `API createAccount khong tra JSON (site co the qua tai): ${text.slice(0, 200)}`,
    );
  }
  expect(body, `Tao account ${user.email} that bai`).toMatchObject({ responseCode: 201 });
}
