import { Test, TestingModule } from '@nestjs/testing';
import { CustomerOrderResolver } from '../customer-order.resolver';
import { CustomerOrderService } from '../customer-order.service';

describe('CustomerOrderResolver', () => {
  let resolver: CustomerOrderResolver;

  let mockOrderService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerOrderResolver,
        { provide: CustomerOrderService, useValue: mockOrderService },
      ],
    }).compile();

    resolver = module.get<CustomerOrderResolver>(CustomerOrderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
