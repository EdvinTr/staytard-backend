import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { UserResolver } from '../user.resolver';
describe('UserResolver', () => {
  let userService: UserService;
  let resolver: UserResolver;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
    resolver = module.get<UserResolver>(UserResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
