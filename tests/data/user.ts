// User: khung du lieu cua 1 user (chi khai bao cac truong, chua co gia tri)
export class User {
  name!: string;
  email!: string;
  password!: string;
  title!: string;
  birthDay!: string;
  birthMonth!: string;
  birthYear!: string;
  firstName!: string;
  lastName!: string;
  company!: string;
  address1!: string;
  address2!: string;
  country!: string;
  state!: string;
  city!: string;
  zipcode!: string;
  mobileNumber!: string;
}

// createUser: tao 1 user voi gia tri cu the de dung trong test
export function createUser(): User {
  // id ngau nhien, giup moi user khong bi trung
  const id = Date.now();

  const user = new User();
  user.name = `QA ${id}`;
  user.email = `qa${id}@example.com`;
  user.password = `Test!${id}`;
  user.title = 'Mr.';
  user.birthDay = '15';
  user.birthMonth = '6';
  user.birthYear = '1995';
  user.firstName = 'QA';
  user.lastName = 'Learner';
  user.company = 'Automation Class';
  user.address1 = '123 Test Street';
  user.address2 = 'Unit 4';
  user.country = 'Canada';
  user.state = 'Ontario';
  user.city = 'Toronto';
  user.zipcode = 'M5V2T6';
  user.mobileNumber = '4165550100';

  return user;
}
