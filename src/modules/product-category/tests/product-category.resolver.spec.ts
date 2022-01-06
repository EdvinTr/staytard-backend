import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductCategory } from '../entities/product-category.entity';
import { ProductCategoryResolver } from '../product-category.resolver';
import { ProductCategoryService } from '../product-category.service';

describe('ProductCategoryResolver', () => {
  let resolver: ProductCategoryResolver;
  let categoryService: ProductCategoryService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductCategoryResolver,
        ProductCategoryService,
        { provide: getRepositoryToken(ProductCategory), useValue: {} },
      ],
    }).compile();

    categoryService = module.get<ProductCategoryService>(
      ProductCategoryService,
    );
    resolver = module.get<ProductCategoryResolver>(ProductCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
