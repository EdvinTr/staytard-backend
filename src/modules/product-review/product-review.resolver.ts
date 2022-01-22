import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductReviewInput } from './dto/create-product-review.input';
import { ProductReview } from './entities/product-review.entity';
import { ProductReviewService } from './product-review.service';
import {UseGuards} from "@nestjs/common";
import PermissionGuard from "../authentication/guards/permission.guard";
import Permission from '../../lib/permission/permission.type';

@Resolver(() => ProductReview)
export class ProductReviewResolver {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @Mutation(() => ProductReview)
  createProductReview(@Args('input') input: CreateProductReviewInput) {
    return this.productReviewService.create(input);
  }
  @UseGuards(PermissionGuard(Permission.PUBLISH_REVIEW))
  @Mutation(() => ProductReview)
  publishReview(@Args('id') id: number) {
    return this.productReviewService.publish(id);
  }
}
