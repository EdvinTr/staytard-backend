import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Auth } from 'googleapis';
import mockedConfigService from '../../../utils/mocks/config.service';
import mockedJwtService from '../../../utils/mocks/jwt.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { UserAddress } from '../../user/entities/user-address.entity';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { GoogleAuthenticationService } from '../google-authentication.service';

const mockTokenInfo: Auth.TokenInfo = {
  aud: '',
  email: 'someemail@gmail.com',
  expiry_date: 239293922,
  scopes: [],
  access_type: 'online',
  user_id: '',
  azp: '',
  email_verified: true,
  sub: '',
};
describe('Google Authentication', () => {
  let googleAuthenticationService: GoogleAuthenticationService;
  let userService: UserService;
  const getTokenInfo = jest.fn().mockResolvedValue(mockTokenInfo)(
    new Auth.OAuth2Client().getTokenInfo as jest.Mock,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleAuthenticationService,
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
          useValue: {},
        },
        {
          provide: getRepositoryToken(UserAddress),
          useValue: {},
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
    googleAuthenticationService = module.get<GoogleAuthenticationService>(
      GoogleAuthenticationService,
    );
  });

  describe('when authenticating with google', () => {
    it('just works', () => {
      expect(true).toBe(true);
    });
  });
});
