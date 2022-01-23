import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductReview } from '../entities/product-review.entity';
import { ProductReviewService } from '../product-review.service';
import { mockProductReview } from './mock-product-review';
describe('ProductReviewService', () => {
  let service: ProductReviewService;
  let mockProductReviewRepository = {
    create: jest.fn().mockImplementation((args) => args),
    save: jest.fn().mockImplementation((args) => ({
      id: Math.random(),
      ...args,
    })),
    findOne: jest.fn().mockImplementation((args) => ({ ...args })),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductReviewService,
        {
          provide: getRepositoryToken(ProductReview),
          useValue: mockProductReviewRepository,
        },
      ],
    }).compile();

    service = module.get<ProductReviewService>(ProductReviewService);
  });
  describe('when creating a product review', () => {
    describe('and input is valid', () => {
      it('should create a review and return it', async () => {
        const result = await service.create(mockProductReview);
        expect(result).toMatchObject({
          id: expect.any(Number),
          ...mockProductReview,
        });
      });
    });
    describe('and input is not valid', () => {
      beforeEach(() => {
        mockProductReviewRepository.save = jest.fn().mockImplementation(() => {
          throw new Error();
        });
      });
      it('should throw an error', () => {
        expect(() => service.create({} as ProductReview)).toThrowError();
      });
    });
  });

  describe('when publishing a product review', () => {
    describe('and the review cannot be found in database', () => {
      beforeEach(() => {
        mockProductReviewRepository.findOne = jest
          .fn()
          .mockImplementation(() => undefined);
      });
      it('should throw an error', async () => {
        await expect(service.publish(1)).rejects.toThrow();
      });
    });
  });
});
