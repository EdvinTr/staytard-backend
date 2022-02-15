import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductImage } from '../entities/product-image.entity';
import { Product } from '../entities/product.entity';
import { ProductAttributeService } from '../product-attribute.service';
import { ProductService } from '../product.service';

describe('ProductService', () => {
  let service: ProductService;
  const mockProductRepository = {
    findAndCount: jest.fn().mockReturnValue([[], 0]),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: getRepositoryToken(ProductImage),
          useValue: {},
        },
        { provide: ProductAttributeService, useValue: {} },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });
  describe('when querying all products', () => {
    const totalProductCount = 10;
    beforeEach(() => {
      mockProductRepository.findAndCount = jest
        .fn()
        .mockReturnValue([[], totalProductCount]);
    });
    it('should indicate there are more products if limit is less than total product count', async () => {
      const { hasMore, totalCount } = await service.gqlFindAll({
        categoryPath: '/clothes',
        limit: 5,
        offset: 0,
      });
      expect(hasMore).toBeTruthy();
      expect(totalCount).toEqual(totalProductCount);
    });
    it('should indicate there are no more products if limit is equal to total product count', async () => {
      const { hasMore } = await service.gqlFindAll({
        categoryPath: '/clothes',
        limit: totalProductCount,
        offset: 0,
      });
      expect(hasMore).toBeFalsy();
    });
  });
});
