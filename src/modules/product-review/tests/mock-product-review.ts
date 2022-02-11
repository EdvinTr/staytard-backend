import { ProductReviewInterface } from '../entities/product-review.entity';

export type MockProductReviewType = Omit<
  ProductReviewInterface,
  'product' | 'id'
>;
export const mockProductReview: MockProductReviewType = {
  productId: 1,
  title: 'title',
  content: 'content',
  rating: 1,
  isPublished: true,
  publishedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'submitter@gmail.com',
  nickname: 'SomePerson',
  wouldRecommend: true,
};
