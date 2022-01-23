import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductReviewInput } from './dto/create-product-review.input';
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
        published: new Date(),
      });
    } catch (error) {
      throw error;
    }
  }
}
