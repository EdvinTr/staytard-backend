import { Injectable } from '@nestjs/common';
import { CreateProductReviewInput } from './dto/create-product-review.input';
import { UpdateProductReviewInput } from './dto/update-product-review.input';

@Injectable()
export class ProductReviewService {
  create(createProductReviewInput: CreateProductReviewInput) {
    return 'This action adds a new productReview';
  }

  findAll() {
    return `This action returns all productReview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productReview`;
  }

  update(id: number, updateProductReviewInput: UpdateProductReviewInput) {
    return `This action updates a #${id} productReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} productReview`;
  }
}
