import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductService } from '../product.service';

describe('ProductService', () => {
  let service: ProductService;
  const mockProductRepository = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(1).toBe(1);
  });
  // TODO: test that hasMore returns correct value depending on the offset & limit & count variable calculation
});
