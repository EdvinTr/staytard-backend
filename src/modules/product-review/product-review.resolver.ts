import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductReviewService } from './product-review.service';
import { ProductReview } from './entities/product-review.entity';
import { CreateProductReviewInput } from './dto/create-product-review.input';
import { UpdateProductReviewInput } from './dto/update-product-review.input';

@Resolver(() => ProductReview)
export class ProductReviewResolver {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @Mutation(() => ProductReview)
  createProductReview(@Args('createProductReviewInput') createProductReviewInput: CreateProductReviewInput) {
    return this.productReviewService.create(createProductReviewInput);
  }

  @Query(() => [ProductReview], { name: 'productReview' })
  findAll() {
    return this.productReviewService.findAll();
  }

  @Query(() => ProductReview, { name: 'productReview' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productReviewService.findOne(id);
  }

  @Mutation(() => ProductReview)
  updateProductReview(@Args('updateProductReviewInput') updateProductReviewInput: UpdateProductReviewInput) {
    return this.productReviewService.update(updateProductReviewInput.id, updateProductReviewInput);
  }

  @Mutation(() => ProductReview)
  removeProductReview(@Args('id', { type: () => Int }) id: number) {
    return this.productReviewService.remove(id);
  }
}
