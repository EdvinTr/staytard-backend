import * as faker from 'faker';
import { RegisterUserDto } from '../modules/authentication/dto/register-user.dto';
export const generateRegisterUserInput = () => {
  const user: RegisterUserDto = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    mobilePhoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    password: faker.internet.password(12),
    city: faker.address.city(),
    postalCode: faker.address.zipCode(),
    street: faker.address.streetName(),
  };
  return user;
};
