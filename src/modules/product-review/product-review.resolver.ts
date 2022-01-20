import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductReviewInput } from './dto/create-product-review.input';
import { ProductReview } from './entities/product-review.entity';
import { ProductReviewService } from './product-review.service';

@Resolver(() => ProductReview)
export class ProductReviewResolver {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @Mutation(() => ProductReview)
  createProductReview(@Args('input') input: CreateProductReviewInput) {
    return this.productReviewService.create(input);
  }
}
