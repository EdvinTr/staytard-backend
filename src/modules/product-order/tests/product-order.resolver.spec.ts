import { Test, TestingModule } from '@nestjs/testing';
import { ProductOrderResolver } from '../product-order.resolver';
import { ProductOrderService } from '../product-order.service';

describe('ProductOrderResolver', () => {
  let resolver: ProductOrderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductOrderResolver, ProductOrderService],
    }).compile();

    resolver = module.get<ProductOrderResolver>(ProductOrderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
