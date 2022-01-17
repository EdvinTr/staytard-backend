import { UserInterface } from '../../user/entities/user.entity';

export const mockedUser: UserInterface = {
  id: 'someRandomUUID',
  email: 'some-guy@gmail.com',
  isRegisteredWithGoogle: false,
  firstName: 'Some Guy',
  lastName: 'The Last',
  mobilePhoneNumber: '+46704253388',
  isEmailConfirmed: false,
  permissions: [],
  address: {
    city: 'Uppsala',
    id: 1,
    postalCode: '12345',
    street: 'Södra Vägen',
  },
  currentHashedRefreshToken: '',
  password: '123123123',
  createdAt: new Date(),
  updatedAt: new Date(),
};
