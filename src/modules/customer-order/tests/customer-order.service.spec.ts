import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../../product/entities/product.entity';
import { ProductService } from '../../product/product.service';
import { CustomerOrderService } from '../customer-order.service';
import { CustomerOrderStatus } from '../entities/customer-order-status.entity';
import { CustomerOrder } from '../entities/customer-order.entity';

describe('CustomerOrderService', () => {
  let customerOrderService: CustomerOrderService;
  let productService: ProductService;

  const mockProductRepository = {};
  const mockOrderRepository = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerOrderService,
        ProductService,
        {
          provide: getRepositoryToken(CustomerOrder),
          useValue: mockOrderRepository,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: getRepositoryToken(CustomerOrderStatus),
          useValue: {},
        },
      ],
    }).compile();

    customerOrderService =
      module.get<CustomerOrderService>(CustomerOrderService);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(customerOrderService).toBeDefined();
  });
});
