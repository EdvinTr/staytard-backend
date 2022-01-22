import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductReviewInput } from './dto/create-product-review.input';
import { ProductReview } from './entities/product-review.entity';
import { ProductReviewService } from './product-review.service';
import {UseGuards} from "@nestjs/common";
import PermissionGuard from "../authentication/guards/permission.guard";

@Resolver(() => ProductReview)
export class ProductReviewResolver {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @Mutation(() => ProductReview)
  createProductReview(@Args('input') input: CreateProductReviewInput) {
    return this.productReviewService.create(input);
  }
  @UseGuards(PermissionGuard(Permission.))
  @Mutation(() => ProductReview)
  publishReview(@Args('id') id: number) {
    return this.productReviewService.publish(id);
  }
}
