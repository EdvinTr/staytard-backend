import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import Permission from '../../lib/permission/permission.type';
import PermissionGuard from '../authentication/guards/permission.guard';
import { CreateProductReviewInput } from './dto/input/create-product-review.input';
import { FindAllProductReviewsInput } from './dto/input/find-all-product-reviews.input';
import { FindPublishedProductReviewsInput } from './dto/input/find-published-product-reviews.input';
import { UpdateProductReviewInput } from './dto/input/update-product-review.input';
import { PublishedProductReviewsOutput as PublishedProductReviewsOutput } from './dto/output/published-product-reviews.output';
import { QueryAllProductReviewsOutput } from './dto/output/query-all-product-reviews.output';
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
    return this.productReviewService.findAllPublished(input); // only gets published reviews
  }

  @UseGuards(PermissionGuard(Permission.READ_PRODUCT_REVIEW))
  @Query(() => QueryAllProductReviewsOutput)
  async allProductReviews(@Args('input') input: FindAllProductReviewsInput) {
    return this.productReviewService.findAll(input); // Gets all reviews
  }

  @UseGuards(PermissionGuard(Permission.DELETE_PRODUCT_REVIEW))
  @Mutation(() => Boolean)
  async deleteProductReview(@Args('id') id: number) {
    return this.productReviewService.deleteById(id);
  }

  @UseGuards(PermissionGuard(Permission.READ_PRODUCT_REVIEW))
  @Query(() => ProductReview)
  async oneProductReview(@Args('id') id: number) {
    return this.productReviewService.findOne(id);
  }

  @UseGuards(PermissionGuard(Permission.UPDATE_PRODUCT_REVIEW))
  @Mutation(() => ProductReview)
  updateProductReview(@Args('input') input: UpdateProductReviewInput) {
    return this.productReviewService.update(input);
  }
}
