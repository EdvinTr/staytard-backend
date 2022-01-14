import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductBrand } from '../entities/product-brand.entity';
import { ProductBrandService } from '../product-brand.service';

describe('ProductBrandService', () => {
  let service: ProductBrandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductBrandService,
        { provide: getRepositoryToken(ProductBrand), useValue: {} },
      ],
    }).compile();

    service = module.get<ProductBrandService>(ProductBrandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
