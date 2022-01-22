import { Injectable } from '@nestjs/common';
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
    const review = this.productReviewRepository.create({});
    // TODO:
    // 1. Should create product review
    // 2. Should save it to the database
    // 3. Should return the saved product review
    return this.productReviewRepository.save(review);
  }
}
