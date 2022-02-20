import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, ILike, Repository } from 'typeorm';
import { CreateProductReviewInput } from './dto/input/create-product-review.input';
import { FindAllProductReviewsInput } from './dto/input/find-all-product-reviews.input';
import { FindPublishedProductReviewsInput } from './dto/input/find-published-product-reviews.input';
import { UpdateProductReviewInput } from './dto/input/update-product-review.input';
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

  async deleteById(id: number) {
    const { affected } = await this.productReviewRepository.delete(id);
    if (affected === 0) {
      throw new NotFoundException(`Review with id ${id} was not found`);
    }
    return true;
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
    filter,
    q,
  }: FindAllProductReviewsInput) {
    const order: Record<string, string> = {};
    if (sortBy && sortDirection) {
      order[sortBy] = sortDirection;
    }
    const where: FindConditions<ProductReview>[] = [];
    if (q) {
      const parsedValue = isNaN(parseInt(q)) ? 0 : +q;
      where.push(
        { nickname: ILike(`%${q}%`) },
        { title: ILike(`%${q}%`) },
        { productId: parsedValue },
        { id: parsedValue },
      );
    }
    if (filter) {
      where.push({ [filter.type]: filter.applied });
    }
    const [reviews, totalCount] =
      await this.productReviewRepository.findAndCount({
        take: limit,
        skip: offset,
        order: {
          ...order,
        },
        where: [...where],
        cache: 10000,
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

  async findAllPublished({
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
          isPublished: true, // only return published reviews
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

  async update({
    reviewId,
    content,
    isPublished,
    title,
  }: UpdateProductReviewInput) {
    const review = await this.findOne(reviewId);
    if (!review) {
      throw new NotFoundException(`Review with id ${reviewId} was not found`);
    }
    return this.productReviewRepository.save({
      ...review,
      content,
      title,
      isPublished: isPublished,
      publishedAt: isPublished ? new Date() : null,
    });
  }
}
