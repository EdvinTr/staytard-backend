import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerOrderService } from '../customer-order.service';
import { CustomerOrder } from '../entities/customer-order.entity';

describe('CustomerOrderService', () => {
  let service: CustomerOrderService;
  let mockOrderRepository = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerOrderService,
        {
          provide: getRepositoryToken(CustomerOrder),
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    service = module.get<CustomerOrderService>(CustomerOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
