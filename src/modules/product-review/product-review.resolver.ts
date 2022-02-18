import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import Permission from '../../lib/permission/permission.type';
import PermissionGuard from '../authentication/guards/permission.guard';
import { CreateProductReviewInput } from './dto/input/create-product-review.input';
import { FindAllProductReviewsInput } from './dto/input/find-all-product-reviews.input';
import { FindPublishedProductReviewsInput } from './dto/input/find-published-product-reviews.input';
import { PublishedProductReviewsOutput as PublishedProductReviewsOutput } from './dto/output/published-product-reviews.output';
import { ProductReview } from './entities/product-review.entity';
import { ProductReviewService } from './product-review.service';
@Resolver(() => ProductReview)
export class ProductReviewResolver {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @Mutation(() => ProductReview)
  async createProductReview(@Args('input') input: CreateProductReviewInput) {
    return this.productReviewService.create(input);
  }

  @Query(() => PublishedProductReviewsOutput)
  async publishedProductReviews(
    @Args('input') input: FindPublishedProductReviewsInput,
  ): Promise<PublishedProductReviewsOutput> {
    return this.productReviewService.find(input); // only gets published reviews
  }

  @UseGuards(PermissionGuard(Permission.PUBLISH_REVIEW))
  async allProductReviews(@Args('input') input: FindAllProductReviewsInput) {
    return this.productReviewService.findAll(input); // protected by permission guard. Gets all reviews
  }

  @UseGuards(PermissionGuard(Permission.PUBLISH_REVIEW))
  @Mutation(() => ProductReview)
  publishReview(@Args('id') id: number) {
    return this.productReviewService.publish(id);
  }
}
