import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductReviewInput } from './dto/input/create-product-review.input';
import { FindAllProductReviewsInput } from './dto/input/find-all-product-reviews.input';
import { FindPublishedProductReviewsInput } from './dto/input/find-published-product-reviews.input';
import { PublishedProductReviewsOutput } from './dto/output/published-product-reviews.output';
import { ProductReview } from './entities/product-review.entity';

@Injectable()
export class ProductReviewService {
  constructor(
    @InjectRepository(ProductReview)
    private readonly productReviewRepository: Repository<ProductReview>,
  ) {}
  create(input: CreateProductReviewInput) {
    const review = this.productReviewRepository.create(input);
    return this.productReviewRepository.save(review);
  }

  async findOne(id: number) {
    return this.productReviewRepository.findOne({
      where: { id },
    });
  }

  async findAll({
    limit,
    offset,
    sortBy,
    sortDirection,
  }: FindAllProductReviewsInput) {
    const order: Record<string, string> = {};
    if (sortBy && sortDirection) {
      order[sortBy] = sortDirection;
    }
    const [reviews, totalCount] =
      await this.productReviewRepository.findAndCount({
        take: limit,
        skip: offset,
        order: {
          ...order,
        },
      });
    return {
      items: reviews,
      totalCount: totalCount,
      hasMore: totalCount - offset > limit,
    };
  }

  private async getAverageRating(productId: number): Promise<number> {
    const avg: { avg: string }[] = await this.productReviewRepository.query(
      `
    SELECT AVG(rating) as avg
    FROM product_review
    WHERE product_id = $1
    `,
      [productId],
    );
    return avg[0]?.avg ? parseFloat(avg[0].avg) : 0;
  }

  async find({
    productId,
    limit,
    offset,
    sortBy,
    sortDirection,
  }: FindPublishedProductReviewsInput): Promise<PublishedProductReviewsOutput> {
    const order: Record<string, string> = {};
    if (sortBy && sortDirection) {
      order[sortBy] = sortDirection;
    }
    const [reviews, totalCount] =
      await this.productReviewRepository.findAndCount({
        where: {
          productId,
          isPublished: true, // only return published reviews (probably check if calling user has privilege or not)
        },
        take: limit,
        skip: offset,
        order: {
          ...order,
        },
      });
    return {
      items: reviews,
      totalCount: totalCount,
      hasMore: totalCount - offset > limit,
      averageRating: await this.getAverageRating(productId),
    };
  }

  async publish(id: number) {
    try {
      const review = await this.productReviewRepository.findOne({
        where: { id },
      });
      if (!review) {
        throw new NotFoundException(`Review with id ${id} was not found`);
      }
      return this.productReviewRepository.save({
        ...review, // existing fields
        isPublished: true,
        publishedAt: new Date(),
      });
    } catch (error) {
      throw error;
    }
  }
}
