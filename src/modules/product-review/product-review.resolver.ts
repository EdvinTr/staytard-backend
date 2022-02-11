import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import Permission from '../../lib/permission/permission.type';
import PermissionGuard from '../authentication/guards/permission.guard';
import { CreateProductReviewInput } from './dto/create-product-review.input';
import { FindProductReviewsInput } from './dto/find-product-reviews.input';
import { QueryProductReviewsOutput } from './dto/query-product-reviews.output';
import { ProductReview } from './entities/product-review.entity';
import { ProductReviewService } from './product-review.service';
@Resolver(() => ProductReview)
export class ProductReviewResolver {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @Mutation(() => ProductReview)
  async createProductReview(@Args('input') input: CreateProductReviewInput) {
    return this.productReviewService.create(input);
  }

  @Query(() => QueryProductReviewsOutput)
  async productReviews(
    @Args('input') input: FindProductReviewsInput,
  ): Promise<QueryProductReviewsOutput> {
    return this.productReviewService.find(input);
  }

  @UseGuards(PermissionGuard(Permission.PUBLISH_REVIEW))
  @Mutation(() => ProductReview)
  publishReview(@Args('id') id: number) {
    return this.productReviewService.publish(id);
  }
}
