import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import mockedConfigService from '../../../utils/mocks/config.service';
import mockedJwtService from '../../../utils/mocks/jwt.service';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { AuthenticationResolver } from '../authentication.resolver';
import { AuthenticationService } from '../authentication.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { mockedUser } from './user.mock';

describe('AuthenticationResolver', () => {
  let resolver: AuthenticationResolver;
  let userService: UserService;
  let userData: User;
  const mockedAuthenticationService = {
    register: jest.fn((dto: RegisterUserDto) => {
      return {
        ...mockedUser,
      };
    }),
    getJwtAccessToken: jest.fn((userId: string) => {
      return 'accessToken';
    }),
    getJwtRefreshToken: jest.fn((userId: string) => {
      return 'refreshToken';
    }),
  };
  beforeEach(async () => {
    userData = {
      ...mockedUser,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationResolver,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: AuthenticationService,
          useValue: mockedAuthenticationService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: UserService,
          useValue: {},
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    resolver = module.get<AuthenticationResolver>(AuthenticationResolver);
  });

  describe('when registering a user', () => {
    describe('and input is valid', () => {
      it('should respond with the tokens and the user without the password', async () => {
        const expectedUserData = {
          ...userData,
        };
        const data = await resolver.registerUser({
          firstName: userData.firstName,
          lastName: userData.lastName,
          mobilePhoneNumber: userData.mobilePhoneNumber!,
          email: userData.email,
          password: userData.password!,
        });
        delete expectedUserData.password;
        expect(data?.accessToken).toBeDefined();
        expect(data?.refreshToken).toBeDefined();
        expect(data?.user).toEqual(expectedUserData);
      });
    });
    describe('and input is invalid', () => {
      beforeEach(() => {
        mockedAuthenticationService.register = jest.fn().mockReturnValue(null);
      });
      it('should return null', async () => {
        await expect(
          resolver.registerUser({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            mobilePhoneNumber: '',
          }),
        ).resolves.toBeNull();
      });
    });
  });
});
