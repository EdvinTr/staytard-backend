import { Module } from '@nestjs/common';
import { ProductReviewResolver } from './product-review.resolver';
import { ProductReviewService } from './product-review.service';

@Module({
  providers: [ProductReviewResolver, ProductReviewService],
})
export class ProductReviewModule {}
