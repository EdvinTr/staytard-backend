/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import mockedConfigService from '../../../utils/mocks/config.service';
import mockedJwtService from '../../../utils/mocks/jwt.service';
import { UserAddress } from '../../user/entities/user-address.entity';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { AuthenticationService } from '../authentication.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { mockedUser } from './user.mock';
describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let userService: UserService;
  let bcryptHash: jest.Mock;
  let bcryptCompare: jest.Mock;
  const mockUserRepository = {
    save: jest.fn().mockResolvedValue(mockedUser),
    create: jest.fn().mockResolvedValue(mockedUser),
    findOne: jest.fn().mockResolvedValue(mockedUser),
  };
  beforeEach(async () => {
    bcryptHash = jest.fn().mockReturnValue((value: string) => value);
    (bcrypt.hash as jest.Mock) = bcryptHash;

    bcryptCompare = jest.fn().mockReturnValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        UserService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(UserAddress),
          useValue: {},
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
    authenticationService = module.get<AuthenticationService>(
      AuthenticationService,
    );
  });

  describe('when creating an access token', () => {
    it('should return a string', () => {
      const userId = 'someUserID';
      expect(typeof authenticationService.getJwtAccessToken(userId)).toEqual(
        'string',
      );
    });
  });
  describe('when creating a refresh token', () => {
    it('should return a string', () => {
      const userId = 'someUserID';
      expect(typeof authenticationService.getJwtRefreshToken(userId)).toEqual(
        'string',
      );
    });
  });
  describe('when registering a user', () => {
    it('should create a user and return it', async () => {
      const registrationData: RegisterUserDto = {
        email: mockedUser.email,
        password: mockedUser.password!,
        firstName: mockedUser.firstName,
        lastName: mockedUser.lastName,
        mobilePhoneNumber: mockedUser.mobilePhoneNumber!,
        city: mockedUser.address!.city,
        postalCode: mockedUser.address!.postalCode,
        street: mockedUser.address!.street,
      };
      const registeredUser = await authenticationService.register(
        registrationData,
      );
      expect(registeredUser).toMatchObject(mockedUser); // TODO fix this
    });
  });
  describe('when accessing the data of authenticating user', () => {
    it('should attempt to find a user by email', async () => {
      const findByEmailSpy = jest.spyOn(userService, 'findByEmail');
      await authenticationService.getAuthenticatedUser(
        mockedUser.email,
        mockedUser.password!,
      );
      expect(findByEmailSpy).toBeCalledTimes(1);
    });
    describe('and the provided password is not valid', () => {
      beforeEach(() => {
        bcryptCompare.mockResolvedValue(false);
      });
      it('should throw an error', async () => {
        await expect(
          authenticationService.getAuthenticatedUser(
            mockedUser.email,
            mockedUser.password!,
          ),
        ).rejects.toThrow();
      });
    });
    describe('and the provided password is valid', () => {
      beforeEach(() => {
        bcryptCompare.mockResolvedValue(true);
      });
      it('should return the user', async () => {
        const user = await authenticationService.getAuthenticatedUser(
          mockedUser.email,
          mockedUser.password!,
        );
        expect(user).toBe(mockedUser);
      });
    });
    describe('and the user does not exist in the database', () => {
      beforeEach(() => {
        mockUserRepository.findOne.mockResolvedValue(undefined);
      });
      it('should throw an error', async () => {
        await expect(
          authenticationService.getAuthenticatedUser(
            mockedUser.email,
            mockedUser.password!,
          ),
        ).rejects.toThrow();
      });
    });
  });
});
