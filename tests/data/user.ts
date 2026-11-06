import { randomUUID } from 'node:crypto';

export type User = ReturnType<typeof createUser>;

export function createUser() {
  const id = randomUUID().slice(0, 8); //adf4534df
  return {
    name: `QA ${id}`,
    email: `qa.${id}.${Date.now()}@example.com`, //qa.123RTG.06112026@example.com
    password: `Test!${id}`,
    title: 'Mr.',
    birthDay: '15',
    birthMonth: '6',
    birthYear: '1995',
    firstName: 'QA',
    lastName: 'Learner',
    company: 'Automation Class',
    address1: '123 Test Street',
    address2: 'Unit 4',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    zipcode: 'M5V2T6',
    mobileNumber: '4165550100',
  };
}
