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
};
