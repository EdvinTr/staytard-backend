import { Test, TestingModule } from '@nestjs/testing';
import { CustomerOrderService } from '../customer-order.service';

describe('CustomerOrderService', () => {
  let service: CustomerOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerOrderService],
    }).compile();

    service = module.get<CustomerOrderService>(CustomerOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
