import { User } from '../../user/entities/user.entity';

export const mockedUser: User = {
  id: 'someRandomUUID',
  email: 'some-guy@gmail.com',
  isRegisteredWithGoogle: false,
  firstName: 'Some Guy',
  lastName: 'The Last',
  mobilePhoneNumber: '+46704253388',
  isEmailConfirmed: false,
  isAdmin: false,
  address: {
    city: 'Uppsala',
    id: 1,
    postalCode: '75645',
    street: 'Södra Vägen',
  },
  currentHashedRefreshToken: '',
  password: '123123123',
  createdAt: new Date(),
  updatedAt: new Date(),
};
