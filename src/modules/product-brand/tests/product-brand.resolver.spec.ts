import { Test, TestingModule } from '@nestjs/testing';
import { ProductBrandResolver } from '../product-brand.resolver';
import { ProductBrandService } from '../product-brand.service';

describe('ProductBrandResolver', () => {
  let resolver: ProductBrandResolver;
  const mockProductBrandService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductBrandResolver,
        {
          provide: ProductBrandService,
          useValue: mockProductBrandService,
        },
      ],
    }).compile();

    resolver = module.get<ProductBrandResolver>(ProductBrandResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
