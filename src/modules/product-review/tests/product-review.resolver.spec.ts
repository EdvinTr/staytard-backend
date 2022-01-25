import { Test, TestingModule } from '@nestjs/testing';
import { ProductReviewResolver } from '../product-review.resolver';
import { ProductReviewService } from '../product-review.service';

describe('ProductReviewResolver', () => {
  let resolver: ProductReviewResolver;
  const mockProductReviewService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductReviewResolver,
        {
          provide: ProductReviewService,
          useValue: mockProductReviewService,
        },
      ],
    }).compile();

    resolver = module.get<ProductReviewResolver>(ProductReviewResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
