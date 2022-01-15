import { Test, TestingModule } from '@nestjs/testing';
import { ProductResolver } from '../product.resolver';
import { ProductService } from '../product.service';

describe('ProductResolver', () => {
  let resolver: ProductResolver;
  let mockProductService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductResolver,
        { provide: ProductService, useValue: mockProductService },
      ],
    }).compile();

    resolver = module.get<ProductResolver>(ProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
