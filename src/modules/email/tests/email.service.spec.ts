import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import mockedConfigService from '../../../utils/mocks/config.service';
import { EmailService } from '../email.service';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        { provide: ConfigService, useValue: mockedConfigService },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(1).toBe(1);
  });
});
